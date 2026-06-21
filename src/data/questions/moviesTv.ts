import { build, tf } from './_builder';

export const moviesTv = build('movies-tv', [
  // easy
  { id: '001', d: 'easy', q: 'In "Toy Story," what kind of toy is Woody?', a: 'A cowboy', o: ['An astronaut', 'A dinosaur', 'A robot'], e: 'Woody is a pull-string cowboy doll.', t: ['animation', 'pixar'] },
  { id: '002', d: 'easy', q: 'Which movie features a young lion named Simba?', a: 'The Lion King', o: ['Madagascar', 'Tarzan', 'Jungle Book'], e: 'Simba is the heir to Pride Rock in Disney’s The Lion King.', t: ['animation', 'disney'] },
  { id: '003', d: 'easy', q: 'What is the highest-grossing film franchise about a galaxy far, far away?', a: 'Star Wars', o: ['Star Trek', 'Dune', 'Guardians of the Galaxy'], e: 'Star Wars began with the 1977 original film.', t: ['sci-fi'] },
  ...[tf('004', 'easy', '"Friends" is set primarily in New York City.', true, 'The sitcom follows six friends living in Manhattan.', ['tv', 'sitcom'])],
  { id: '005', d: 'easy', q: 'Which actor played Jack in the 1997 film "Titanic"?', a: 'Leonardo DiCaprio', o: ['Brad Pitt', 'Matt Damon', 'Tom Cruise'], e: 'DiCaprio starred opposite Kate Winslet.', t: ['drama'] },

  // medium
  { id: '006', d: 'medium', q: 'Which film won the Academy Award for Best Picture in 2020 (a Korean film)?', a: 'Parasite', o: ['1917', 'Joker', 'Once Upon a Time in Hollywood'], e: 'Parasite was the first non-English film to win Best Picture.', t: ['drama'], region: 'Asia' },
  { id: '007', d: 'medium', q: 'In the MCU, what metal is Captain America’s shield primarily made of?', a: 'Vibranium', o: ['Adamantium', 'Titanium', 'Uru'], e: 'Vibranium is the fictional Wakandan metal in Marvel comics/films.', t: ['marvel', 'comics'] },
  { id: '008', d: 'medium', q: 'Which TV series features the Stark, Lannister, and Targaryen houses?', a: 'Game of Thrones', o: ['The Witcher', 'Vikings', 'The Crown'], e: 'These noble houses vie for the Iron Throne.', t: ['tv', 'fantasy'] },
  { id: '009', d: 'medium', q: 'Who directed "Inception" and "Interstellar"?', a: 'Christopher Nolan', o: ['Denis Villeneuve', 'Ridley Scott', 'James Cameron'], e: 'Nolan is known for cerebral, time-bending blockbusters.', t: ['sci-fi'] },
  ...[tf('010', 'medium', 'The Breaking Bad spin-off is called "Better Call Saul".', true, 'It follows lawyer Jimmy McGill (Saul Goodman).', ['tv'])],
  { id: '011', d: 'medium', q: 'Which animated studio created "Up," "Coco," and "Inside Out"?', a: 'Pixar', o: ['DreamWorks', 'Studio Ghibli', 'Illumination'], e: 'Pixar is renowned for emotionally resonant animated features.', t: ['animation', 'pixar'] },

  // hard
  { id: '012', d: 'hard', q: 'Which 1994 film tells the life story of a man "running" through historic events?', a: 'Forrest Gump', o: ['Field of Dreams', 'Rain Man', 'Cast Away'], e: 'Tom Hanks won an Oscar for the title role.', t: ['drama'] },
  { id: '013', d: 'hard', q: 'In "The Matrix," which colored pill does Neo take to learn the truth?', a: 'Red', o: ['Blue', 'Green', 'White'], e: 'The red pill reveals reality; the blue pill keeps the illusion.', t: ['sci-fi'] },
  { id: '014', d: 'hard', q: 'Which director made "Jaws," "E.T.," and "Jurassic Park"?', a: 'Steven Spielberg', o: ['George Lucas', 'Robert Zemeckis', 'Ron Howard'], e: 'Spielberg helped define the modern blockbuster.', t: ['adventure'] },
  ...[tf('015', 'hard', 'The TV series "The Sopranos" aired on HBO.', true, 'It ran on HBO from 1999 to 2007.', ['tv', 'drama'])],
  { id: '016', d: 'hard', q: 'Which film features a character named Hannibal Lecter?', a: 'The Silence of the Lambs', o: ['Se7en', 'Zodiac', 'American Psycho'], e: 'Anthony Hopkins won an Oscar as Lecter (1991).', t: ['thriller'] },

  // expert
  { id: '017', d: 'expert', q: 'Who was the first African American to win the Academy Award for Best Actor?', a: 'Sidney Poitier', o: ['Denzel Washington', 'Morgan Freeman', 'Jamie Foxx'], e: 'Poitier won in 1964 for "Lilies of the Field".', t: ['drama', 'history'] },
  { id: '018', d: 'expert', q: 'Which silent film comedian was known as "The Tramp"?', a: 'Charlie Chaplin', o: ['Buster Keaton', 'Harold Lloyd', 'Stan Laurel'], e: 'Chaplin’s bowler-hatted Tramp is cinema’s most iconic silent character.', t: ['classic'], region: 'Europe' },
  { id: '019', d: 'expert', q: 'What was the first feature-length fully computer-animated film?', a: 'Toy Story', o: ['Shrek', 'Antz', 'A Bug’s Life'], e: 'Pixar’s Toy Story (1995) was the first fully CGI feature.', t: ['animation'] },
  { id: '020', d: 'expert', q: 'Which Alfred Hitchcock film is famous for its shower scene?', a: 'Psycho', o: ['Vertigo', 'The Birds', 'Rear Window'], e: 'The 1960 shower sequence is one of cinema’s most studied scenes.', t: ['thriller', 'classic'] },
  { id: '021', d: 'expert', q: 'Which TV drama is set at the advertising agency Sterling Cooper?', a: 'Mad Men', o: ['Suits', 'The West Wing', 'Boardwalk Empire'], e: 'Mad Men follows 1960s ad executive Don Draper.', t: ['tv', 'drama'] },
]);
