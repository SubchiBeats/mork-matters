import { build, tf } from './_builder';

export const foodCulture = build('food-culture', [
  // easy
  { id: '001', d: 'easy', q: 'Sushi is a traditional dish from which country?', a: 'Japan', o: ['China', 'Thailand', 'Korea'], e: 'Sushi pairs vinegared rice with seafood and vegetables.', t: ['cuisine'], region: 'Asia' },
  { id: '002', d: 'easy', q: 'Which spice is derived from the Crocus flower and is the most expensive by weight?', a: 'Saffron', o: ['Cinnamon', 'Turmeric', 'Paprika'], e: 'Saffron threads are the hand-picked stigmas of the crocus.', t: ['spices'] },
  { id: '003', d: 'easy', q: 'Pizza originated in which country?', a: 'Italy', o: ['Greece', 'United States', 'France'], e: 'Modern pizza traces to Naples, Italy.', t: ['cuisine'], region: 'Europe' },
  ...[tf('004', 'easy', 'Tea is the most consumed beverage in the world after water.', true, 'Tea is the second-most consumed drink globally, after water.', ['drinks'])],
  { id: '005', d: 'easy', q: 'Which festival of lights is celebrated by Hindus, Jains, and Sikhs?', a: 'Diwali', o: ['Holi', 'Eid', 'Hanukkah'], e: 'Diwali symbolizes the victory of light over darkness.', t: ['festivals'], region: 'Asia' },

  // medium
  { id: '006', d: 'medium', q: 'Which country is the largest producer of coffee in the world?', a: 'Brazil', o: ['Colombia', 'Vietnam', 'Ethiopia'], e: 'Brazil has led global coffee production for over a century.', t: ['drinks', 'agriculture'], region: 'South America' },
  { id: '007', d: 'medium', q: 'Paella is a famous rice dish from which country?', a: 'Spain', o: ['Mexico', 'Portugal', 'Italy'], e: 'Paella originated in the Valencia region of Spain.', t: ['cuisine'], region: 'Europe' },
  { id: '008', d: 'medium', q: 'Which Mexican celebration honors deceased loved ones with altars and marigolds?', a: 'Día de los Muertos', o: ['Cinco de Mayo', 'Carnival', 'Las Posadas'], e: 'The Day of the Dead is celebrated around November 1–2.', t: ['festivals'], region: 'North America' },
  ...[tf('009', 'medium', 'Hummus is traditionally made from chickpeas.', true, 'Hummus blends chickpeas, tahini, lemon and garlic.', ['cuisine'])],
  { id: '010', d: 'medium', q: 'Which country gave the world the croissant in its modern form?', a: 'France', o: ['Austria', 'Belgium', 'Switzerland'], e: 'Though inspired by the Austrian kipferl, the croissant is French.', t: ['cuisine'], region: 'Europe' },
  { id: '011', d: 'medium', q: 'Kimchi, a fermented vegetable dish, is a staple of which cuisine?', a: 'Korean', o: ['Japanese', 'Chinese', 'Vietnamese'], e: 'Kimchi is a cornerstone of Korean cuisine.', t: ['cuisine'], region: 'Asia' },

  // hard
  { id: '012', d: 'hard', q: 'The spice turmeric gives which yellow color to many dishes and is common in which cuisine?', a: 'Indian', o: ['French', 'German', 'Russian'], e: 'Turmeric is central to Indian curries and spice blends.', t: ['spices'], region: 'Asia' },
  { id: '013', d: 'hard', q: 'Which country is the origin of the dish "feijoada," a hearty bean stew?', a: 'Brazil', o: ['Argentina', 'Peru', 'Portugal'], e: 'Feijoada, with black beans and pork, is a Brazilian national dish.', t: ['cuisine'], region: 'South America' },
  { id: '014', d: 'hard', q: 'Ramadan, a month of fasting, is observed in which religion?', a: 'Islam', o: ['Buddhism', 'Hinduism', 'Judaism'], e: 'Muslims fast from dawn to sunset during Ramadan.', t: ['festivals', 'religion'] },
  ...[tf('015', 'hard', 'Champagne can only be called "Champagne" if it comes from the Champagne region of France.', true, 'It is a protected designation of origin.', ['drinks'])],
  { id: '016', d: 'hard', q: 'Which fermented soybean paste is fundamental to Japanese soups?', a: 'Miso', o: ['Gochujang', 'Doubanjiang', 'Natto'], e: 'Miso is the base of the classic Japanese miso soup.', t: ['cuisine'], region: 'Asia' },

  // expert
  { id: '017', d: 'expert', q: 'The fermented fish sauce "garum" was a staple condiment in which ancient civilization?', a: 'Ancient Rome', o: ['Ancient Egypt', 'Ancient Greece', 'Ancient Persia'], e: 'Garum was a prized Roman umami condiment.', t: ['history', 'cuisine'], region: 'Europe', era: 'ancient' },
  { id: '018', d: 'expert', q: 'Which country celebrates "Songkran," a new-year water festival, in April?', a: 'Thailand', o: ['Cambodia', 'Vietnam', 'Myanmar'], e: 'Songkran marks the Thai New Year with water-throwing celebrations.', t: ['festivals'], region: 'Asia' },
  { id: '019', d: 'expert', q: 'The cheese "Roquefort" is famously aged in caves in which country?', a: 'France', o: ['Italy', 'Switzerland', 'Spain'], e: 'Roquefort is a blue cheese aged in caves of southern France.', t: ['cuisine'], region: 'Europe' },
  { id: '020', d: 'expert', q: 'Which culture traditionally performs the elaborate "tea ceremony" known as chanoyu?', a: 'Japanese', o: ['Chinese', 'Korean', 'Mongolian'], e: 'Chanoyu is the Japanese ritual preparation of matcha tea.', t: ['culture'], region: 'Asia' },
  { id: '021', d: 'expert', q: 'The dish "moussaka" is most associated with which country’s cuisine?', a: 'Greece', o: ['Turkey', 'Lebanon', 'Egypt'], e: 'Greek moussaka layers eggplant, spiced meat and béchamel.', t: ['cuisine'], region: 'Europe' },
]);
