import { build, tf } from './_builder';
import type { Question } from '@/types';

// Supplementary questions (ids start at 101 to avoid colliding with the core
// files). These broaden coverage and push the bank past 500 total.

const musicX = build('music', [
  { id: '101', d: 'easy', q: 'Which instrument did jazz legend Louis Armstrong famously play?', a: 'Trumpet', o: ['Saxophone', 'Piano', 'Drums'], e: 'Armstrong was a virtuoso trumpeter and vocalist.', t: ['jazz'] },
  { id: '102', d: 'easy', q: 'Taylor Swift first rose to fame in which genre?', a: 'Country', o: ['Hip-hop', 'Jazz', 'Classical'], e: 'Swift began as a country artist before shifting to pop.', t: ['pop', 'country'] },
  { id: '103', d: 'medium', q: 'Which 1971 album by Marvin Gaye addressed social and political themes?', a: "What's Going On", o: ['Thriller', 'Songs in the Key of Life', 'Innervisions'], e: 'It is celebrated as a landmark concept album.', t: ['soul'] },
  { id: '104', d: 'medium', q: 'The didgeridoo is a wind instrument originating with which people?', a: 'Aboriginal Australians', o: ['Māori', 'Inuit', 'Sami'], e: 'The didgeridoo is one of the oldest wind instruments.', t: ['instruments'], region: 'Oceania' },
  { id: '105', d: 'medium', q: 'Which rapper released the album "good kid, m.A.A.d city"?', a: 'Kendrick Lamar', o: ['Drake', 'J. Cole', 'Travis Scott'], e: 'The 2012 album cemented Lamar as a major voice in hip-hop.', t: ['hip-hop'] },
  { id: '106', d: 'hard', q: 'Which composer wrote "Clair de Lune"?', a: 'Claude Debussy', o: ['Maurice Ravel', 'Erik Satie', 'Camille Saint-Saëns'], e: 'It is the third movement of Debussy’s Suite bergamasque.', t: ['classical'], region: 'Europe' },
  { id: '107', d: 'hard', q: 'The sitar is a string instrument most associated with which country?', a: 'India', o: ['China', 'Egypt', 'Spain'], e: 'Ravi Shankar popularized the sitar worldwide.', t: ['instruments'], region: 'Asia' },
  ...[tf('108', 'expert', 'Johann Sebastian Bach was a leading composer of the Baroque era.', true, 'Bach is one of the most important Baroque composers.', ['classical'])],
]);

const moviesX = build('movies-tv', [
  { id: '101', d: 'easy', q: 'Which animated film features a snowman named Olaf?', a: 'Frozen', o: ['Tangled', 'Moana', 'Encanto'], e: 'Olaf is the cheerful snowman in Disney’s Frozen.', t: ['animation', 'disney'] },
  { id: '102', d: 'easy', q: 'In Jurassic Park, what kind of creatures are brought back to life?', a: 'Dinosaurs', o: ['Dragons', 'Mammoths', 'Aliens'], e: 'The park clones dinosaurs from preserved DNA.', t: ['sci-fi'] },
  { id: '103', d: 'medium', q: 'Which series is set in the fictional Westeros and Essos?', a: 'Game of Thrones', o: ['The Witcher', 'Shadow and Bone', 'His Dark Materials'], e: 'Westeros and Essos are continents in the world of GoT.', t: ['tv', 'fantasy'] },
  { id: '104', d: 'medium', q: 'Who directed the 2019 film "Parasite"?', a: 'Bong Joon-ho', o: ['Park Chan-wook', 'Hirokazu Kore-eda', 'Wong Kar-wai'], e: 'Bong Joon-ho won Best Director and Best Picture.', t: ['drama'], region: 'Asia' },
  { id: '105', d: 'hard', q: 'Which film features the character Tony Montana?', a: 'Scarface', o: ['Goodfellas', 'The Godfather', 'Casino'], e: 'Al Pacino played Tony Montana in the 1983 film.', t: ['crime'] },
  { id: '106', d: 'hard', q: 'Which streaming series follows the British royal family across decades?', a: 'The Crown', o: ['Downton Abbey', 'Bridgerton', 'Victoria'], e: 'The Crown dramatizes the reign of Elizabeth II.', t: ['tv', 'drama'], region: 'Europe' },
  ...[tf('107', 'expert', 'The film "Citizen Kane" was directed by and starred Orson Welles.', true, 'Welles co-wrote, directed and starred in the 1941 classic.', ['classic'])],
]);

