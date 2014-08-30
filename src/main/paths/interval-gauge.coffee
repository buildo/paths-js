define [
  './ops'
  './linear'
  './rectangle'
  './axis'
], (O, Linear, Rectangle, Axis) ->
  ({data, accessor, width, height, compute, axes, min_interval}) ->
    accessor ?= (x) -> x
    items = (item for item in data).map (item) ->
      item: item
      interval: accessor item
    .sort (a, b) ->
      i1 = a.interval
      i2 = b.interval

      if i1[0] <= i2[0] and i1[1] >= i2[1]
      then 1
      else if i2[0] <= i1[0] and i2[1] >= i1[1]
      then -1
      else 0

    items[0].original_interval = items[0].interval[..]
    splits = [items[0]]

    for item in items[1..]
      left = splits[0].interval[0]
      right = splits[splits.length - 1].interval[1]

      if item.interval[0] < left
        splits.unshift
          item: item.item
          interval: [item.interval[0], left]
          original_interval: [item.interval[0], left]

      if item.interval[1] > right
        splits.push
          item: item.item
          interval: [right, item.interval[1]]
          original_interval: [right, item.interval[1]]

    if min_interval?
      for i in [0 .. splits.length - 2]
        int = splits[i].interval
        if int[1] - int[0] < min_interval
          splits[i].interval[1] = int[0] + min_interval
          splits[i + 1].interval[0] = splits[i].interval[1]
      last = splits[splits.length - 1]
      last.interval[1] = Math.max last.interval[1], last.interval[0] + min_interval

    [min, max] = [
      splits[0].interval[0]
      splits[splits.length - 1].interval[1]
    ]

    linear_scale = Linear [min, max], [0, width]
    scale = if min_interval?
      splits = splits.map (split) ->
        split.scale = Linear split.original_interval, split.interval
        split
      (v) ->
        (splits.filter (split) ->
          split.original_interval[0] <= v and v <= split.original_interval[1]
        )[0]?.scale(v)
    else
      linear_scale

    curves = []

    left = 0
    for split, i in splits
      width = split.interval[1] - split.interval[0]
      curves.push O.enhance compute,
        item: split.item
        index: i
        line: Rectangle(left: linear_scale(left), right: linear_scale(left + width), bottom: 0, top: height)
      left += width

    if axes?.x?
      if axes.x.splits?
        bounds = (n) -> (axes?.x?.min ? min) <= n and n <= (axes?.x?.max ? max)
        high = if min_interval?
          ({original_interval}) -> original_interval[1]
        else
          ({interval}) -> interval[1]
        x_axis = ([min].concat splits.map high).filter bounds
      else
        x_interval = [axes?.x?.min or min, axes?.x?.max or max]
        x_axis =
          if axes.x.steps?
            Axis.steps x_interval, axes.x.steps
          else
            Axis.step x_interval, axes.x.step or 1

    curves: curves
    scale: scale
    x: if x_axis? then x_axis.map (x) -> { position: x, value: x }