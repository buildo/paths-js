define [
], ()->
  step: (interval, step) ->
    min = Math.floor interval[0]
    max = Math.ceil interval[1]
    step = Math.round step or 1
    rangeStart = if min == interval[0] then min else min + step
    rangeEnd = if max == interval[1] then max else max - step
    v for v in [rangeStart .. rangeEnd] by step