const gamesX = build('video-games', [
  { id: '101', d: 'easy', q: 'In Pokémon, what type is Pikachu?', a: 'Electric', o: ['Fire', 'Water', 'Grass'], e: 'Pikachu is the iconic Electric-type mascot of Pokémon.', t: ['nintendo'], region: 'Asia' },
  { id: '102', d: 'easy', q: 'Which game involves building and exploring blocky worlds, owned by Microsoft?', a: 'Minecraft', o: ['Roblox', 'Terraria', 'Stardew Valley'], e: 'Microsoft acquired Mojang, makers of Minecraft, in 2014.', t: ['sandbox'] },
  { id: '103', d: 'medium', q: 'Which company makes the "Grand Theft Auto" series?', a: 'Rockstar Games', o: ['Ubisoft', 'Electronic Arts', 'Activision'], e: 'Rockstar Games develops the GTA franchise.', t: ['open-world'] },
  { id: '104', d: 'medium', q: 'In "Among Us," what are deceptive players called?', a: 'Impostors', o: ['Traitors', 'Spies', 'Ghosts'], e: 'Impostors sabotage and eliminate the crewmates.', t: ['party'] },
  { id: '105', d: 'hard', q: 'Which studio created the "Super Smash Bros." series?', a: 'Nintendo (HAL/Sora)', o: ['Capcom', 'Bandai Namco only', 'Sega'], e: 'Created under Nintendo by Masahiro Sakurai’s teams.', t: ['fighting'], region: 'Asia' },
  { id: '106', d: 'hard', q: 'The game "Tetris" was created by a programmer from which country?', a: 'Soviet Union (Russia)', o: ['Japan', 'United States', 'Sweden'], e: 'Alexey Pajitnov created Tetris in 1984 in the USSR.', t: ['puzzle'], region: 'Europe' },
  ...[tf('107', 'expert', 'The "Souls" series and "Elden Ring" were both developed by FromSoftware.', true, 'FromSoftware created Dark Souls, Bloodborne and Elden Ring.', ['action-rpg'])],
]);

const litX = build('literature', [
  { id: '101', d: 'easy', q: 'Who wrote "The Adventures of Tom Sawyer"?', a: 'Mark Twain', o: ['Charles Dickens', 'Jack London', 'Herman Melville'], e: 'Mark Twain (Samuel Clemens) published it in 1876.', t: ['classics'], region: 'North America' },
  { id: '102', d: 'easy', q: 'Which series features a young girl named Katniss Everdeen?', a: 'The Hunger Games', o: ['Divergent', 'The Maze Runner', 'Twilight'], e: 'Suzanne Collins wrote The Hunger Games trilogy.', t: ['dystopia'] },
  { id: '103', d: 'medium', q: 'Who wrote the dystopian novel "Brave New World"?', a: 'Aldous Huxley', o: ['George Orwell', 'Ray Bradbury', 'H. G. Wells'], e: 'Huxley published it in 1932.', t: ['dystopia'], region: 'Europe' },
  { id: '104', d: 'medium', q: 'Which poet wrote "The Raven"?', a: 'Edgar Allan Poe', o: ['Walt Whitman', 'Emily Dickinson', 'Robert Frost'], e: 'Poe’s haunting poem was published in 1845.', t: ['poetry'], region: 'North America' },
  { id: '105', d: 'hard', q: 'Who wrote "The Great Gatsby"?', a: 'F. Scott Fitzgerald', o: ['Ernest Hemingway', 'John Steinbeck', 'William Faulkner'], e: 'Fitzgerald’s Jazz Age novel appeared in 1925.', t: ['classics'], region: 'North America' },
  { id: '106', d: 'hard', q: 'The character Jay Gatsby pines for which woman?', a: 'Daisy Buchanan', o: ['Jordan Baker', 'Myrtle Wilson', 'Catherine'], e: 'Gatsby’s longing for Daisy drives the novel.', t: ['classics'] },
  ...[tf('107', 'expert', 'Jane Austen’s novels were first published anonymously.', true, 'Her early works appeared credited only "By a Lady".', ['classics'])],
]);

