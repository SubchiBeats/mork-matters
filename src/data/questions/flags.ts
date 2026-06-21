import type { Difficulty, Question } from '@/types';

interface Country {
  code: string; // ISO 3166-1 alpha-2, lowercase (flagcdn key)
  name: string;
  continent: string;
  capital: string;
  d: Difficulty;
}

// A diverse spread across regions, mixing well-known and tougher flags.
const COUNTRIES: Country[] = [
  // Europe
  { code: 'fr', name: 'France', continent: 'Europe', capital: 'Paris', d: 'easy' },
  { code: 'de', name: 'Germany', continent: 'Europe', capital: 'Berlin', d: 'easy' },
  { code: 'it', name: 'Italy', continent: 'Europe', capital: 'Rome', d: 'easy' },
  { code: 'es', name: 'Spain', continent: 'Europe', capital: 'Madrid', d: 'easy' },
  { code: 'gb', name: 'United Kingdom', continent: 'Europe', capital: 'London', d: 'easy' },
  { code: 'gr', name: 'Greece', continent: 'Europe', capital: 'Athens', d: 'medium' },
  { code: 'pt', name: 'Portugal', continent: 'Europe', capital: 'Lisbon', d: 'medium' },
  { code: 'se', name: 'Sweden', continent: 'Europe', capital: 'Stockholm', d: 'medium' },
  { code: 'no', name: 'Norway', continent: 'Europe', capital: 'Oslo', d: 'medium' },
  { code: 'pl', name: 'Poland', continent: 'Europe', capital: 'Warsaw', d: 'medium' },
  { code: 'nl', name: 'Netherlands', continent: 'Europe', capital: 'Amsterdam', d: 'medium' },
  { code: 'ch', name: 'Switzerland', continent: 'Europe', capital: 'Bern', d: 'medium' },
  { code: 'hr', name: 'Croatia', continent: 'Europe', capital: 'Zagreb', d: 'hard' },
  { code: 'rs', name: 'Serbia', continent: 'Europe', capital: 'Belgrade', d: 'hard' },
  { code: 'is', name: 'Iceland', continent: 'Europe', capital: 'Reykjavik', d: 'hard' },
  { code: 'al', name: 'Albania', continent: 'Europe', capital: 'Tirana', d: 'expert' },
  { code: 'sk', name: 'Slovakia', continent: 'Europe', capital: 'Bratislava', d: 'expert' },
  { code: 'si', name: 'Slovenia', continent: 'Europe', capital: 'Ljubljana', d: 'expert' },
  { code: 'ie', name: 'Ireland', continent: 'Europe', capital: 'Dublin', d: 'medium' },
  { code: 'fi', name: 'Finland', continent: 'Europe', capital: 'Helsinki', d: 'medium' },
  { code: 'dk', name: 'Denmark', continent: 'Europe', capital: 'Copenhagen', d: 'medium' },
  { code: 'at', name: 'Austria', continent: 'Europe', capital: 'Vienna', d: 'medium' },
  { code: 'be', name: 'Belgium', continent: 'Europe', capital: 'Brussels', d: 'hard' },
  { code: 'cz', name: 'Czechia', continent: 'Europe', capital: 'Prague', d: 'hard' },
  { code: 'hu', name: 'Hungary', continent: 'Europe', capital: 'Budapest', d: 'hard' },
  { code: 'ro', name: 'Romania', continent: 'Europe', capital: 'Bucharest', d: 'expert' },
  { code: 'ua', name: 'Ukraine', continent: 'Europe', capital: 'Kyiv', d: 'medium' },

  // Asia
  { code: 'jp', name: 'Japan', continent: 'Asia', capital: 'Tokyo', d: 'easy' },
  { code: 'cn', name: 'China', continent: 'Asia', capital: 'Beijing', d: 'easy' },
  { code: 'in', name: 'India', continent: 'Asia', capital: 'New Delhi', d: 'easy' },
  { code: 'kr', name: 'South Korea', continent: 'Asia', capital: 'Seoul', d: 'medium' },
  { code: 'th', name: 'Thailand', continent: 'Asia', capital: 'Bangkok', d: 'medium' },
  { code: 'vn', name: 'Vietnam', continent: 'Asia', capital: 'Hanoi', d: 'medium' },
  { code: 'sa', name: 'Saudi Arabia', continent: 'Asia', capital: 'Riyadh', d: 'medium' },
  { code: 'id', name: 'Indonesia', continent: 'Asia', capital: 'Jakarta', d: 'hard' },
  { code: 'ph', name: 'Philippines', continent: 'Asia', capital: 'Manila', d: 'hard' },
  { code: 'np', name: 'Nepal', continent: 'Asia', capital: 'Kathmandu', d: 'hard' },
  { code: 'kz', name: 'Kazakhstan', continent: 'Asia', capital: 'Astana', d: 'expert' },
  { code: 'lk', name: 'Sri Lanka', continent: 'Asia', capital: 'Colombo', d: 'expert' },
  { code: 'bt', name: 'Bhutan', continent: 'Asia', capital: 'Thimphu', d: 'expert' },
  { code: 'tr', name: 'Turkey', continent: 'Asia', capital: 'Ankara', d: 'medium' },
  { code: 'ir', name: 'Iran', continent: 'Asia', capital: 'Tehran', d: 'hard' },
  { code: 'iq', name: 'Iraq', continent: 'Asia', capital: 'Baghdad', d: 'hard' },
  { code: 'il', name: 'Israel', continent: 'Asia', capital: 'Jerusalem', d: 'medium' },
  { code: 'ae', name: 'United Arab Emirates', continent: 'Asia', capital: 'Abu Dhabi', d: 'hard' },
  { code: 'pk', name: 'Pakistan', continent: 'Asia', capital: 'Islamabad', d: 'medium' },
  { code: 'bd', name: 'Bangladesh', continent: 'Asia', capital: 'Dhaka', d: 'hard' },
  { code: 'my', name: 'Malaysia', continent: 'Asia', capital: 'Kuala Lumpur', d: 'hard' },
  { code: 'sg', name: 'Singapore', continent: 'Asia', capital: 'Singapore', d: 'medium' },

  // Africa
  { code: 'eg', name: 'Egypt', continent: 'Africa', capital: 'Cairo', d: 'medium' },
  { code: 'za', name: 'South Africa', continent: 'Africa', capital: 'Pretoria', d: 'easy' },
  { code: 'ng', name: 'Nigeria', continent: 'Africa', capital: 'Abuja', d: 'medium' },
  { code: 'ke', name: 'Kenya', continent: 'Africa', capital: 'Nairobi', d: 'medium' },
  { code: 'ma', name: 'Morocco', continent: 'Africa', capital: 'Rabat', d: 'medium' },
  { code: 'et', name: 'Ethiopia', continent: 'Africa', capital: 'Addis Ababa', d: 'hard' },
  { code: 'gh', name: 'Ghana', continent: 'Africa', capital: 'Accra', d: 'hard' },
  { code: 'tz', name: 'Tanzania', continent: 'Africa', capital: 'Dodoma', d: 'expert' },
  { code: 'sn', name: 'Senegal', continent: 'Africa', capital: 'Dakar', d: 'expert' },
  { code: 'dz', name: 'Algeria', continent: 'Africa', capital: 'Algiers', d: 'hard' },
  { code: 'tn', name: 'Tunisia', continent: 'Africa', capital: 'Tunis', d: 'hard' },
  { code: 'ug', name: 'Uganda', continent: 'Africa', capital: 'Kampala', d: 'expert' },
  { code: 'zw', name: 'Zimbabwe', continent: 'Africa', capital: 'Harare', d: 'expert' },
  { code: 'cm', name: 'Cameroon', continent: 'Africa', capital: 'Yaoundé', d: 'expert' },

  // North America
  { code: 'us', name: 'United States', continent: 'North America', capital: 'Washington, D.C.', d: 'easy' },
  { code: 'ca', name: 'Canada', continent: 'North America', capital: 'Ottawa', d: 'easy' },
  { code: 'mx', name: 'Mexico', continent: 'North America', capital: 'Mexico City', d: 'easy' },
  { code: 'cu', name: 'Cuba', continent: 'North America', capital: 'Havana', d: 'medium' },
  { code: 'jm', name: 'Jamaica', continent: 'North America', capital: 'Kingston', d: 'hard' },
  { code: 'cr', name: 'Costa Rica', continent: 'North America', capital: 'San José', d: 'expert' },
  { code: 'gt', name: 'Guatemala', continent: 'North America', capital: 'Guatemala City', d: 'expert' },
  { code: 'pa', name: 'Panama', continent: 'North America', capital: 'Panama City', d: 'hard' },
  { code: 'do', name: 'Dominican Republic', continent: 'North America', capital: 'Santo Domingo', d: 'expert' },
  { code: 'ht', name: 'Haiti', continent: 'North America', capital: 'Port-au-Prince', d: 'expert' },

  // South America
  { code: 'br', name: 'Brazil', continent: 'South America', capital: 'Brasília', d: 'easy' },
  { code: 'ar', name: 'Argentina', continent: 'South America', capital: 'Buenos Aires', d: 'medium' },
  { code: 'cl', name: 'Chile', continent: 'South America', capital: 'Santiago', d: 'medium' },
  { code: 'co', name: 'Colombia', continent: 'South America', capital: 'Bogotá', d: 'hard' },
  { code: 'pe', name: 'Peru', continent: 'South America', capital: 'Lima', d: 'hard' },
  { code: 've', name: 'Venezuela', continent: 'South America', capital: 'Caracas', d: 'expert' },
  { code: 'uy', name: 'Uruguay', continent: 'South America', capital: 'Montevideo', d: 'expert' },
  { code: 'ec', name: 'Ecuador', continent: 'South America', capital: 'Quito', d: 'hard' },
  { code: 'bo', name: 'Bolivia', continent: 'South America', capital: 'La Paz', d: 'expert' },
  { code: 'py', name: 'Paraguay', continent: 'South America', capital: 'Asunción', d: 'expert' },

  // Oceania
  { code: 'au', name: 'Australia', continent: 'Oceania', capital: 'Canberra', d: 'easy' },
  { code: 'nz', name: 'New Zealand', continent: 'Oceania', capital: 'Wellington', d: 'medium' },
  { code: 'fj', name: 'Fiji', continent: 'Oceania', capital: 'Suva', d: 'expert' },
  { code: 'pg', name: 'Papua New Guinea', continent: 'Oceania', capital: 'Port Moresby', d: 'expert' },
  { code: 'ws', name: 'Samoa', continent: 'Oceania', capital: 'Apia', d: 'expert' },
  { code: 'sb', name: 'Solomon Islands', continent: 'Oceania', capital: 'Honiara', d: 'expert' },
];

