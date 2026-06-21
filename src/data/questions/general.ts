import { build, tf } from './_builder';

export const general = build('general', [
  // easy
  { id: '001', d: 'easy', q: 'How many continents are there on Earth?', a: '7', o: ['5', '6', '8'], e: 'The seven continents are Asia, Africa, North America, South America, Antarctica, Europe and Australia.', t: ['world'] },
  { id: '002', d: 'easy', q: 'How many colors are in a rainbow (traditionally)?', a: '7', o: ['5', '6', '9'], e: 'Red, orange, yellow, green, blue, indigo and violet.', t: ['nature'] },
  { id: '003', d: 'easy', q: 'What is the currency used in Japan?', a: 'Yen', o: ['Won', 'Yuan', 'Ringgit'], e: 'The Japanese yen is one of the world’s major currencies.', t: ['money'], region: 'Asia' },
  ...[tf('004', 'easy', 'There are 24 hours in a day.', true, 'A solar day is divided into 24 hours.', ['time'])],
  { id: '005', d: 'easy', q: 'How many sides does a hexagon have?', a: '6', o: ['5', '7', '8'], e: 'A hexagon is a six-sided polygon.', t: ['math'] },
  { id: '006', d: 'easy', q: 'What is the largest mammal that can fly?', a: 'A bat (flying fox)', o: ['A flying squirrel', 'An eagle', 'A pelican'], e: 'Large fruit bats are the only mammals capable of sustained flight.', t: ['animals'] },

  // medium
  { id: '007', d: 'medium', q: 'How many degrees are in a circle?', a: '360', o: ['180', '270', '400'], e: 'A full circle measures 360 degrees.', t: ['math'] },
  { id: '008', d: 'medium', q: 'What is the Roman numeral for 50?', a: 'L', o: ['C', 'X', 'D'], e: 'L = 50, C = 100, D = 500, M = 1000.', t: ['math'] },
  { id: '009', d: 'medium', q: 'Which planet is closest to the Sun?', a: 'Mercury', o: ['Venus', 'Earth', 'Mars'], e: 'Mercury orbits nearest the Sun.', t: ['space'] },
  { id: '010', d: 'medium', q: 'What is the chemical symbol for table salt’s metal component, sodium?', a: 'Na', o: ['So', 'Sd', 'S'], e: 'Sodium’s symbol Na comes from Latin "natrium".', t: ['chemistry'] },
  ...[tf('011', 'medium', 'A leap year occurs every four years (with some exceptions).', true, 'Leap years add a day in February; century years must be divisible by 400.', ['time'])],
  { id: '012', d: 'medium', q: 'What is the largest internal organ in the human body?', a: 'Liver', o: ['Brain', 'Lungs', 'Stomach'], e: 'The liver is the largest solid internal organ.', t: ['biology'] },
  { id: '013', d: 'medium', q: 'How many players are on a basketball team on the court per side?', a: '5', o: ['6', '7', '4'], e: 'Basketball is played 5-on-5.', t: ['sports'] },

  // hard
  { id: '014', d: 'hard', q: 'What is the square root of 144?', a: '12', o: ['14', '11', '16'], e: '12 × 12 = 144.', t: ['math'] },
  { id: '015', d: 'hard', q: 'Which Greek letter is commonly used to represent the ratio of a circle’s circumference to diameter?', a: 'Pi (π)', o: ['Sigma (σ)', 'Theta (θ)', 'Omega (ω)'], e: 'π ≈ 3.14159.', t: ['math'] },
  { id: '016', d: 'hard', q: 'What is the term for a word that reads the same backward and forward?', a: 'Palindrome', o: ['Anagram', 'Homonym', 'Acronym'], e: '"Level" and "racecar" are palindromes.', t: ['language'] },
  { id: '017', d: 'hard', q: 'In which year did humans first land on the Moon?', a: '1969', o: ['1965', '1972', '1959'], e: 'Apollo 11 landed on July 20, 1969.', t: ['history', 'space'] },
  ...[tf('018', 'hard', 'A "googol" is the number 1 followed by 100 zeros.', true, 'A googol is 10^100; the search engine’s name is a play on it.', ['math'])],
  { id: '019', d: 'hard', q: 'How many keys are there in an octave on a piano (white and black)?', a: '12', o: ['7', '8', '10'], e: 'An octave contains 12 semitones (7 white + 5 black keys).', t: ['music'] },

  // expert
  { id: '020', d: 'expert', q: 'What is the only number that is neither prime nor composite?', a: '1', o: ['0', '2', '3'], e: '1 is a unit — it has only one divisor, itself.', t: ['math'] },
  { id: '021', d: 'expert', q: 'Which language has the most native speakers worldwide?', a: 'Mandarin Chinese', o: ['English', 'Spanish', 'Hindi'], e: 'Mandarin Chinese has the most native speakers.', t: ['language'], region: 'Asia' },
  { id: '022', d: 'expert', q: 'What is the SI base unit of luminous intensity?', a: 'Candela', o: ['Lumen', 'Lux', 'Watt'], e: 'The candela is one of the seven SI base units.', t: ['science'] },
  { id: '023', d: 'expert', q: 'The Fibonacci sequence begins 0, 1, 1, 2, 3, 5... What is the next number?', a: '8', o: ['7', '9', '6'], e: 'Each term is the sum of the previous two: 3 + 5 = 8.', t: ['math'] },
  { id: '024', d: 'expert', q: 'What is the most abundant metal in Earth’s crust?', a: 'Aluminum', o: ['Iron', 'Copper', 'Gold'], e: 'Aluminum is the most abundant metal in the crust (~8%).', t: ['chemistry', 'earth-science'] },
  { id: '025', d: 'expert', q: 'How many bits are in a byte?', a: '8', o: ['4', '16', '32'], e: 'A byte is standardly composed of 8 bits.', t: ['technology'] },
]);
