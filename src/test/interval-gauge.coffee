IntervalGauge = require '../dist/node/interval-gauge.js'
expect = require 'expect.js'

data = [
  {interval: [40, 60], color: 'yellow'}
  {interval: [0, 80], color: 'orange'}
  {interval: [50, 60], color: 'green'}
  {interval: [0, 100], color: 'red'}
]

gauge = IntervalGauge
  data: data
  accessor: ({interval}) -> interval
  width: 100
  height: 10
  compute:
    myitem: (i, d) -> d
    myindex: (i, d) -> i
  axes:
    x:
      step: 20
      min: 10

describe 'interval gauge chart', ->
  it 'should generate a consistent number of lines', ->
    expect(gauge.curves.length).to.be.lessThan(2 * data.length)

  it 'should generate the correct number of steps', ->
    expect(gauge.curves.length).to.be(5)

  it 'should generate the steps in the correct order', ->
    expect(gauge.curves.map ({item}) -> item.color).to.eql([
      'orange'
      'yellow'
      'green'
      'orange'
      'red'
    ])

  it 'should give access to the original items', ->
    expect(gauge.curves[0].item).to.be(data[1])

  it 'should allow custom computations', ->
    expect(gauge.curves[2].myitem).to.be(gauge.curves[2].item)
    expect(gauge.curves[2].myindex).to.be(gauge.curves[2].index)

  describe 'axes', ->
    it 'should compute x axis values with requested step', ->
      expect(gauge.x).to.eql([10, 30, 50, 70, 90].map (v) -> { position: v, value: v })

    it 'should compute y axis values with requested number of steps', ->
      gauge1 = IntervalGauge
        data: data
        accessor: ({interval}) -> interval
        width: 100
        height: 10
        compute:
          myitem: (i, d) -> d
          myindex: (i, d) -> i
        axes:
          x:
            steps: 4
      expect(gauge1.x).to.eql([0, 25, 50, 75, 100].map (v) -> { position: v, value: v })
