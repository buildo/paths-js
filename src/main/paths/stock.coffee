define [
  './polygon'
  './line-chart-comp'
  './ops'
  './axis'
], (Polygon, comp, O, Axis) ->
  (options) ->
    { arranged, scale, xscale, yscale, base, ymax } = comp(options)
    i = -1

    polygons = arranged.map ({ points, xmin, xmax }) ->
      scaled_points = points.map scale
      points.push [xmax, base]
      points.push [xmin, base]
      scaled_points_closed = points.map scale
      i += 1

      O.enhance options.compute,
        item: options.data[i]
        line: Polygon
          points: scaled_points
          closed: false
        area: Polygon
          points: scaled_points_closed
          closed: true
        index: i

    axes = options.axes
    y_axis =
      if axes?.y?.steps?
      then Axis.steps [base, ymax], axes.y.steps
      else if axes?.y? then Axis.step [base, ymax], axes?.y?.step or 1

    curves: polygons
    xscale: xscale
    yscale: yscale
    y: if y_axis then y_axis.map (y) -> { position: y, value: y }
