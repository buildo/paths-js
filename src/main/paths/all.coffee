define [
  './bar'
  './bezier'
  './connector'
  './curved-rectangle'
  './graph'
  './linear'
  './ops'
  './path'
  './pie'
  './polygon'
  './radar'
  './rectangle'
  './sector'
  './semi-regular-polygon'
  './smooth-line'
  './stacked-bar'
  './stock'
  './tree'
  './waterfall'
], (Bar, Bezier, Connector, CurvedRectangle, Graph, Linear, Ops, Path, Pie, Polygon, Radar, Rectangle, Sector, SemiRegularPolygon, SmoothLine, StackedBar, Stock, Tree, Waterfall)->

  window.paths =
    Bar: Bar
    Bezier: Bezier
    Connector: Connector
    CurvedRectangle: CurvedRectangle
    Graph: Graph
    Linear: Linear
    Ops: Ops
    Path: Path
    Pie: Pie
    Polygon: Polygon
    Radar: Radar
    Rectangle: Rectangle
    Sector: Sector
    SemiRegularPolygon: SemiRegularPolygon
    SmoothLine: SmoothLine
    StackedBar: StackedBar
    Stock: Stock
    Tree: Tree
    Waterfall: Waterfall
