// Data.
import statistics from '_data/statistics';

const activityData = statistics.activity.slice(-7);
let activity = 0;
activityData.map((item) => activity += item.value);

const indicators = {
  activity: {
    diff: 12,
    value: Math.trunc(activity / 7),
  },
  productivity: {
    diff: 17,
    value: 78,
  },
  sleep: {
    diff: 9,
    value: 8.65,
  },
  wellness: {
    diff: 28,
    value: 61,
  },
};

export default indicators;