/** Deterministic small shuffle so decoy choice order is stable but not sorted. */
function rotate<T>(arr: T[], by: number): T[] {
  const n = arr.length;
  if (n === 0) return arr;
  const k = ((by % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function buildFlagQuestions(): Question[] {
  return COUNTRIES.map((c, i) => {
    // Decoys: other countries on the same continent, fall back to global pool.
    const sameContinent = COUNTRIES.filter(
      (x) => x.continent === c.continent && x.code !== c.code,
    );
    const pool = sameContinent.length >= 3 ? sameContinent : COUNTRIES.filter((x) => x.code !== c.code);
    const decoys = rotate(pool, i)
      .slice(0, 3)
      .map((x) => x.name);

    return {
      id: `flags-${c.code}`,
      category: 'flags',
      difficulty: c.d,
      type: 'flag-identification',
      prompt: 'Which country does this flag belong to?',
      choices: [c.name, ...decoys],
      correctAnswer: c.name,
      explanation: `This is the flag of ${c.name}. Its capital is ${c.capital}, located in ${c.continent}.`,
      tags: ['flags', c.continent.toLowerCase().replace(/\s+/g, '-')],
      region: c.continent,
      flagCode: c.code,
      hint: `Continent: ${c.continent} · Capital: ${c.capital}`,
      sourceNote: 'Flag artwork via flagcdn.com (public domain).',
    };
  });
}

export const flags = buildFlagQuestions();
export const FLAG_COUNTRIES = COUNTRIES;
