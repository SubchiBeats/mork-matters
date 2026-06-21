import { build, tf } from './_builder';

export const videoGames = build('video-games', [
  // easy
  { id: '001', d: 'easy', q: 'Which company created the Super Mario series?', a: 'Nintendo', o: ['Sega', 'Sony', 'Microsoft'], e: 'Nintendo created Mario, designed by Shigeru Miyamoto.', t: ['nintendo'] },
  { id: '002', d: 'easy', q: 'In "Minecraft," what material is used to make a basic pickaxe most early on?', a: 'Wood', o: ['Diamond', 'Iron', 'Gold'], e: 'Players craft wooden tools before upgrading to stone and beyond.', t: ['sandbox'] },
  { id: '003', d: 'easy', q: 'What color is Sonic the Hedgehog?', a: 'Blue', o: ['Red', 'Green', 'Yellow'], e: 'Sega’s mascot Sonic is famously bright blue.', t: ['sega'] },
  ...[tf('004', 'easy', 'The "battle royale" game Fortnite is free to play.', true, 'Fortnite uses a free-to-play model with cosmetic purchases.', ['shooter'])],
  { id: '005', d: 'easy', q: 'Which puzzle game involves arranging falling tetromino blocks?', a: 'Tetris', o: ['Candy Crush', 'Bejeweled', 'Pac-Man'], e: 'Tetris was created by Alexey Pajitnov in 1984.', t: ['puzzle'], region: 'Europe' },

  // medium
  { id: '006', d: 'medium', q: 'Which company developed the PlayStation console?', a: 'Sony', o: ['Nintendo', 'Microsoft', 'Atari'], e: 'Sony launched the original PlayStation in 1994.', t: ['consoles'], region: 'Asia' },
  { id: '007', d: 'medium', q: 'In "The Legend of Zelda," what is the name of the hero?', a: 'Link', o: ['Zelda', 'Ganon', 'Epona'], e: 'Link is the protagonist; Zelda is the princess.', t: ['nintendo', 'adventure'] },
  { id: '008', d: 'medium', q: 'Which game popularized the "battle royale" genre alongside Fortnite?', a: 'PUBG', o: ['Overwatch', 'Valorant', 'Apex Legends'], e: 'PlayerUnknown’s Battlegrounds (2017) helped launch the genre.', t: ['shooter'] },
  { id: '009', d: 'medium', q: 'What is the best-selling video game of all time (single title)?', a: 'Minecraft', o: ['Grand Theft Auto V', 'Tetris', 'Wii Sports'], e: 'Minecraft has sold over 300 million copies.', t: ['records', 'sandbox'] },
  ...[tf('010', 'medium', 'Pac-Man was originally released in 1980.', true, 'Namco released Pac-Man in arcades in 1980.', ['arcade'])],
  { id: '011', d: 'medium', q: 'Which game features the characters Master Chief and Cortana?', a: 'Halo', o: ['Gears of War', 'Doom', 'Destiny'], e: 'Halo is a flagship Xbox first-person shooter franchise.', t: ['shooter', 'xbox'] },

  // hard
  { id: '012', d: 'hard', q: 'Which Japanese company created "Final Fantasy"?', a: 'Square (Square Enix)', o: ['Capcom', 'Konami', 'Bandai'], e: 'Square (now Square Enix) launched Final Fantasy in 1987.', t: ['rpg'], region: 'Asia' },
  { id: '013', d: 'hard', q: 'In esports, "League of Legends" is developed by which studio?', a: 'Riot Games', o: ['Valve', 'Blizzard', 'Epic Games'], e: 'Riot Games released League of Legends in 2009.', t: ['esports', 'moba'] },
  { id: '014', d: 'hard', q: 'Which 1993 game is credited with popularizing the first-person shooter?', a: 'Doom', o: ['Quake', 'Wolfenstein 3D', 'Half-Life'], e: 'id Software’s Doom defined early FPS gaming.', t: ['shooter'] },
  ...[tf('015', 'hard', 'The video game crash of 1983 primarily affected the North American market.', true, 'Oversaturation and low-quality titles triggered the 1983 crash.', ['history'])],
  { id: '016', d: 'hard', q: 'Which game series features the assassin Ezio Auditore?', a: 'Assassin’s Creed', o: ['Hitman', 'Dishonored', 'Prince of Persia'], e: 'Ezio stars across several Assassin’s Creed titles.', t: ['action'] },

  // expert
  { id: '017', d: 'expert', q: 'What was the first commercially successful arcade video game (1972)?', a: 'Pong', o: ['Space Invaders', 'Asteroids', 'Computer Space'], e: 'Atari’s Pong launched the commercial arcade industry.', t: ['arcade', 'history'] },
  { id: '018', d: 'expert', q: 'Which company developed "The Witcher 3: Wild Hunt"?', a: 'CD Projekt Red', o: ['Bethesda', 'BioWare', 'FromSoftware'], e: 'The Polish studio CD Projekt Red also made Cyberpunk 2077.', t: ['rpg'], region: 'Europe' },
  { id: '019', d: 'expert', q: 'FromSoftware’s "Dark Souls" helped define which difficult subgenre?', a: 'Soulslike', o: ['Roguelike', 'Metroidvania', 'Bullet hell'], e: 'The punishing, methodical "Soulslike" genre is named after Dark Souls.', t: ['action', 'rpg'], region: 'Asia' },
  { id: '020', d: 'expert', q: 'What is the name of the protagonist in the "Metal Gear Solid" series?', a: 'Solid Snake', o: ['Sam Fisher', 'Nathan Drake', 'Big Daddy'], e: 'Solid Snake is the stealth-action hero of Metal Gear Solid.', t: ['stealth'], region: 'Asia' },
  { id: '021', d: 'expert', q: 'Which handheld console was released by Nintendo in 1989?', a: 'Game Boy', o: ['Game Gear', 'PSP', 'Atari Lynx'], e: 'The Game Boy became the dominant handheld of its era.', t: ['consoles', 'history'] },
]);
