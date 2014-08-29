define [
  './ops'
  './linear'
  './rectangle'
  './axis'
], (O, Linear, Rectangle, Axis) ->
  ({data, accessor, width, height, compute, axes}) ->
    accessor ?= (x) -> x
    items = (item for item in data).sort (a, b) ->
      i1 = accessor a
      i2 = accessor b
      if i1[0] <= i2[0] and i1[1] >= i2[1] then 1
      else if i1[0] > i2[0] and i1[1] < i2[1] then -1
      else 0

    splits = [
      item: items[0]
      interval: [accessor(items[0])[0], accessor(items[0])[1]]
    ]
    for item in items[1..]
      interval = accessor item

      left = splits[0].interval[0]
      if interval[0] < left
        splits.unshift
          item: item
          interval: [interval[0], left]

      right = splits[splits.length - 1].interval[1]
      if interval[1] > right
        splits.push
          item: item
          interval: [right, interval[1]]

    scale = Linear [min, max], [0, width]
    curves = []

    left = 0
    for split, i in splits
      width = split.interval[1] - split.interval[0]
      curves.push O.enhance compute,
        item: split.item
        index: i
        line: Rectangle(left: scale(left), right: scale(left + width), bottom: height, top: 0)
      left += width

    [min, max] = [splits[0].interval[0], splits[splits.length - 1].interval[1]]
    x_interval = [axes?.x?.min or min, axes?.x?.max or max]
    x_axis =
      if axes?.x?.steps?
      then Axis.steps x_interval, axes.x.steps
      else if axes?.x? then Axis.step x_interval, axes?.x?.step or 1

    curves: curves
    scale: scale
    x: if x_axis then x_axis.map (x) -> { position: x, value: x }
