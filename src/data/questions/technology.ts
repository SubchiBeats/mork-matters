import { build, tf } from './_builder';

export const technology = build('technology', [
  // easy
  { id: '001', d: 'easy', q: 'What does "CPU" stand for?', a: 'Central Processing Unit', o: ['Computer Processing Unit', 'Central Power Unit', 'Core Processing Utility'], e: 'The CPU is the primary processor that executes instructions.', t: ['hardware'] },
  { id: '002', d: 'easy', q: 'Which company created the iPhone?', a: 'Apple', o: ['Samsung', 'Google', 'Nokia'], e: 'Apple introduced the iPhone in 2007.', t: ['companies'] },
  { id: '003', d: 'easy', q: 'What does "WWW" stand for?', a: 'World Wide Web', o: ['World Web Wire', 'Wide World Web', 'Web World Wide'], e: 'Tim Berners-Lee invented the World Wide Web around 1989.', t: ['web'] },
  ...[tf('004', 'easy', 'HTML is a programming language used to build relational databases.', false, 'HTML is a markup language for structuring web pages, not a database language.', ['web'])],
  { id: '005', d: 'easy', q: 'What does "USB" stand for?', a: 'Universal Serial Bus', o: ['United System Bus', 'Universal System Backup', 'Unified Serial Buffer'], e: 'USB is a standard for connecting peripherals.', t: ['hardware'] },

  // medium
  { id: '006', d: 'medium', q: 'Who is credited as co-founder of Microsoft alongside Paul Allen?', a: 'Bill Gates', o: ['Steve Jobs', 'Larry Page', 'Mark Zuckerberg'], e: 'Gates and Allen founded Microsoft in 1975.', t: ['companies', 'history'] },
  { id: '007', d: 'medium', q: 'What does "AI" most commonly stand for in tech?', a: 'Artificial Intelligence', o: ['Automated Input', 'Advanced Integration', 'Algorithmic Interface'], e: 'AI refers to machines performing tasks that mimic human intelligence.', t: ['ai'] },
  { id: '008', d: 'medium', q: 'Which programming language is named after a snake and known for readability?', a: 'Python', o: ['Java', 'Ruby', 'Cobra'], e: 'Python was actually named after Monty Python, but its logo is a snake.', t: ['programming'] },
  { id: '009', d: 'medium', q: 'What does "RAM" stand for?', a: 'Random Access Memory', o: ['Rapid Access Module', 'Read-Active Memory', 'Runtime Allocation Memory'], e: 'RAM is fast, volatile memory used while a computer runs.', t: ['hardware'] },
  ...[tf('010', 'medium', 'The first computer "bug" was reportedly an actual moth.', true, 'A moth found in a Harvard relay in 1947 was taped into a logbook.', ['history'])],
  { id: '011', d: 'medium', q: 'Which company developed the Android operating system before acquisition?', a: 'Google', o: ['Apple', 'Microsoft', 'Samsung'], e: 'Google acquired Android Inc. in 2005.', t: ['mobile', 'companies'] },

  // hard
  { id: '012', d: 'hard', q: 'In computing, what does "HTTP" stand for?', a: 'HyperText Transfer Protocol', o: ['HyperText Transmission Process', 'High Transfer Text Protocol', 'Hyperlink Transfer Protocol'], e: 'HTTP is the foundation of data exchange on the web.', t: ['web', 'networking'] },
  { id: '013', d: 'hard', q: 'What is the binary representation of the decimal number 5?', a: '101', o: ['110', '011', '111'], e: '5 = 4 + 1 = 101 in binary.', t: ['fundamentals'] },
  { id: '014', d: 'hard', q: 'Who is widely regarded as the first computer programmer?', a: 'Ada Lovelace', o: ['Grace Hopper', 'Alan Turing', 'Charles Babbage'], e: 'Lovelace wrote an algorithm for Babbage’s Analytical Engine in the 1840s.', t: ['history'], region: 'Europe' },
  ...[tf('015', 'hard', 'A "kilobyte" is exactly 1000 bytes under the binary (IEC) definition.', false, 'In binary terms a kibibyte is 1024 bytes; 1000 bytes is the SI kilobyte.', ['fundamentals'])],
  { id: '016', d: 'hard', q: 'Which protocol secures web traffic, shown by a padlock and "https"?', a: 'TLS/SSL', o: ['FTP', 'SMTP', 'DNS'], e: 'TLS (formerly SSL) encrypts HTTPS connections.', t: ['security', 'networking'] },

  // expert
  { id: '017', d: 'expert', q: 'What does "SQL" stand for?', a: 'Structured Query Language', o: ['Simple Query Logic', 'Sequential Query Language', 'System Query Layer'], e: 'SQL is used to manage and query relational databases.', t: ['databases'] },
  { id: '018', d: 'expert', q: 'Which mathematician proposed the "Turing Test" for machine intelligence?', a: 'Alan Turing', o: ['John von Neumann', 'Claude Shannon', 'Kurt Gödel'], e: 'Turing proposed the test in his 1950 paper on machine intelligence.', t: ['ai', 'history'], region: 'Europe' },
  { id: '019', d: 'expert', q: 'In Big-O notation, which describes the fastest-growing (worst) runtime here?', a: 'O(n²)', o: ['O(n)', 'O(log n)', 'O(1)'], e: 'Quadratic O(n²) grows faster than linear, logarithmic, or constant time.', t: ['algorithms'] },
  { id: '020', d: 'expert', q: 'What is the name of the decentralized ledger technology behind Bitcoin?', a: 'Blockchain', o: ['Hashgraph', 'Merkle Vault', 'Tangle'], e: 'A blockchain is an append-only chain of cryptographically linked blocks.', t: ['crypto'] },
  { id: '021', d: 'expert', q: 'Which company manufactures the majority of the world’s advanced chips by foundry revenue?', a: 'TSMC', o: ['Intel', 'Nvidia', 'Qualcomm'], e: 'Taiwan Semiconductor Manufacturing Company is the leading pure-play foundry.', t: ['hardware', 'companies'], region: 'Asia' },
  { id: '022', d: 'expert', q: 'What does "DNS" translate human-readable domain names into?', a: 'IP addresses', o: ['MAC addresses', 'Port numbers', 'Hostfiles'], e: 'The Domain Name System maps names like example.com to IP addresses.', t: ['networking'] },
]);