const foodX = build('food-culture', [
  { id: '101', d: 'easy', q: 'Tacos are a traditional dish from which country?', a: 'Mexico', o: ['Spain', 'Peru', 'Argentina'], e: 'Tacos are a cornerstone of Mexican cuisine.', t: ['cuisine'], region: 'North America' },
  { id: '102', d: 'easy', q: 'Which country is famous for inventing pasta dishes like spaghetti?', a: 'Italy', o: ['Greece', 'France', 'Turkey'], e: 'Italy is renowned for its pasta traditions.', t: ['cuisine'], region: 'Europe' },
  { id: '103', d: 'medium', q: 'The dish "pho" is a noodle soup from which country?', a: 'Vietnam', o: ['Thailand', 'China', 'Cambodia'], e: 'Pho is a fragrant Vietnamese beef or chicken noodle soup.', t: ['cuisine'], region: 'Asia' },
  { id: '104', d: 'medium', q: 'Which country hosts the famous "La Tomatina" tomato-throwing festival?', a: 'Spain', o: ['Italy', 'Mexico', 'Portugal'], e: 'La Tomatina takes place in Buñol, Spain.', t: ['festivals'], region: 'Europe' },
  { id: '105', d: 'hard', q: 'Which spice blend is central to Indian "garam masala"?', a: 'A mix of warming spices', o: ['Only chili powder', 'Only turmeric', 'Only salt'], e: 'Garam masala blends spices like cumin, coriander, cardamom and cinnamon.', t: ['spices'], region: 'Asia' },
  { id: '106', d: 'hard', q: 'The "Oktoberfest" beer festival is held annually in which city?', a: 'Munich', o: ['Berlin', 'Vienna', 'Frankfurt'], e: 'Oktoberfest is held in Munich, Germany.', t: ['festivals'], region: 'Europe' },
  ...[tf('107', 'expert', 'Sushi was originally a method of preserving fish in fermented rice.', true, 'Early "narezushi" used fermentation to preserve fish.', ['cuisine'])],
]);

const recordsX = build('world-records', [
  { id: '101', d: 'easy', q: 'What is the fastest bird in level flight / dive?', a: 'Peregrine falcon', o: ['Golden eagle', 'Albatross', 'Swift'], e: 'In a dive, the peregrine falcon exceeds 320 km/h.', t: ['animals'] },
  { id: '102', d: 'easy', q: 'Which country has won the most total Olympic medals all-time?', a: 'United States', o: ['Russia', 'Germany', 'China'], e: 'The U.S. leads the all-time Olympic medal table.', t: ['sports'] },
  { id: '103', d: 'medium', q: 'What is the longest bone in the human body?', a: 'Femur', o: ['Tibia', 'Humerus', 'Fibula'], e: 'The femur (thigh bone) is the longest and strongest bone.', t: ['biology'] },
  { id: '104', d: 'medium', q: 'Which structure is the longest man-made wall in the world?', a: 'The Great Wall of China', o: ['Hadrian’s Wall', 'The Berlin Wall', 'Walls of Constantinople'], e: 'The Great Wall stretches over 21,000 km in total.', t: ['structures'], region: 'Asia' },
  { id: '105', d: 'hard', q: 'What is the most spoken second language in the world?', a: 'English', o: ['Mandarin', 'Spanish', 'French'], e: 'English has the most second-language (non-native) speakers.', t: ['language'] },
  { id: '106', d: 'hard', q: 'Which country produces the most oil annually (recent years)?', a: 'United States', o: ['Saudi Arabia', 'Russia', 'Iran'], e: 'The U.S. became the top oil producer in the late 2010s.', t: ['economy'] },
  ...[tf('107', 'expert', 'Mount Chimborazo’s peak is the farthest point from Earth’s center.', true, 'Due to the equatorial bulge, Chimborazo beats Everest by that measure.', ['geography'])],
]);

