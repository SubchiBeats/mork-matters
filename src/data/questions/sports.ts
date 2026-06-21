import { build, tf } from './_builder';

export const sports = build('sports', [
  // easy
  { id: '001', d: 'easy', q: 'How many players are on a standard soccer team on the field?', a: '11', o: ['9', '10', '12'], e: 'Each soccer side fields 11 players, including the goalkeeper.', t: ['soccer'] },
  { id: '002', d: 'easy', q: 'In basketball, how many points is a standard shot made beyond the arc worth?', a: '3', o: ['2', '1', '4'], e: 'Shots beyond the three-point line are worth three points.', t: ['basketball', 'nba'] },
  { id: '003', d: 'easy', q: 'Which sport uses a shuttlecock?', a: 'Badminton', o: ['Tennis', 'Squash', 'Table tennis'], e: 'Badminton is played with a feathered or plastic shuttlecock.', t: ['racket'] },
  { id: '004', d: 'easy', q: 'How often are the modern Summer Olympic Games held?', a: 'Every 4 years', o: ['Every 2 years', 'Every 3 years', 'Every 5 years'], e: 'The Summer Olympics occur every four years.', t: ['olympics'] },
  { id: '005', d: 'easy', q: 'In American football, how many points is a touchdown worth (before extra point)?', a: '6', o: ['3', '7', '5'], e: 'A touchdown is 6 points; the extra point or two-point conversion follows.', t: ['nfl', 'football'] },
  ...[tf('006', 'easy', 'A marathon is approximately 42 kilometers long.', true, 'A marathon is 42.195 km (26.2 miles).', ['running'])],
  { id: '007', d: 'easy', q: 'Which sport is Serena Williams famous for?', a: 'Tennis', o: ['Golf', 'Swimming', 'Volleyball'], e: 'Serena Williams won 23 Grand Slam singles titles.', t: ['tennis'] },
  { id: '008', d: 'easy', q: 'In baseball, how many strikes make an out?', a: '3', o: ['2', '4', '1'], e: 'Three strikes and the batter is out.', t: ['baseball', 'mlb'] },

  // medium
  { id: '009', d: 'medium', q: 'Which country has won the most FIFA World Cup titles (men’s)?', a: 'Brazil', o: ['Germany', 'Italy', 'Argentina'], e: 'Brazil has won five men’s World Cups.', t: ['soccer'], region: 'South America' },
  { id: '010', d: 'medium', q: 'How many Grand Slam tournaments make up tennis’s calendar each year?', a: '4', o: ['3', '5', '6'], e: 'Australian Open, French Open, Wimbledon and US Open.', t: ['tennis'] },
  { id: '011', d: 'medium', q: 'In which sport would you perform a "slam dunk"?', a: 'Basketball', o: ['Volleyball', 'Handball', 'Water polo'], e: 'A dunk is scoring by putting the ball directly through the hoop.', t: ['basketball'] },
  { id: '012', d: 'medium', q: 'Which boxer was known as "The Greatest" and "floated like a butterfly"?', a: 'Muhammad Ali', o: ['Mike Tyson', 'Joe Frazier', 'Floyd Mayweather'], e: 'Ali was a three-time world heavyweight champion.', t: ['boxing', 'combat'] },
  { id: '013', d: 'medium', q: 'The Tour de France is primarily a competition in which sport?', a: 'Cycling', o: ['Running', 'Motor racing', 'Triathlon'], e: 'It is the most famous multi-stage road cycling race.', t: ['cycling'], region: 'Europe' },
  { id: '014', d: 'medium', q: 'How many rings are on the Olympic flag?', a: '5', o: ['4', '6', '7'], e: 'The five rings represent the five inhabited continents.', t: ['olympics'] },
  { id: '015', d: 'medium', q: 'In golf, what is the term for one stroke under par on a hole?', a: 'Birdie', o: ['Eagle', 'Bogey', 'Albatross'], e: 'A birdie is one under par; an eagle is two under.', t: ['golf'] },
  { id: '016', d: 'medium', q: 'Which NBA player is the league’s all-time leading scorer (regular season)?', a: 'LeBron James', o: ['Kareem Abdul-Jabbar', 'Michael Jordan', 'Karl Malone'], e: 'LeBron passed Kareem’s long-standing record in 2023.', t: ['basketball', 'nba'] },
  ...[tf('017', 'medium', 'A hat-trick in soccer means scoring three goals in one match.', true, 'A hat-trick is three goals by one player in a single game.', ['soccer'])],
  { id: '018', d: 'medium', q: 'Which Grand Slam tennis tournament is played on grass courts?', a: 'Wimbledon', o: ['French Open', 'US Open', 'Australian Open'], e: 'Wimbledon is the only Grand Slam still played on grass.', t: ['tennis'], region: 'Europe' },

  // hard
  { id: '019', d: 'hard', q: 'Who holds the record for most career goals in men’s international soccer (among the leaders)?', a: 'Cristiano Ronaldo', o: ['Lionel Messi', 'Pelé', 'Ali Daei'], e: 'Cristiano Ronaldo holds the men’s international goal-scoring record.', t: ['soccer'] },
  { id: '020', d: 'hard', q: 'In Formula 1, which driver holds the record for most World Championships (tied at seven)?', a: 'Lewis Hamilton', o: ['Ayrton Senna', 'Sebastian Vettel', 'Niki Lauda'], e: 'Hamilton is tied with Michael Schumacher at seven titles.', t: ['motorsport'] },
  { id: '021', d: 'hard', q: 'Which country hosted the first modern Olympic Games in 1896?', a: 'Greece', o: ['France', 'United States', 'United Kingdom'], e: 'The first modern Olympics were held in Athens, Greece.', t: ['olympics'], region: 'Europe' },
  { id: '022', d: 'hard', q: 'In cricket, how many runs is hitting the ball over the boundary on the full worth?', a: '6', o: ['4', '5', '8'], e: 'Clearing the boundary without bouncing scores six runs.', t: ['cricket'] },
  { id: '023', d: 'hard', q: 'Which swimmer has won the most Olympic gold medals of all time?', a: 'Michael Phelps', o: ['Mark Spitz', 'Ian Thorpe', 'Caeleb Dressel'], e: 'Phelps won 23 Olympic golds, an all-time record across all sports.', t: ['swimming', 'olympics'] },
  { id: '024', d: 'hard', q: 'The Stanley Cup is awarded in which sport?', a: 'Ice hockey', o: ['Basketball', 'Baseball', 'American football'], e: 'The Stanley Cup is the NHL championship trophy.', t: ['hockey', 'nhl'] },
  { id: '025', d: 'hard', q: 'Which country is credited with inventing the sport of judo?', a: 'Japan', o: ['China', 'Korea', 'Brazil'], e: 'Jigoro Kano founded judo in Japan in 1882.', t: ['combat', 'martial-arts'], region: 'Asia' },
  ...[tf('026', 'hard', 'In rugby union, a try is worth five points.', true, 'A try scores five points, with a possible two-point conversion to follow.', ['rugby'])],

  // expert
  { id: '027', d: 'expert', q: 'Who is the only boxer to win the lineal heavyweight title and also become an Olympic gold medalist, famously as "Smokin’ Joe"?', a: 'Joe Frazier', o: ['George Foreman', 'Sonny Liston', 'Larry Holmes'], e: 'Frazier won 1964 Olympic gold and the heavyweight crown.', t: ['boxing', 'combat'] },
  { id: '028', d: 'expert', q: 'In tennis, who completed the "Golden Slam" (all four majors plus Olympic gold) in a single year, 1988?', a: 'Steffi Graf', o: ['Martina Navratilova', 'Chris Evert', 'Monica Seles'], e: 'Graf remains the only player to achieve a calendar-year Golden Slam.', t: ['tennis'] },
  { id: '029', d: 'expert', q: 'Which nation has won the most Olympic gold medals in field hockey?', a: 'India', o: ['Pakistan', 'Australia', 'Netherlands'], e: 'India dominated Olympic field hockey, especially mid-20th century.', t: ['olympics', 'hockey'], region: 'Asia' },
  { id: '030', d: 'expert', q: 'The "Fosbury Flop" revolutionized which athletics event?', a: 'High jump', o: ['Pole vault', 'Long jump', 'Triple jump'], e: 'Dick Fosbury debuted the back-first technique at the 1968 Olympics.', t: ['athletics', 'olympics'] },
  { id: '031', d: 'expert', q: 'In American football, which team has won the most Super Bowls (tied at six)?', a: 'Pittsburgh Steelers', o: ['Dallas Cowboys', 'Green Bay Packers', 'San Francisco 49ers'], e: 'The Steelers and Patriots are tied with six Super Bowl wins.', t: ['nfl', 'football'] },
  { id: '032', d: 'expert', q: 'Which cyclist was stripped of seven Tour de France titles for doping?', a: 'Lance Armstrong', o: ['Chris Froome', 'Alberto Contador', 'Miguel Indurain'], e: 'Armstrong was stripped of his 1999–2005 titles in 2012.', t: ['cycling'] },
  { id: '033', d: 'expert', q: 'In sumo wrestling, what is the top rank a wrestler can achieve?', a: 'Yokozuna', o: ['Ozeki', 'Sekiwake', 'Komusubi'], e: 'Yokozuna is sumo’s highest, grand-champion rank.', t: ['combat', 'martial-arts'], region: 'Asia' },
]);
