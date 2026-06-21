import { build, tf } from './_builder';

export const entertainment = build('entertainment', [
  // easy
  { id: '001', d: 'easy', q: 'Which streaming service produced "Stranger Things"?', a: 'Netflix', o: ['Hulu', 'Disney+', 'HBO Max'], e: 'Stranger Things debuted on Netflix in 2016.', t: ['tv'] },
  { id: '002', d: 'easy', q: 'What is the name of the wizarding school in the Harry Potter series?', a: 'Hogwarts', o: ['Beauxbatons', 'Durmstrang', 'Ilvermorny'], e: 'Hogwarts School of Witchcraft and Wizardry is the central setting.', t: ['movies', 'books'] },
  { id: '003', d: 'easy', q: 'Which superhero is known as the "Caped Crusader"?', a: 'Batman', o: ['Superman', 'Spider-Man', 'Iron Man'], e: 'Batman, alias Bruce Wayne, is the Caped Crusader of Gotham.', t: ['comics', 'movies'] },
  { id: '004', d: 'easy', q: 'Who voices the genie in Disney’s 1992 animated "Aladdin"?', a: 'Robin Williams', o: ['Eddie Murphy', 'Jim Carrey', 'Steve Martin'], e: 'Robin Williams’ improvised performance became iconic.', t: ['movies', 'animation'] },
  ...[tf('005', 'easy', 'A "season finale" is the last episode of a TV season.', true, 'A season finale closes out a season’s storyline.', ['tv'])],
  { id: '006', d: 'easy', q: 'Which band performed "Bohemian Rhapsody"?', a: 'Queen', o: ['The Beatles', 'Led Zeppelin', 'The Rolling Stones'], e: 'Queen released the genre-bending epic in 1975.', t: ['music'] },

  // medium
  { id: '007', d: 'medium', q: 'Which movie features the quote "I’ll be back"?', a: 'The Terminator', o: ['Die Hard', 'RoboCop', 'Predator'], e: 'Arnold Schwarzenegger’s line became a cultural catchphrase.', t: ['movies'] },
  { id: '008', d: 'medium', q: 'In "The Office" (US), what is the name of the paper company?', a: 'Dunder Mifflin', o: ['Wernham Hogg', 'Sabre', 'Vance Refrigeration'], e: 'The show follows the Scranton branch of Dunder Mifflin.', t: ['tv'] },
  { id: '009', d: 'medium', q: 'Who composed the iconic film score for "Star Wars"?', a: 'John Williams', o: ['Hans Zimmer', 'Danny Elfman', 'Howard Shore'], e: 'John Williams composed the iconic Star Wars themes.', t: ['movies', 'music'] },
  { id: '010', d: 'medium', q: 'Which animated franchise features a clownfish searching for his son?', a: 'Finding Nemo', o: ['Shark Tale', 'The Little Mermaid', 'Moana'], e: 'Pixar’s Finding Nemo (2003) follows Marlin searching for Nemo.', t: ['movies', 'animation'] },
  { id: '011', d: 'medium', q: 'Which artist is known as the "King of Pop"?', a: 'Michael Jackson', o: ['Elvis Presley', 'Prince', 'Justin Timberlake'], e: 'Michael Jackson earned the title with global hits like "Thriller".', t: ['music'] },
  ...[tf('012', 'medium', 'The TV series "Game of Thrones" is based on novels by George R. R. Martin.', true, 'It adapts "A Song of Ice and Fire".', ['tv', 'books'])],
  { id: '013', d: 'medium', q: 'Which video game character is a plumber who rescues a princess?', a: 'Mario', o: ['Link', 'Sonic', 'Kirby'], e: 'Nintendo’s Mario debuted in Donkey Kong (1981).', t: ['games'] },
  { id: '014', d: 'medium', q: 'Who directed "Pulp Fiction" and "Kill Bill"?', a: 'Quentin Tarantino', o: ['Martin Scorsese', 'Christopher Nolan', 'Coen Brothers'], e: 'Tarantino is known for nonlinear, stylized storytelling.', t: ['movies'] },

  // hard
  { id: '015', d: 'hard', q: 'Which film won the first Academy Award for Best Picture (1929)?', a: 'Wings', o: ['Sunrise', 'The Jazz Singer', 'Metropolis'], e: '"Wings", a WWI aviation epic, won the first Best Picture.', t: ['movies'] },
  { id: '016', d: 'hard', q: 'Which artist released the best-selling album "Thriller"?', a: 'Michael Jackson', o: ['Whitney Houston', 'Prince', 'Madonna'], e: '"Thriller" (1982) is among the best-selling albums of all time.', t: ['music'] },
  { id: '017', d: 'hard', q: 'In Studio Ghibli’s "Spirited Away," what is the name of the girl protagonist?', a: 'Chihiro', o: ['Sophie', 'Satsuki', 'Kiki'], e: 'Chihiro (renamed Sen) navigates a spirit world bathhouse.', t: ['movies', 'animation'], region: 'Asia' },
  { id: '018', d: 'hard', q: 'Which TV show is set in the fictional town of Pawnee, Indiana?', a: 'Parks and Recreation', o: ['Community', 'Brooklyn Nine-Nine', 'The Good Place'], e: 'Leslie Knope works for the Pawnee Parks Department.', t: ['tv'] },
  ...[tf('019', 'hard', 'Beyoncé was a member of the group Destiny’s Child before her solo career.', true, 'She rose to fame with Destiny’s Child in the late 1990s.', ['music'])],
  { id: '020', d: 'hard', q: 'Which 1939 film features the line "Frankly, my dear, I don’t give a damn"?', a: 'Gone with the Wind', o: ['Casablanca', 'The Wizard of Oz', 'Citizen Kane'], e: 'Rhett Butler delivers the famous closing line.', t: ['movies'] },

  // expert
  { id: '021', d: 'expert', q: 'The acronym "EGOT" stands for winning the Emmy, Grammy, Oscar, and which fourth award?', a: 'Tony', o: ['Pulitzer', 'Peabody', 'Golden Globe'], e: 'EGOT = Emmy, Grammy, Oscar, Tony — the grand slam of show business.', t: ['theatre', 'awards'] },
  { id: '022', d: 'expert', q: 'Which director has won the Academy Award for Best Director the most times?', a: 'John Ford', o: ['Steven Spielberg', 'William Wyler', 'Frank Capra'], e: 'John Ford won Best Director four times.', t: ['movies'] },
  { id: '023', d: 'expert', q: 'What was the first feature-length film with synchronized dialogue?', a: 'The Jazz Singer', o: ['Steamboat Willie', 'Metropolis', 'Nosferatu'], e: '"The Jazz Singer" (1927) ushered in the era of "talkies".', t: ['movies'] },
  { id: '024', d: 'expert', q: 'Which composer wrote the operas "The Ring Cycle"?', a: 'Richard Wagner', o: ['Giuseppe Verdi', 'Wolfgang Mozart', 'Giacomo Puccini'], e: 'Wagner’s "Der Ring des Nibelungen" spans four epic operas.', t: ['music', 'classical'], region: 'Europe' },
  { id: '025', d: 'expert', q: 'Which film holds the record for most Academy Awards won (tied at 11)?', a: 'Ben-Hur', o: ['Gone with the Wind', 'Schindler’s List', 'Gladiator'], e: 'Ben-Hur, Titanic and The Return of the King each won 11 Oscars.', t: ['movies'] },
]);
