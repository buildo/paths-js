define [
], ->
  step = (interval, step) ->
    min = if step >= 1 then Math.floor interval[0] else interval[0]
    max = if step >= 1 then Math.ceil interval[1] else interval[1]
    rangeStart = if min == interval[0] then min else min + step
    rangeEnd = if max == interval[1] then max else max - step
    v for v in [rangeStart .. rangeEnd] by step

  step: step
  steps: (interval, n) ->
    s = (interval[1] - interval[0]) / (n + 1)
    step interval, if s > 1 then Math.round s else s;