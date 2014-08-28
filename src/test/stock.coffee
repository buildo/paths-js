Stock = require '../dist/node/stock.js'
expect = require 'expect.js'

data = [
  [
    { year: 2012, month: 1, value: 13 }
    { year: 2012, month: 2, value: 12 }
    { year: 2012, month: 3, value: 15 }
    { year: 2012, month: 4, value: 10 }
    { year: 2012, month: 5, value: 9 }
    { year: 2012, month: 6, value: 8 }
    { year: 2012, month: 7, value: 11 }
    { year: 2012, month: 8, value: 10 }
    { year: 2012, month: 9, value: 13 }
    { year: 2012, month: 10, value: 13 }
    { year: 2012, month: 11, value: 12 }
    { year: 2012, month: 12, value: 9 }
    { year: 2013, month: 1, value: 12 }
    { year: 2013, month: 2, value: 15 }
    { year: 2013, month: 3, value: 16 }
    { year: 2013, month: 4, value: 14 }
  ]
  [
    { year: 2012, month: 1, value: 21 }
    { year: 2012, month: 2, value: 22 }
    { year: 2012, month: 3, value: 22 }
    { year: 2012, month: 4, value: 20 }
    { year: 2012, month: 5, value: 19 }
    { year: 2012, month: 6, value: 18 }
    { year: 2012, month: 7, value: 22 }
    { year: 2012, month: 8, value: 19 }
    { year: 2012, month: 9, value: 19 }
    { year: 2012, month: 10, value: 18 }
    { year: 2012, month: 11, value: 16 }
    { year: 2012, month: 12, value: 15 }
    { year: 2013, month: 1, value: 16 }
    { year: 2013, month: 2, value: 18 }
    { year: 2013, month: 3, value: 19 }
    { year: 2013, month: 4, value: 18 }
  ]
]

round = (x, digits = 5) ->
  a = Math.pow(10, digits)
  Math.round(a * x) / a

round_vector = (v, digits = 5) ->
  v.map (x) -> round(x, digits)

date = (data) ->
  d = new Date()
  d.setYear(data.year)
  d.setMonth(data.month - 1)
  d.getTime()

stock = Stock
  data: data
  xaccessor: date
  yaccessor: (d) -> d.value
  width: 300
  height: 200

describe 'stock chart', ->
  it 'should generate as many points as data', ->
    expect(stock.curves[0].line.path.points()).to.have.length(data[0].length)

  it 'should generate both closed and open polygons', ->
    line = stock.curves[0].line
    area = stock.curves[0].area
    expect(line.path.print()).not.to.match(/Z/)
    expect(area.path.print()).to.match(/Z/)

  it 'should generate closed and open polygons with the same points', ->
    line = stock.curves[0].line
    area = stock.curves[0].area
    expect(area.path.points().slice(0, 16)).to.eql(line.path.points())

  it 'should give access to the original items', ->
    expect(stock.curves[1].item).to.be(data[1])

  it 'should allow custom computations', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      compute:
        myitem: (i, d) -> d
        myindex: (i, d) -> i
    expect(stock1.curves[1].myitem).to.be(stock1.curves[1].item)
    expect(stock1.curves[1].myindex).to.be(stock1.curves[1].index)

  it 'should allow not to include 0 as a baseline for area paths', ->
    points = stock.curves[0].area.path.points().map (v) -> round_vector(v)
    # When 0 is not included, the two extremes in the area path
    # close at the same level as the minimum value, hence we find
    # 3 points with y = 200
    expect(points.filter (p) -> p[1] == 200).to.have.length(3)

  it 'should allow to include 0 as a baseline for area paths', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      closed: true
    points = stock1.curves[0].area.path.points().map (v) -> round_vector(v)
    # When 0 is not included, only the two extremes in the area path
    # have y = 200
    expect(points.filter (p) -> p[1] == 200).to.have.length(2)

describe 'stock chart scales', ->
  it 'should take into account all data involved', ->
    scale = stock.yscale
    expect(scale(8)).to.be(200)
    expect(scale(22)).to.be(0)

  it 'should take into account if 0 is to be displayed as a baseline', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      closed: true
    scale = stock1.yscale
    expect(scale(0)).to.be(200)
    expect(scale(22)).to.be(0)

describe 'stock chart axes', ->
  it 'should compute y axis values with requested step', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      axes:
        y:
          step: 2
    expect(stock1.y).not.to.be(undefined)
    expect(stock1.y).to.eql([8, 10, 12, 14, 16, 18, 20, 22].map (v) -> { position: v, value: v })

  it 'should compute y axis values with requested number of steps', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      axes:
        y:
          steps: 5
    expect(stock1.y).not.to.be(undefined)
    expect(stock1.y).to.eql([8, 11, 14, 17, 20].map (v) -> { position: v, value: v })
