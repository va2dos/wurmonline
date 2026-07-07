const REAL_MS_PER_WURM_YEAR = 42 * 24 * 60 * 60 * 1000;
const REAL_MS_PER_STARFALL = 3.5 * 24 * 60 * 60 * 1000;
const REAL_MS_PER_WEEK = 21 * 60 * 60 * 1000;
const REAL_MS_PER_DAY = 3 * 60 * 60 * 1000;

const OBSERVED_REAL_TIME = new Date("2026-07-06T20:11:00Z");
const OBSERVED_WURM = {
  wurmYear: 1145,
  starfall: 4,
  week: 1,
  day: 3,
  wurmHours: 1,
  wurmMinutes: 41,
  wurmSeconds: 0,
};

function computeEpochFromObservation(obsReal, obsWurm) {
  const offsetWithinYear =
    obsWurm.starfall * REAL_MS_PER_STARFALL +
    obsWurm.week * REAL_MS_PER_WEEK +
    obsWurm.day * REAL_MS_PER_DAY +
    obsWurm.wurmHours * 60 * 60 * 1000 +
    obsWurm.wurmMinutes * 60 * 1000 +
    obsWurm.wurmSeconds * 1000;

  const diff = obsWurm.wurmYear * REAL_MS_PER_WURM_YEAR + offsetWithinYear;
  return new Date(obsReal.getTime() - diff);
}

function getWurmTimeFromEpoch(epoch, now = new Date()) {
  const diff = now.getTime() - epoch.getTime();
  const wurmYear = Math.floor(diff / REAL_MS_PER_WURM_YEAR);
  const yearProgress = diff % REAL_MS_PER_WURM_YEAR;
  const starfall = Math.floor(yearProgress / REAL_MS_PER_STARFALL);
  const starfallProgress = yearProgress % REAL_MS_PER_STARFALL;
  const week = Math.floor(starfallProgress / REAL_MS_PER_WEEK);
  const weekProgress = starfallProgress % REAL_MS_PER_WEEK;
  const day = Math.floor(weekProgress / REAL_MS_PER_DAY);
  const dayProgress = weekProgress % REAL_MS_PER_DAY;
  const wurmHours = Math.floor(dayProgress / (60 * 60 * 1000));
  const wurmMinutes = Math.floor((dayProgress % (60 * 60 * 1000)) / (60 * 1000));
  const wurmSeconds = Math.floor((dayProgress % (60 * 1000)) / 1000);
  return { wurmYear, starfall, week, day, wurmHours, wurmMinutes, wurmSeconds };
}

const epoch = computeEpochFromObservation(OBSERVED_REAL_TIME, OBSERVED_WURM);
console.log('Computed WURM_EPOCH =', epoch.toISOString());

console.log('Wurm time at observed real:', getWurmTimeFromEpoch(epoch, OBSERVED_REAL_TIME));
console.log('Wurm time now:', getWurmTimeFromEpoch(epoch, new Date()));

// Also show milliseconds offsets for debugging
const offsetWithinYear =
  OBSERVED_WURM.starfall * REAL_MS_PER_STARFALL +
  OBSERVED_WURM.week * REAL_MS_PER_WEEK +
  OBSERVED_WURM.day * REAL_MS_PER_DAY +
  OBSERVED_WURM.wurmHours * 60 * 60 * 1000 +
  OBSERVED_WURM.wurmMinutes * 60 * 1000 +
  OBSERVED_WURM.wurmSeconds * 1000;
console.log('offsetWithinYear ms =', offsetWithinYear);

// Now compute an epoch that maps *now* to the expected wurm time the user supplied
const EXPECTED_WURM_NOW = {
  wurmYear: 1145,
  starfall: 4, // Bear
  week: 2, // week 3 (0-based)
  day: 2, // "the Wurm" is index 2 (0-based)
  wurmHours: 5,
  wurmMinutes: 11,
  wurmSeconds: 43,
};

const epochForExpectedNow = computeEpochFromObservation(new Date(), EXPECTED_WURM_NOW);
console.log('Epoch that maps now to expected wurm:', epochForExpectedNow.toISOString());
console.log('Wurm time now with that epoch:', getWurmTimeFromEpoch(epochForExpectedNow, new Date()));
