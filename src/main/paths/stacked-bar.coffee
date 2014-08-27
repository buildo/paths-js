define [
  './ops'
  './linear'
  './rectangle'
], (O, Linear, Rectangle)->
  ({data, accessor, width, height, gutter, compute}) ->
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
        groups[j][i] = el

    n = groups.length
    group_width = (width - gutter * (n - 1)) / n
    curves = []
    scale = Linear [min, max], [height, 0]

    for g, i in groups
      w = group_width
      shift = (grou_width + gutter) * i
      g.sort (x, y) ->
        if accessor(x) < accessor(y) then 1
        else if accessor(y) < accessor(x) then -1
        else 0
      for el, j in g
        left = shift
        right = left + w
        bottom = scale(0)
        val = accessor(el)
        top = scale(val)
        line = Rectangle(left: left, right: right, bottom: bottom, top: top)
        curves.push O.enhance compute,
          item: el
          line: line
          index: j

    curves: curves
    scale: scale
