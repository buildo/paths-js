define [
  './linear'
  './ops'
], (Linear, O)->

  box = (datum, accessor) ->
    points = (accessor item for item in datum)
    sorted = points.sort ([a, b], [c, d]) -> a - c
    ycoords = sorted.map (p) -> p[1]
    l = sorted.length

    points: sorted
    xmin: sorted[0][0]
    xmax: sorted[l - 1][0]
    ymin: O.min ycoords
    ymax: O.max ycoords

  ({data, xaccessor, yaccessor, width, height, closed, axes}) ->
    xaccessor ?= ([x, y]) -> x
    yaccessor ?= ([x, y]) -> y
    f = (i) -> [xaccessor(i), yaccessor(i)]
    arranged = (box(datum, f) for datum in data)

    dataxmin = O.min(arranged.map (d) -> d.xmin)
    xmin = if axes?.x?.min? then Math.min(axes.x.min, dataxmin) else dataxmin
    dataxmax = O.max(arranged.map (d) -> d.xmax)
    xmax = if axes?.x?.max? then Math.max(axes.x.max, dataxmax) else dataxmax
    dataymin = O.min(arranged.map (d) -> d.ymin)
    ymin = if axes?.y?.min? then Math.min(axes.y.min, dataymin) else dataymin
    dataymax = O.max(arranged.map (d) -> d.ymax)
    ymax = if axes?.y?.max? then Math.max(axes.y.max, dataymax) else dataymax
    if closed
      ymin = Math.min(ymin, 0)
      ymax = Math.max(ymax, 0)
    base = if closed then 0 else ymin
    xscale = Linear [xmin, xmax], [0, width]
    yscale = Linear [ymin, ymax], [height, 0]
    scale = ([x, y]) -> [xscale(x), yscale(y)]

    arranged: arranged
    scale: scale
    xscale: xscale
    yscale: yscale
    base: base
    ymax: ymax