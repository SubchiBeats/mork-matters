import { build, tf } from './_builder';

export const literature = build('literature', [
  // easy
  { id: '001', d: 'easy', q: 'Who wrote "Romeo and Juliet"?', a: 'William Shakespeare', o: ['Charles Dickens', 'Jane Austen', 'Mark Twain'], e: 'Shakespeare wrote the tragedy around 1595.', t: ['plays'], region: 'Europe' },
  { id: '002', d: 'easy', q: 'In which series would you find the wizard Gandalf?', a: 'The Lord of the Rings', o: ['Harry Potter', 'Narnia', 'A Song of Ice and Fire'], e: 'Gandalf is a central figure in Tolkien’s Middle-earth.', t: ['fantasy'] },
  { id: '003', d: 'easy', q: 'Who wrote the "Harry Potter" series?', a: 'J. K. Rowling', o: ['Suzanne Collins', 'Stephenie Meyer', 'Roald Dahl'], e: 'Rowling published the first book in 1997.', t: ['fantasy'], region: 'Europe' },
  ...[tf('004', 'easy', 'A haiku is a three-line poem with a 5-7-5 syllable pattern.', true, 'Traditional Japanese haiku follow a 5-7-5 structure.', ['poetry'])],
  { id: '005', d: 'easy', q: 'Who wrote "The Cat in the Hat"?', a: 'Dr. Seuss', o: ['Maurice Sendak', 'Shel Silverstein', 'E. B. White'], e: 'Theodor "Dr. Seuss" Geisel published it in 1957.', t: ['children'] },

  // medium
  { id: '006', d: 'medium', q: 'Who wrote "Pride and Prejudice"?', a: 'Jane Austen', o: ['Emily Brontë', 'Charlotte Brontë', 'George Eliot'], e: 'Austen published it in 1813.', t: ['classics'], region: 'Europe' },
  { id: '007', d: 'medium', q: 'Which novel begins "Call me Ishmael"?', a: 'Moby-Dick', o: ['The Old Man and the Sea', 'Treasure Island', 'Robinson Crusoe'], e: 'Herman Melville’s 1851 novel opens with that famous line.', t: ['classics'], region: 'North America' },
  { id: '008', d: 'medium', q: 'Who wrote "1984" and "Animal Farm"?', a: 'George Orwell', o: ['Aldous Huxley', 'Ray Bradbury', 'Kurt Vonnegut'], e: 'Orwell’s dystopias critique totalitarianism.', t: ['dystopia'], region: 'Europe' },
  ...[tf('009', 'medium', 'Leo Tolstoy wrote "War and Peace".', true, 'Tolstoy published the epic Russian novel in 1869.', ['classics'])],
  { id: '010', d: 'medium', q: 'Which Greek poet is credited with "The Iliad" and "The Odyssey"?', a: 'Homer', o: ['Sophocles', 'Virgil', 'Plato'], e: 'These ancient epics are attributed to Homer.', t: ['ancient', 'epic'], region: 'Europe', era: 'ancient' },
  { id: '011', d: 'medium', q: 'Who created the detective Sherlock Holmes?', a: 'Arthur Conan Doyle', o: ['Agatha Christie', 'Edgar Allan Poe', 'Wilkie Collins'], e: 'Doyle introduced Holmes in 1887.', t: ['mystery'], region: 'Europe' },

  // hard
  { id: '012', d: 'hard', q: 'Who wrote "One Hundred Years of Solitude"?', a: 'Gabriel García Márquez', o: ['Jorge Luis Borges', 'Pablo Neruda', 'Isabel Allende'], e: 'The 1967 novel is a landmark of magical realism.', t: ['modern'], region: 'South America' },
  { id: '013', d: 'hard', q: 'Which novel features the character Atticus Finch?', a: 'To Kill a Mockingbird', o: ['The Grapes of Wrath', 'Of Mice and Men', 'The Great Gatsby'], e: 'Harper Lee’s 1960 novel won the Pulitzer Prize.', t: ['classics'], region: 'North America' },
  { id: '014', d: 'hard', q: 'Who wrote "Crime and Punishment"?', a: 'Fyodor Dostoevsky', o: ['Leo Tolstoy', 'Anton Chekhov', 'Ivan Turgenev'], e: 'Dostoevsky’s psychological novel appeared in 1866.', t: ['classics'], region: 'Europe' },
  ...[tf('015', 'hard', 'Mary Shelley wrote "Frankenstein" while still a teenager.', true, 'She began it at 18; it was published in 1818 when she was 20.', ['gothic'])],
  { id: '016', d: 'hard', q: 'Which epic poem by Dante describes a journey through Hell, Purgatory and Paradise?', a: 'The Divine Comedy', o: ['Paradise Lost', 'The Aeneid', 'Beowulf'], e: 'Dante Alighieri wrote it in the early 14th century.', t: ['epic', 'medieval'], region: 'Europe', era: 'medieval' },

  // expert
  { id: '017', d: 'expert', q: 'Who wrote "Things Fall Apart," a landmark of African literature?', a: 'Chinua Achebe', o: ['Wole Soyinka', 'Ngũgĩ wa Thiong’o', 'Ben Okri'], e: 'Achebe’s 1958 novel is set in pre-colonial Nigeria.', t: ['modern'], region: 'Africa' },
  { id: '018', d: 'expert', q: 'Which author won the Nobel Prize and wrote "The Old Man and the Sea"?', a: 'Ernest Hemingway', o: ['John Steinbeck', 'William Faulkner', 'F. Scott Fitzgerald'], e: 'Hemingway won the Nobel in 1954.', t: ['classics'], region: 'North America' },
  { id: '019', d: 'expert', q: 'The novel "Don Quixote" was written by:', a: 'Miguel de Cervantes', o: ['Lope de Vega', 'Gabriel García Márquez', 'Federico García Lorca'], e: 'Cervantes published it in two parts (1605, 1615).', t: ['classics'], region: 'Europe' },
  { id: '020', d: 'expert', q: 'Which Japanese author wrote "The Tale of Genji," often called the first novel?', a: 'Murasaki Shikibu', o: ['Yukio Mishima', 'Haruki Murakami', 'Yasunari Kawabata'], e: 'Written c. 1010, it is considered one of the world’s first novels.', t: ['classics'], region: 'Asia', era: 'medieval' },
  { id: '021', d: 'expert', q: 'Who wrote the modernist novel "Ulysses"?', a: 'James Joyce', o: ['Virginia Woolf', 'Marcel Proust', 'Samuel Beckett'], e: 'Joyce’s 1922 novel unfolds over a single Dublin day.', t: ['modern'], region: 'Europe' },
]);
