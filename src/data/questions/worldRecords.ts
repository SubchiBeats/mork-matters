import { build, tf } from './_builder';

export const worldRecords = build('world-records', [
  // easy
  { id: '001', d: 'easy', q: 'What is the tallest land animal in the world?', a: 'Giraffe', o: ['Elephant', 'Ostrich', 'Horse'], e: 'Giraffes can reach about 5.5 meters tall.', t: ['animals'] },
  { id: '002', d: 'easy', q: 'What is the largest planet in our Solar System?', a: 'Jupiter', o: ['Saturn', 'Neptune', 'Earth'], e: 'Jupiter is more massive than all other planets combined.', t: ['space'] },
  { id: '003', d: 'easy', q: 'What is the largest animal ever known to have existed?', a: 'Blue whale', o: ['African elephant', 'Argentinosaurus', 'Colossal squid'], e: 'Blue whales can exceed 30 meters and 150 tonnes.', t: ['animals'] },
  ...[tf('004', 'easy', 'The cheetah is the fastest land animal.', true, 'Cheetahs can sprint up to ~110 km/h.', ['animals'])],
  { id: '005', d: 'easy', q: 'Which is the tallest mountain above sea level?', a: 'Mount Everest', o: ['K2', 'Mount Kilimanjaro', 'Denali'], e: 'Everest reaches 8,849 m above sea level.', t: ['geography'] },

  // medium
  { id: '006', d: 'medium', q: 'What is the tallest building in the world (as of the 2020s)?', a: 'Burj Khalifa', o: ['Shanghai Tower', 'Merdeka 118', 'Taipei 101'], e: 'Dubai’s Burj Khalifa stands about 828 m tall.', t: ['structures'], region: 'Middle East' },
  { id: '007', d: 'medium', q: 'What is the largest country in the world by area?', a: 'Russia', o: ['Canada', 'China', 'United States'], e: 'Russia spans about 17 million km².', t: ['geography'] },
  { id: '008', d: 'medium', q: 'What is the smallest bird in the world?', a: 'Bee hummingbird', o: ['Goldcrest', 'Wren', 'Sparrow'], e: 'The bee hummingbird is about 5–6 cm long.', t: ['animals'], region: 'North America' },
  ...[tf('009', 'medium', 'The Pacific Ocean is the largest and deepest ocean.', true, 'It is both the largest and deepest of Earth’s oceans.', ['geography'])],
  { id: '010', d: 'medium', q: 'Which desert is the largest hot desert in the world?', a: 'Sahara', o: ['Gobi', 'Kalahari', 'Arabian'], e: 'The Sahara covers about 9 million km² of North Africa.', t: ['geography'], region: 'Africa' },
  { id: '011', d: 'medium', q: 'What is the most populous country in the world (mid-2020s)?', a: 'India', o: ['China', 'United States', 'Indonesia'], e: 'India overtook China as most populous around 2023.', t: ['population'], region: 'Asia' },

  // hard
  { id: '012', d: 'hard', q: 'What is the deepest point in the world’s oceans?', a: 'Challenger Deep', o: ['Tonga Trench', 'Puerto Rico Trench', 'Java Trench'], e: 'Challenger Deep in the Mariana Trench is nearly 11 km deep.', t: ['geography'] },
  { id: '013', d: 'hard', q: 'Which animal has the longest migration of any mammal?', a: 'Gray whale', o: ['Caribou', 'Humpback whale', 'Wildebeest'], e: 'Gray whales migrate up to ~20,000 km round-trip annually.', t: ['animals'] },
  { id: '014', d: 'hard', q: 'What is the largest living structure on Earth, visible from space?', a: 'The Great Barrier Reef', o: ['The Amazon Rainforest', 'The Great Wall of China', 'Yellowstone'], e: 'The reef stretches over 2,300 km off Australia.', t: ['nature'], region: 'Oceania' },
  ...[tf('015', 'hard', 'The Nile and the Amazon are both contenders for the world’s longest river.', true, 'Measurement methods differ; both are frequently cited as longest.', ['geography'])],
  { id: '016', d: 'hard', q: 'What is the hottest recorded air temperature on Earth (in Death Valley)?', a: 'About 56.7°C (134°F)', o: ['About 45°C (113°F)', 'About 62°C (144°F)', 'About 50°C (122°F)'], e: 'Death Valley recorded 56.7°C in 1913.', t: ['weather'], region: 'North America' },

  // expert
  { id: '017', d: 'expert', q: 'What is the oldest known living tree species individual, found in California?', a: 'A bristlecone pine', o: ['A giant sequoia', 'A coast redwood', 'A baobab'], e: 'A Great Basin bristlecone pine is over 4,800 years old.', t: ['nature'], region: 'North America' },
  { id: '018', d: 'expert', q: 'What is the largest island in the world (that is not a continent)?', a: 'Greenland', o: ['New Guinea', 'Borneo', 'Madagascar'], e: 'Greenland spans about 2.17 million km².', t: ['geography'] },
  { id: '019', d: 'expert', q: 'Which waterfall is the tallest uninterrupted waterfall in the world?', a: 'Angel Falls', o: ['Niagara Falls', 'Victoria Falls', 'Tugela Falls'], e: 'Venezuela’s Angel Falls drops about 979 m.', t: ['nature'], region: 'South America' },
  { id: '020', d: 'expert', q: 'What is the largest hot-blooded land animal alive today?', a: 'African bush elephant', o: ['Hippopotamus', 'White rhino', 'Giraffe'], e: 'African bush elephants can weigh over 6 tonnes.', t: ['animals'], region: 'Africa' },
  { id: '021', d: 'expert', q: 'The driest non-polar place on Earth is which desert?', a: 'Atacama Desert', o: ['Sahara Desert', 'Mojave Desert', 'Thar Desert'], e: 'Parts of the Atacama in Chile receive almost no rainfall.', t: ['geography'], region: 'South America' },
]);