const entX = build('entertainment', [
  { id: '101', d: 'easy', q: 'Which social platform is known for short looping videos and a "For You" page?', a: 'TikTok', o: ['LinkedIn', 'Reddit', 'Pinterest'], e: 'TikTok popularized short vertical video feeds.', t: ['internet'] },
  { id: '102', d: 'medium', q: 'Which awards are the highest honors in American television?', a: 'The Emmys', o: ['The Grammys', 'The Tonys', 'The Oscars'], e: 'Emmy Awards recognize excellence in television.', t: ['awards'] },
  { id: '103', d: 'medium', q: 'Which superhero team includes Iron Man, Thor and Captain America?', a: 'The Avengers', o: ['The Justice League', 'The X-Men', 'The Guardians of the Galaxy'], e: 'The Avengers are Marvel’s flagship team.', t: ['comics', 'movies'] },
  { id: '104', d: 'hard', q: 'Which puppet-driven children’s show features characters on "Sesame Street"?', a: 'Sesame Street', o: ['The Muppet Show', 'Fraggle Rock', 'Bear in the Big Blue House'], e: 'Sesame Street debuted in 1969 with Jim Henson’s Muppets.', t: ['tv'] },
  ...[tf('105', 'hard', 'The Grammy Awards are presented by the Recording Academy.', true, 'The Recording Academy presents the Grammys for music.', ['awards', 'music'])],
  { id: '106', d: 'expert', q: 'Which annual film festival awards the "Palme d’Or"?', a: 'Cannes Film Festival', o: ['Venice Film Festival', 'Sundance', 'Berlinale'], e: 'Cannes’ top prize is the Palme d’Or.', t: ['film', 'awards'], region: 'Europe' },
]);

const techX = build('technology', [
  { id: '101', d: 'easy', q: 'Which company developed the search engine that became a verb for searching?', a: 'Google', o: ['Yahoo', 'Microsoft', 'Amazon'], e: '"To google" entered everyday language.', t: ['web'] },
  { id: '102', d: 'medium', q: 'What does "GPU" stand for?', a: 'Graphics Processing Unit', o: ['General Processing Unit', 'Graphical Power Unit', 'Global Processing Utility'], e: 'GPUs accelerate graphics and parallel workloads like AI.', t: ['hardware'] },
  { id: '103', d: 'medium', q: 'Which company created the React JavaScript library?', a: 'Meta (Facebook)', o: ['Google', 'Microsoft', 'Twitter'], e: 'React was created and open-sourced by Facebook (Meta) in 2013.', t: ['programming', 'web'] },
  { id: '104', d: 'hard', q: 'Which protocol assigns IP addresses automatically on a network?', a: 'DHCP', o: ['FTP', 'SMTP', 'SSH'], e: 'DHCP (Dynamic Host Configuration Protocol) hands out IPs.', t: ['networking'] },
  ...[tf('105', 'expert', 'Linux is an open-source operating system kernel created by Linus Torvalds.', true, 'Torvalds released the first Linux kernel in 1991.', ['os', 'history'])],
]);

