IntervalGauge = require '../dist/node/interval-gauge.js'
Linear = require '../dist/node/linear.js'
expect = require 'expect.js'

data = [
  {interval: [40, 60], color: 'yellow'}
  {interval: [0, 80], color: 'orange'}
  {interval: [50, 60], color: 'green'}
  {interval: [0, 100], color: 'red'}
]

cfg =
  data: data
  accessor: ({interval}) -> interval
  width: 200
  height: 10
  compute:
    myitem: (i, d) -> d
    myindex: (i, d) -> i
  axes:
    x:
      step: 20
      min: 10
gauge = IntervalGauge cfg

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

  describe 'scale', ->
    it 'should be ~linear if no min_interval is specified', ->
      min = Math.min.apply Math, data.map ({interval}) -> interval[0]
      max = Math.max.apply Math, data.map ({interval}) -> interval[1]
      e = (max - min) / 100
      linear = Linear [min, max], [0, cfg.width]

      for x in [min..max] by (max - min) / 10
        l = linear x
        expect(gauge.scale(x)).to.be.within(l - e, l + e)

    it 'should be ~linear within each interval', ->
      data1 = [
        [0, 100]
        [40, 60]
        [40, 42]
      ]
      intervals = [
        [0, 40]
        [40, 42]
        [42, 60]
        [60, 100]
      ]
      resulting_intervals = [ # considering min_interval
        [0, 40]
        [40, 50]
        [50, 60]
        [60, 100]
      ]
      gauge1 = IntervalGauge
        data: data1
        min_interval: 10
        width: 100
        height: 10

      for int, i in intervals
        resulting = resulting_intervals[i]
        e = (int[1] - int[0]) / 100
        linear = Linear [int[0], int[1]], [resulting[0], resulting[1]]
        for n in [int[0]..int[1]] by (int[1] - int[0]) / 10
          l = linear n
          expect(gauge1.scale(n)).to.be.within(l - e, l + e)

  describe 'axes', ->
    it 'should compute x axis values with requested step', ->
      expect(gauge.x).to.eql([10, 30, 50, 70, 90].map (v) -> { position: v, value: v })

    it 'should compute x axis values with requested number of steps', ->
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

    it 'should compute x axis values as split values', ->
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
            splits: true
            min: 10
            max: 90
      expect(gauge1.x).to.eql([40, 50, 60, 80].map (v) -> { position: v, value: v })
