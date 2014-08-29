define [
  './bezier'
  './ops'
  './line-chart-comp'
  './axis'
], (Bezier, O, comp, Axis)->

  (options) ->
    { arranged, scale, xscale, yscale, base, ymax } = comp(options)
    [min_xmin, max_xmax] = [Infinity, -Infinity]
    i = -1

    lines = arranged.map ({ points, xmin, xmax }) ->
      if options.axes?.x?
        if max_xmax < xmax then max_xmax = xmax
        if min_xmin > xmin then min_xmin = xmin

      scaled_points = points.map scale
      i += 1
      line = Bezier(points: scaled_points)
      area =
        path: line.path
          .lineto(scale([xmax, base])...)
          .lineto(scale([xmin, base])...)
          .closepath()
        centroid: O.average([
            line.centroid,
            scale([xmin, base]),
            scale([xmax, base])
          ])

      O.enhance options.compute,
        item: options.data[i]
        line: line
        area: area
        index: i

    axes = options.axes
    y_interval = [axes?.y?.min or base, axes?.y?.max or ymax]
    y_axis =
      if axes?.y?.steps?
      then Axis.steps y_interval, axes.y.steps
      else if axes?.y? then Axis.step y_interval, axes.y.step or 1
    x_interval = [axes?.x?.min or min_xmin, axes?.x?.max or max_xmax]
    x_axis =
      if axes?.x?.steps?
      then Axis.steps x_interval, axes.x.steps
      else if axes?.x? then Axis.step x_interval, axes.x.step or 1

    curves: lines
    xscale: xscale
    yscale: yscale
    y: if y_axis then y_axis.map (y) -> { position: y, value: y }
    x: if x_axis then x_axis.map (x) -> { position: x, value: x }