const miscX: Question[] = [
  ...build('science', [
    { id: '101', d: 'easy', q: 'Which planet is famous for its prominent ring system?', a: 'Saturn', o: ['Mars', 'Venus', 'Mercury'], e: 'Saturn’s rings are made of ice and rock.', t: ['space'] },
    { id: '102', d: 'medium', q: 'What gas do humans exhale that plants use?', a: 'Carbon dioxide', o: ['Oxygen', 'Helium', 'Methane'], e: 'We exhale CO₂, which plants use in photosynthesis.', t: ['biology'] },
    { id: '103', d: 'hard', q: 'What is the hardest known naturally occurring material?', a: 'Diamond', o: ['Quartz', 'Titanium', 'Granite'], e: 'Diamond tops the Mohs hardness scale at 10.', t: ['chemistry'] },
    ...[tf('104', 'expert', 'Light from the Sun takes about 8 minutes to reach Earth.', true, 'Sunlight travels ~150 million km in roughly 8 minutes 20 seconds.', ['space'])],
  ]),
  ...build('history', [
    { id: '101', d: 'easy', q: 'Who was the famous Egyptian queen allied with Julius Caesar and Mark Antony?', a: 'Cleopatra', o: ['Nefertiti', 'Hatshepsut', 'Helen'], e: 'Cleopatra VII allied with Caesar and Antony.', t: ['ancient'], era: 'ancient' },
    { id: '102', d: 'medium', q: 'The Cold War was primarily between the U.S. and which other power?', a: 'The Soviet Union', o: ['China', 'Germany', 'Japan'], e: 'The Cold War pitted the U.S. against the USSR.', t: ['modern'], era: 'modern' },
    { id: '103', d: 'hard', q: 'Which explorer’s expedition first circumnavigated the globe?', a: 'Ferdinand Magellan’s expedition', o: ['Christopher Columbus', 'Vasco da Gama', 'James Cook'], e: 'Magellan died en route; his crew completed the voyage in 1522.', t: ['exploration'], era: 'medieval' },
    ...[tf('104', 'expert', 'The Inca Empire was conquered by Spanish conquistador Francisco Pizarro.', true, 'Pizarro toppled the Inca in the 1530s.', ['exploration'])],
  ]),
  ...build('geography', [
    { id: '101', d: 'easy', q: 'Which U.S. state is the largest by area?', a: 'Alaska', o: ['Texas', 'California', 'Montana'], e: 'Alaska is by far the largest U.S. state.', t: ['regions'], region: 'North America' },
    { id: '102', d: 'medium', q: 'Which European capital is known as the "City of Canals"?', a: 'Venice', o: ['Amsterdam', 'Bruges', 'Stockholm'], e: 'Venice is built on a lagoon laced with canals (though Amsterdam shares the nickname).', t: ['cities'], region: 'Europe' },
    { id: '103', d: 'hard', q: 'The Sahel region lies just south of which desert?', a: 'The Sahara', o: ['The Kalahari', 'The Namib', 'The Gobi'], e: 'The Sahel is the transition zone south of the Sahara.', t: ['regions'], region: 'Africa' },
    ...[tf('104', 'expert', 'The Caspian Sea is the largest inland body of water on Earth.', true, 'It is the world’s largest enclosed inland body of water.', ['seas'])],
  ]),
  ...build('sports', [
    { id: '101', d: 'easy', q: 'In tennis, what is a score of zero called?', a: 'Love', o: ['Nil', 'Duck', 'Blank'], e: '"Love" means zero points in tennis scoring.', t: ['tennis'] },
    { id: '102', d: 'medium', q: 'How many players are on the field per side in rugby union?', a: '15', o: ['11', '13', '7'], e: 'Rugby union fields 15 players per team.', t: ['rugby'] },
    { id: '103', d: 'hard', q: 'Which country invented the sport of cricket?', a: 'England', o: ['Australia', 'India', 'South Africa'], e: 'Cricket originated in England.', t: ['cricket'], region: 'Europe' },
    ...[tf('104', 'expert', 'The Olympic marathon distance was standardized at 26.2 miles at the 1908 London Games.', true, 'The 1908 route set the now-standard 26.2-mile distance.', ['olympics', 'running'])],
  ]),
  ...build('general', [
    { id: '101', d: 'easy', q: 'How many minutes are in a full hour?', a: '60', o: ['100', '50', '90'], e: 'An hour contains 60 minutes.', t: ['time'] },
    { id: '102', d: 'medium', q: 'What is the largest prime number under 20?', a: '19', o: ['17', '18', '21'], e: '19 is prime; 18 and 21 are composite.', t: ['math'] },
    { id: '103', d: 'hard', q: 'Which blood type is the universal donor for red cells?', a: 'O negative', o: ['AB positive', 'A positive', 'B negative'], e: 'O negative red cells can be given to any blood type.', t: ['biology', 'medicine'] },
    ...[tf('104', 'expert', 'A regular dodecahedron has 12 faces.', true, 'A dodecahedron has 12 pentagonal faces.', ['math'])],
  ]),
];

export const supplement: Question[] = [
  ...musicX,
  ...moviesX,
  ...gamesX,
  ...litX,
  ...foodX,
  ...recordsX,
  ...entX,
  ...techX,
  ...miscX,
];
