define [
], ()->
  step = (interval, step) ->
    min = Math.floor interval[0]
    max = Math.ceil interval[1]
    step = Math.round step
    rangeStart = if min == interval[0] then min else min + step
    rangeEnd = if max == interval[1] then max else max - step
    v for v in [rangeStart .. rangeEnd] by step

  step: step
  steps: (interval, n) -> step interval, Math.round (interval[1] - interval[0]) / n