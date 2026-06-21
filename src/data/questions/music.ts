import { build, tf } from './_builder';

export const music = build('music', [
  // easy
  { id: '001', d: 'easy', q: 'How many strings does a standard guitar have?', a: '6', o: ['4', '7', '12'], e: 'A standard guitar has six strings (basses commonly have four).', t: ['instruments'] },
  { id: '002', d: 'easy', q: 'Which Beatle was known for writing "Imagine"?', a: 'John Lennon', o: ['Paul McCartney', 'George Harrison', 'Ringo Starr'], e: 'Lennon released "Imagine" as a solo single in 1971.', t: ['rock'] },
  { id: '003', d: 'easy', q: 'Which instrument has black and white keys?', a: 'Piano', o: ['Violin', 'Trumpet', 'Flute'], e: 'A piano keyboard alternates white and black (sharp/flat) keys.', t: ['instruments'] },
  ...[tf('004', 'easy', 'An octave spans eight notes of a scale.', true, 'An octave is the interval between a note and the next of the same name.', ['theory'])],
  { id: '005', d: 'easy', q: 'Which artist sang "Rolling in the Deep" and "Hello"?', a: 'Adele', o: ['Beyoncé', 'Rihanna', 'Taylor Swift'], e: 'Adele’s powerful ballads dominated the 2010s charts.', t: ['pop'] },

  // medium
  { id: '006', d: 'medium', q: 'How many symphonies did Ludwig van Beethoven complete?', a: '9', o: ['7', '5', '12'], e: 'Beethoven completed nine symphonies, the last featuring "Ode to Joy".', t: ['classical'], region: 'Europe' },
  { id: '007', d: 'medium', q: 'Which genre originated in New Orleans in the early 20th century?', a: 'Jazz', o: ['Reggae', 'Country', 'Techno'], e: 'Jazz blended blues, ragtime and brass-band traditions.', t: ['jazz'], region: 'North America' },
  { id: '008', d: 'medium', q: 'Bob Marley is most associated with which music genre?', a: 'Reggae', o: ['Blues', 'Soul', 'Funk'], e: 'Marley brought Jamaican reggae to global audiences.', t: ['reggae'], region: 'North America' },
  { id: '009', d: 'medium', q: 'Which family of instruments includes the violin and cello?', a: 'Strings', o: ['Woodwinds', 'Brass', 'Percussion'], e: 'Bowed string instruments produce sound from vibrating strings.', t: ['instruments'] },
  ...[tf('010', 'medium', 'A cappella means singing without instrumental accompaniment.', true, 'A cappella performances use only voices.', ['theory'])],
  { id: '011', d: 'medium', q: 'Which K-pop group released the global hit "Dynamite"?', a: 'BTS', o: ['BLACKPINK', 'EXO', 'TWICE'], e: 'BTS’s "Dynamite" (2020) was their first all-English single.', t: ['pop', 'k-pop'], region: 'Asia' },

  // hard
  { id: '012', d: 'hard', q: 'How many lines are in a musical staff?', a: '5', o: ['4', '6', '7'], e: 'A standard staff has five lines and four spaces.', t: ['theory'] },
  { id: '013', d: 'hard', q: 'Which composer wrote "The Four Seasons"?', a: 'Antonio Vivaldi', o: ['Johann Sebastian Bach', 'Frédéric Chopin', 'Franz Liszt'], e: 'Vivaldi’s Baroque violin concertos depict the seasons.', t: ['classical'], region: 'Europe' },
  { id: '014', d: 'hard', q: 'The "Motown Sound" originated in which U.S. city?', a: 'Detroit', o: ['Memphis', 'Chicago', 'Nashville'], e: 'Motown Records launched in Detroit in 1959.', t: ['soul'], region: 'North America' },
  { id: '015', d: 'hard', q: 'Which Italian term means to play very softly?', a: 'Pianissimo', o: ['Fortissimo', 'Allegro', 'Crescendo'], e: 'Pianissimo (pp) means very quiet; fortissimo (ff) means very loud.', t: ['theory'] },
  ...[tf('016', 'hard', 'Wolfgang Amadeus Mozart composed his first works as a child prodigy.', true, 'Mozart was composing and performing publicly before age ten.', ['classical'])],

  // expert
  { id: '017', d: 'expert', q: 'How many keys are on a standard full-size piano?', a: '88', o: ['76', '92', '64'], e: 'A modern grand piano has 88 keys (52 white, 36 black).', t: ['instruments'] },
  { id: '018', d: 'expert', q: 'Which composer became deaf yet continued to compose major works?', a: 'Ludwig van Beethoven', o: ['Johannes Brahms', 'Robert Schumann', 'Joseph Haydn'], e: 'Beethoven wrote his Ninth Symphony while profoundly deaf.', t: ['classical'], region: 'Europe' },
  { id: '019', d: 'expert', q: 'In music theory, an interval of seven semitones is called a:', a: 'Perfect fifth', o: ['Major third', 'Perfect fourth', 'Octave'], e: 'A perfect fifth spans seven semitones (e.g., C to G).', t: ['theory'] },
  { id: '020', d: 'expert', q: 'Which jazz trumpeter and composer pioneered "cool jazz" and recorded "Kind of Blue"?', a: 'Miles Davis', o: ['Louis Armstrong', 'Dizzy Gillespie', 'John Coltrane'], e: '"Kind of Blue" (1959) is among the best-selling jazz albums ever.', t: ['jazz'], region: 'North America' },
  { id: '021', d: 'expert', q: 'The "Bel Canto" singing style originated in which country?', a: 'Italy', o: ['Germany', 'France', 'Austria'], e: 'Bel canto ("beautiful singing") is an Italian operatic tradition.', t: ['classical', 'opera'], region: 'Europe' },
]);
