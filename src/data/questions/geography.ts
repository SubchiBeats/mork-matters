import { build, tf } from './_builder';

export const geography = build('geography', [
  // easy
  { id: '001', d: 'easy', q: 'What is the capital of France?', a: 'Paris', o: ['Lyon', 'Marseille', 'Nice'], e: 'Paris has been France’s capital for over a thousand years.', t: ['capitals'], region: 'Europe' },
  { id: '002', d: 'easy', q: 'Which is the largest ocean on Earth?', a: 'Pacific Ocean', o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], e: 'The Pacific covers about a third of Earth’s surface.', t: ['oceans'] },
  { id: '003', d: 'easy', q: 'Mount Everest is located in which mountain range?', a: 'The Himalayas', o: ['The Andes', 'The Alps', 'The Rockies'], e: 'Everest sits on the Nepal–China border in the Himalayas.', t: ['mountains'], region: 'Asia' },
  { id: '004', d: 'easy', q: 'Which country is shaped like a boot?', a: 'Italy', o: ['Greece', 'Portugal', 'Chile'], e: 'Italy’s distinctive boot shape juts into the Mediterranean.', t: ['maps'], region: 'Europe' },
  { id: '005', d: 'easy', q: 'What is the longest river in the world (by most measures)?', a: 'The Nile', o: ['The Amazon', 'The Mississippi', 'The Yangtze'], e: 'The Nile runs about 6,650 km; the Amazon rivals it in length.', t: ['rivers'], region: 'Africa' },
  { id: '006', d: 'easy', q: 'Which continent is the Sahara Desert on?', a: 'Africa', o: ['Asia', 'Australia', 'South America'], e: 'The Sahara is the world’s largest hot desert, spanning North Africa.', t: ['deserts'], region: 'Africa' },
  ...[tf('007', 'easy', 'Australia is both a country and a continent.', true, 'Australia is the only nation that occupies an entire continent.', ['continents'])],
  { id: '008', d: 'easy', q: 'What is the capital of Japan?', a: 'Tokyo', o: ['Kyoto', 'Osaka', 'Seoul'], e: 'Tokyo became Japan’s capital in 1868.', t: ['capitals'], region: 'Asia' },

  // medium
  { id: '009', d: 'medium', q: 'Which country has the most natural lakes?', a: 'Canada', o: ['Russia', 'United States', 'Finland'], e: 'Canada holds more lakes than the rest of the world combined.', t: ['lakes'], region: 'North America' },
  { id: '010', d: 'medium', q: 'The Amazon River flows mainly through which country?', a: 'Brazil', o: ['Peru', 'Colombia', 'Venezuela'], e: 'Most of the Amazon’s course and basin lie within Brazil.', t: ['rivers'], region: 'South America' },
  { id: '011', d: 'medium', q: 'What is the capital of Australia?', a: 'Canberra', o: ['Sydney', 'Melbourne', 'Perth'], e: 'Canberra was purpose-built as a compromise capital in 1913.', t: ['capitals'], region: 'Oceania' },
  { id: '012', d: 'medium', q: 'Which strait separates Europe from Africa?', a: 'Strait of Gibraltar', o: ['Bosphorus Strait', 'Bering Strait', 'Strait of Hormuz'], e: 'Only ~14 km wide, it links the Atlantic and Mediterranean.', t: ['borders'], region: 'Europe' },
  { id: '013', d: 'medium', q: 'Mount Kilimanjaro is located in which country?', a: 'Tanzania', o: ['Kenya', 'Ethiopia', 'Uganda'], e: 'Kilimanjaro is Africa’s highest peak at 5,895 m.', t: ['mountains'], region: 'Africa' },
  { id: '014', d: 'medium', q: 'Which sea is the saltiest body of water on Earth (and lowest land point)?', a: 'The Dead Sea', o: ['The Red Sea', 'The Caspian Sea', 'The Black Sea'], e: 'Its shores are Earth’s lowest land elevation, ~430 m below sea level.', t: ['seas'], region: 'Middle East' },
  { id: '015', d: 'medium', q: 'How many time zones does Russia span?', a: '11', o: ['7', '9', '14'], e: 'Russia stretches across 11 time zones — the most of any country.', t: ['maps'], region: 'Asia' },
  { id: '016', d: 'medium', q: 'The Andes mountain range runs along which continent’s western edge?', a: 'South America', o: ['North America', 'Africa', 'Asia'], e: 'The Andes are the longest continental mountain range in the world.', t: ['mountains'], region: 'South America' },
  { id: '017', d: 'medium', q: 'What is the capital of Canada?', a: 'Ottawa', o: ['Toronto', 'Vancouver', 'Montreal'], e: 'Ottawa, in Ontario, has been the capital since 1857.', t: ['capitals'], region: 'North America' },
  ...[tf('018', 'medium', 'The Equator passes through Brazil.', true, 'It crosses northern Brazil, as well as Ecuador, Colombia and others.', ['maps'])],
  { id: '019', d: 'medium', q: 'Which African country was never formally colonized by a European power?', a: 'Ethiopia', o: ['Kenya', 'Ghana', 'Morocco'], e: 'Ethiopia repelled Italian invasion and stayed independent (briefly occupied 1936–41).', t: ['countries'], region: 'Africa' },

  // hard
  { id: '020', d: 'hard', q: 'What is the smallest country in the world by area?', a: 'Vatican City', o: ['Monaco', 'San Marino', 'Nauru'], e: 'Vatican City covers just 0.44 km².', t: ['countries'], region: 'Europe' },
  { id: '021', d: 'hard', q: 'The Atacama Desert, one of the driest places on Earth, is in which country?', a: 'Chile', o: ['Peru', 'Argentina', 'Bolivia'], e: 'Some Atacama weather stations have never recorded rainfall.', t: ['deserts'], region: 'South America' },
  { id: '022', d: 'hard', q: 'Which two countries share the longest international land border?', a: 'United States and Canada', o: ['Russia and China', 'Argentina and Chile', 'India and China'], e: 'The U.S.–Canada border runs about 8,890 km.', t: ['borders'], region: 'North America' },
  { id: '023', d: 'hard', q: 'What is the capital of New Zealand?', a: 'Wellington', o: ['Auckland', 'Christchurch', 'Hamilton'], e: 'Wellington is the world’s southernmost national capital.', t: ['capitals'], region: 'Oceania' },
  { id: '024', d: 'hard', q: 'The Volga, Europe’s longest river, flows through which country?', a: 'Russia', o: ['Ukraine', 'Poland', 'Germany'], e: 'The Volga drains into the Caspian Sea entirely within Russia.', t: ['rivers'], region: 'Europe' },
  { id: '025', d: 'hard', q: 'Which country has the most islands in the world?', a: 'Sweden', o: ['Indonesia', 'Philippines', 'Canada'], e: 'Sweden has over 260,000 islands, most uninhabited.', t: ['islands'], region: 'Europe' },
  { id: '026', d: 'hard', q: 'Lake Baikal, the world’s deepest lake, is in which country?', a: 'Russia', o: ['Mongolia', 'Kazakhstan', 'China'], e: 'Baikal holds about 20% of the world’s unfrozen fresh water.', t: ['lakes'], region: 'Asia' },
  { id: '027', d: 'hard', q: 'The Kalahari Desert spans Botswana, Namibia, and which other country?', a: 'South Africa', o: ['Zambia', 'Angola', 'Zimbabwe'], e: 'The Kalahari is a large semi-arid sandy savanna in Southern Africa.', t: ['deserts'], region: 'Africa' },
  ...[tf('028', 'hard', 'Istanbul is the only major city located on two continents.', true, 'Istanbul straddles Europe and Asia across the Bosphorus.', ['cities'])],

  // expert
  { id: '029', d: 'expert', q: 'What is the capital of Kazakhstan (renamed in 2019, reverted briefly)?', a: 'Astana', o: ['Almaty', 'Bishkek', 'Tashkent'], e: 'The capital was Astana, briefly Nur-Sultan (2019–2022), now Astana again.', t: ['capitals'], region: 'Asia' },
  { id: '030', d: 'expert', q: 'Which country is entirely surrounded by South Africa (along with Lesotho)?', a: 'Eswatini', o: ['Botswana', 'Namibia', 'Zimbabwe'], e: 'Eswatini is nearly enclosed by South Africa (and Mozambique); Lesotho is fully enclaved.', t: ['countries'], region: 'Africa' },
  { id: '031', d: 'expert', q: 'The Mariana Trench, Earth’s deepest point, lies in which ocean?', a: 'Pacific Ocean', o: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean'], e: 'Its Challenger Deep reaches nearly 11 km below sea level.', t: ['oceans'] },
  { id: '032', d: 'expert', q: 'What is the capital of Mongolia?', a: 'Ulaanbaatar', o: ['Astana', 'Bishkek', 'Tashkent'], e: 'Ulaanbaatar is the coldest national capital on average.', t: ['capitals'], region: 'Asia' },
  { id: '033', d: 'expert', q: 'Which line of latitude marks the boundary of the midnight sun in the north?', a: 'The Arctic Circle', o: ['The Tropic of Cancer', 'The Prime Meridian', 'The Equator'], e: 'North of the Arctic Circle, the sun stays up for 24h around summer solstice.', t: ['maps'] },
  { id: '034', d: 'expert', q: 'The Danube River flows through how many countries?', a: '10', o: ['4', '6', '8'], e: 'The Danube passes through 10 countries — more than any other river.', t: ['rivers'], region: 'Europe' },
  { id: '035', d: 'expert', q: 'What is the capital of Canada’s neighbor to the south by population — the U.S. — that is a planned city not in any state?', a: 'Washington, D.C.', o: ['New York City', 'Philadelphia', 'Boston'], e: 'Washington sits in the District of Columbia, not any state.', t: ['capitals'], region: 'North America' },
  { id: '036', d: 'expert', q: 'Which country has three capital cities (executive, legislative, judicial)?', a: 'South Africa', o: ['Bolivia', 'Sri Lanka', 'Malaysia'], e: 'Pretoria (executive), Cape Town (legislative) and Bloemfontein (judicial).', t: ['capitals'], region: 'Africa' },
]);
