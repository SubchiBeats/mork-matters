import { build, tf } from './_builder';

export const science = build('science', [
  // --- easy ---
  { id: '001', d: 'easy', q: 'What gas do plants primarily absorb from the air for photosynthesis?', a: 'Carbon dioxide', o: ['Oxygen', 'Nitrogen', 'Hydrogen'], e: 'Plants take in carbon dioxide and release oxygen during photosynthesis.', t: ['biology', 'plants'] },
  { id: '002', d: 'easy', q: 'How many bones are in the adult human body?', a: '206', o: ['198', '212', '187'], e: 'Babies are born with about 270 bones; many fuse, leaving 206 in adults.', t: ['biology', 'anatomy'] },
  { id: '003', d: 'easy', q: 'What is the chemical symbol for gold?', a: 'Au', o: ['Gd', 'Go', 'Ag'], e: '"Au" comes from the Latin word for gold, "aurum". Ag is silver.', t: ['chemistry', 'elements'] },
  { id: '004', d: 'easy', q: 'Which planet is known as the Red Planet?', a: 'Mars', o: ['Jupiter', 'Venus', 'Mercury'], e: 'Iron oxide (rust) on its surface gives Mars its reddish color.', t: ['space', 'planets'] },
  { id: '005', d: 'easy', q: 'What is the center of an atom called?', a: 'Nucleus', o: ['Electron', 'Proton cloud', 'Orbit'], e: 'The nucleus holds protons and neutrons; electrons orbit around it.', t: ['physics', 'atoms'] },
  { id: '006', d: 'easy', q: 'Water is made of hydrogen and which other element?', a: 'Oxygen', o: ['Carbon', 'Helium', 'Chlorine'], e: 'Water is H₂O — two hydrogen atoms and one oxygen atom.', t: ['chemistry'] },
  { id: '007', d: 'easy', q: 'What force keeps us anchored to the ground?', a: 'Gravity', o: ['Magnetism', 'Friction', 'Tension'], e: 'Gravity is the attractive force between masses, including you and Earth.', t: ['physics'] },
  ...[tf('008', 'easy', 'Sound travels faster in water than in air.', true, 'Sound travels roughly four times faster in water (~1480 m/s) than in air (~343 m/s).', ['physics', 'sound'])],
  { id: '009', d: 'easy', q: 'Which blood cells help fight infection?', a: 'White blood cells', o: ['Red blood cells', 'Platelets', 'Plasma cells only'], e: 'White blood cells (leukocytes) are central to the immune response.', t: ['biology', 'medicine'] },
  { id: '010', d: 'easy', q: 'What is the largest organ of the human body?', a: 'Skin', o: ['Liver', 'Lungs', 'Brain'], e: 'The skin is the largest organ by surface area and weight.', t: ['biology', 'anatomy'] },

  // --- medium ---
  { id: '011', d: 'medium', q: 'What is the most abundant gas in Earth’s atmosphere?', a: 'Nitrogen', o: ['Oxygen', 'Carbon dioxide', 'Argon'], e: 'Air is about 78% nitrogen and 21% oxygen.', t: ['earth-science'] },
  { id: '012', d: 'medium', q: 'What is the powerhouse of the cell?', a: 'Mitochondria', o: ['Ribosome', 'Nucleus', 'Golgi apparatus'], e: 'Mitochondria generate ATP, the cell’s main energy currency.', t: ['biology', 'cells'] },
  { id: '013', d: 'medium', q: 'Which scientist proposed the three laws of motion?', a: 'Isaac Newton', o: ['Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'], e: 'Newton published his laws of motion in the Principia (1687).', t: ['physics', 'history'] },
  { id: '014', d: 'medium', q: 'What is the pH of a neutral solution at 25°C?', a: '7', o: ['0', '14', '1'], e: 'A pH of 7 is neutral; below is acidic, above is basic.', t: ['chemistry'] },
  { id: '015', d: 'medium', q: 'Which planet has the most moons (as of recent counts)?', a: 'Saturn', o: ['Jupiter', 'Uranus', 'Neptune'], e: 'Saturn overtook Jupiter with well over 140 confirmed moons.', t: ['space'] },
  { id: '016', d: 'medium', q: 'What type of energy is stored in a stretched rubber band?', a: 'Elastic potential energy', o: ['Kinetic energy', 'Thermal energy', 'Chemical energy'], e: 'Stretching stores elastic potential energy, released when let go.', t: ['physics'] },
  { id: '017', d: 'medium', q: 'DNA is shaped like a:', a: 'Double helix', o: ['Single spiral', 'Branching tree', 'Flat sheet'], e: 'Watson, Crick, Franklin and Wilkins established DNA’s double-helix structure.', t: ['biology', 'genetics'] },
  { id: '018', d: 'medium', q: 'What is the speed of light in a vacuum (approximately)?', a: '300,000 km/s', o: ['30,000 km/s', '3,000 km/s', '3 million km/s'], e: 'Light travels at about 299,792 km/s in a vacuum.', t: ['physics'] },
  { id: '019', d: 'medium', q: 'Which element has the atomic number 1?', a: 'Hydrogen', o: ['Helium', 'Oxygen', 'Carbon'], e: 'Hydrogen has a single proton — the lightest, most abundant element.', t: ['chemistry'] },
  { id: '020', d: 'medium', q: 'What process do plants use to release water vapor through leaves?', a: 'Transpiration', o: ['Respiration', 'Condensation', 'Germination'], e: 'Transpiration is water movement through a plant and evaporation from leaves.', t: ['biology'] },
  { id: '021', d: 'medium', q: 'Which part of the brain controls balance and coordination?', a: 'Cerebellum', o: ['Cerebrum', 'Medulla', 'Hypothalamus'], e: 'The cerebellum fine-tunes movement, balance and posture.', t: ['biology', 'anatomy'] },
  ...[tf('022', 'medium', 'Diamonds and graphite are both made entirely of carbon.', true, 'Both are pure carbon; their different structures give very different properties.', ['chemistry'])],
  { id: '023', d: 'medium', q: 'What is the freezing point of water in Fahrenheit?', a: '32°F', o: ['0°F', '100°F', '212°F'], e: 'Water freezes at 32°F (0°C) and boils at 212°F (100°C).', t: ['physics'] },
  { id: '024', d: 'medium', q: 'Which vitamin is produced when skin is exposed to sunlight?', a: 'Vitamin D', o: ['Vitamin C', 'Vitamin A', 'Vitamin B12'], e: 'UVB light triggers vitamin D synthesis in the skin.', t: ['medicine', 'biology'] },
  { id: '025', d: 'medium', q: 'What galaxy is Earth located in?', a: 'The Milky Way', o: ['Andromeda', 'Whirlpool', 'Sombrero'], e: 'Our Solar System sits in a spiral arm of the Milky Way.', t: ['space'] },

  // --- hard ---
  { id: '026', d: 'hard', q: 'What is the term for an animal that is active mainly at twilight?', a: 'Crepuscular', o: ['Nocturnal', 'Diurnal', 'Cathemeral'], e: 'Crepuscular animals (like rabbits) are most active at dawn and dusk.', t: ['biology'] },
  { id: '027', d: 'hard', q: 'Which subatomic particle has no electric charge?', a: 'Neutron', o: ['Proton', 'Electron', 'Positron'], e: 'Neutrons are electrically neutral; protons are positive, electrons negative.', t: ['physics'] },
  { id: '028', d: 'hard', q: 'What is the most common element in the universe by mass?', a: 'Hydrogen', o: ['Helium', 'Oxygen', 'Carbon'], e: 'Hydrogen makes up roughly 75% of normal matter by mass.', t: ['chemistry', 'space'] },
  { id: '029', d: 'hard', q: 'Which law states that pressure and volume of a gas are inversely related at constant temperature?', a: 'Boyle’s Law', o: ['Charles’s Law', 'Avogadro’s Law', 'Ohm’s Law'], e: 'Boyle’s Law: P × V is constant at fixed temperature.', t: ['chemistry', 'physics'] },
  { id: '030', d: 'hard', q: 'The Krebs cycle takes place in which cell structure?', a: 'Mitochondrial matrix', o: ['Nucleus', 'Cytoplasm', 'Endoplasmic reticulum'], e: 'The citric acid (Krebs) cycle occurs in the mitochondrial matrix.', t: ['biology'] },
  { id: '031', d: 'hard', q: 'What is the half-life concept used to measure?', a: 'Radioactive decay rate', o: ['Boiling point', 'Electrical resistance', 'Light intensity'], e: 'Half-life is the time for half of a radioactive sample to decay.', t: ['physics', 'chemistry'] },
  { id: '032', d: 'hard', q: 'Which scientist developed the periodic table’s organization by atomic properties?', a: 'Dmitri Mendeleev', o: ['Marie Curie', 'John Dalton', 'Robert Boyle'], e: 'Mendeleev arranged elements by periodicity and predicted undiscovered ones.', t: ['chemistry', 'history'] },
  { id: '033', d: 'hard', q: 'What phenomenon causes a star’s light to shift toward red as it moves away?', a: 'Redshift', o: ['Blueshift', 'Refraction', 'Diffraction'], e: 'Redshift is the Doppler-like stretching of light from receding objects.', t: ['space', 'physics'] },
  { id: '034', d: 'hard', q: 'Which type of rock forms from cooled magma or lava?', a: 'Igneous', o: ['Sedimentary', 'Metamorphic', 'Limestone'], e: 'Igneous rock crystallizes from molten material like granite or basalt.', t: ['earth-science'] },
  ...[tf('035', 'hard', 'Octopuses have three hearts.', true, 'Two hearts pump blood to the gills and one to the rest of the body.', ['biology'])],

  // --- expert ---
  { id: '036', d: 'expert', q: 'What is the name of the boundary around a black hole beyond which nothing can escape?', a: 'Event horizon', o: ['Photon sphere', 'Singularity', 'Accretion disk'], e: 'The event horizon marks the point of no return for light and matter.', t: ['space', 'physics'] },
  { id: '037', d: 'expert', q: 'Which enzyme unwinds the DNA double helix during replication?', a: 'Helicase', o: ['Ligase', 'Polymerase', 'Primase'], e: 'Helicase breaks hydrogen bonds to separate the two DNA strands.', t: ['biology', 'genetics'] },
  { id: '038', d: 'expert', q: 'What is the SI unit of electrical capacitance?', a: 'Farad', o: ['Henry', 'Tesla', 'Weber'], e: 'The farad measures capacitance; the henry measures inductance.', t: ['physics'] },
  { id: '039', d: 'expert', q: 'Heisenberg’s uncertainty principle relates the uncertainty in position to that in:', a: 'Momentum', o: ['Temperature', 'Charge', 'Mass'], e: 'You cannot precisely know both a particle’s position and momentum.', t: ['physics'] },
  { id: '040', d: 'expert', q: 'Which organelle is responsible for protein synthesis?', a: 'Ribosome', o: ['Lysosome', 'Vacuole', 'Centriole'], e: 'Ribosomes translate mRNA into chains of amino acids (proteins).', t: ['biology'] },
  { id: '041', d: 'expert', q: 'What is the rarest naturally occurring element on Earth?', a: 'Astatine', o: ['Francium', 'Promethium', 'Technetium'], e: 'Astatine is so radioactive and rare that less than a gram exists in the crust at any time.', t: ['chemistry'] },
  { id: '042', d: 'expert', q: 'The Chandrasekhar limit describes the maximum mass of which object?', a: 'A white dwarf', o: ['A neutron star', 'A red giant', 'A brown dwarf'], e: 'Above ~1.4 solar masses, a white dwarf collapses, often triggering a supernova.', t: ['space', 'physics'] },
  { id: '043', d: 'expert', q: 'Which scientist is credited with the equation E = mc²?', a: 'Albert Einstein', o: ['Max Planck', 'Niels Bohr', 'Werner Heisenberg'], e: 'Einstein’s mass-energy equivalence came from special relativity (1905).', t: ['physics'] },
  { id: '044', d: 'expert', q: 'What is the term for programmed cell death?', a: 'Apoptosis', o: ['Necrosis', 'Mitosis', 'Phagocytosis'], e: 'Apoptosis is orderly, regulated cell death — vital for development.', t: ['biology', 'medicine'] },
  { id: '045', d: 'expert', q: 'Which fundamental force is carried by gluons?', a: 'The strong nuclear force', o: ['Gravity', 'Electromagnetism', 'The weak nuclear force'], e: 'Gluons mediate the strong force binding quarks inside protons and neutrons.', t: ['physics'] },
]);
