// Lyric lines with timing in milliseconds from song start
// Each line: text, startTime (ms), charDelay (ms per character)
export const LYRICS = [
  {
    id: 0,
    text: 'Sambhaal ke rakha wo phool mera tu',
    startTime: 200,
    charDelay: 70,
  },
  {
    id: 1,
    text: 'Meri shayari mein zaroor raha tu',
    startTime: 2900,
    charDelay: 70,
  },
  {
    id: 2,
    text: 'Jo aankhon mein pyaari si duniya basaayi',
    startTime: 3600,
    charDelay: 75,
  },
  {
    id: 3,
    text: 'Wo duniya bhi tha tu, wo lamha bhi tha tu',
    startTime: 8800,
    charDelay: 80,
  },
  {
    id: 4,
    text: 'Haan, lagte hain mujhko ye kisse sataane',
    startTime: 10950,
    charDelay: 80,
  },
  {
    id: 5,
    text: 'Deta na dil mera tujhko bhulaane',
    startTime: 14500,
    charDelay: 80,
  },
  {
    id: 6,
    text: 'Adhoore se vaade, adhoori si raatein',
    startTime: 15500,
    charDelay: 80,
  },
  {
    id: 7,
    text: 'Ab hisse mein daakhil mere bas wo yaadein',
    startTime: 18000,
    charDelay: 80,
  },
]

// When the proposal scene begins (after last lyric finishes + buffer)
export const PROPOSAL_START_TIME = 34900

// Song duration in ms (used as fallback)
export const SONG_DURATION = 35000
