define [
  './ops'
  './linear'
  './rectangle'
], (O, Linear, Rectangle)->
  ({data, accessor, width, height, gutter, compute, stacked}) ->
    accessor ?= (x) -> x
    gutter ?= 0
    groups = []
    min = 0
    max = 0
    for d, i in data
      for el, j in d
        val = accessor(el)
        if val < min then min = val
        if val > max then max = val
        groups[j] ?= []
        groups[j][i] = val

    n = groups.length
    group_width = (width - gutter * (n - 1)) / n
    curves = []
    scale = Linear [min, max], [height, 0]

    for g, i in groups
      w = if stacked then group_width else group_width / g.length
      shift = (group_width + gutter) * i

      sorted_g = g.map((ge, i) -> {original_index: i, value: ge}).slice().sort (x, y) ->
        if accessor(x.value) < accessor(y.value) then 1
        else if accessor(y.value) < accessor(x.value) then -1
        else 0

      for el, j in sorted_g
        left = shift + if stacked then 0 else w * j
        right = left + w
        bottom = scale(0)
        top = scale(el.value)
        line = Rectangle(left: left, right: right, bottom: bottom, top: top)
        curves.push O.enhance compute,
          item: data[el.original_index][i]
          line: line
          index: el.original_index

    curves: curves
    scale: scale