/**

- components/science.js
- =====================================================
- Science subject — worlds: Living Things, Earth,
- Weather, Space, and the Human Body.
- =====================================================
  */

const ScienceSubject = {
id: ‘science’,
name: ‘Science’,
icon: ‘🔬’,
color: ‘#6BCB77’,

worlds: [
{
id: 1, name: ‘Living Things’, icon: ‘🌿’, stageCount: 3,
stages: [
{ id: 1, name: ‘Plants’,    difficulty: 1, questions: 5 },
{ id: 2, name: ‘Animals’,   difficulty: 2, questions: 5 },
{ id: 3, name: ‘Life Cycles’, difficulty: 3, questions: 5 }
]
},
{
id: 2, name: ‘Our Earth’, icon: ‘🌍’, stageCount: 3,
stages: [
{ id: 1, name: ‘Land & Water’,  difficulty: 1, questions: 5 },
{ id: 2, name: ‘Rocks & Soil’,  difficulty: 2, questions: 5 },
{ id: 3, name: ‘Natural Events’, difficulty: 3, questions: 5 }
]
},
{
id: 3, name: ‘Weather’, icon: ‘⛅’, stageCount: 3,
stages: [
{ id: 1, name: ‘Types of Weather’, difficulty: 1, questions: 5 },
{ id: 2, name: ‘Seasons’,          difficulty: 2, questions: 5 },
{ id: 3, name: ‘Water Cycle’,      difficulty: 3, questions: 5 }
]
},
{
id: 4, name: ‘Space’, icon: ‘🚀’, stageCount: 3,
stages: [
{ id: 1, name: ‘Sun, Moon & Stars’, difficulty: 1, questions: 5 },
{ id: 2, name: ‘Planets’,           difficulty: 2, questions: 5 },
{ id: 3, name: ‘Space Exploration’, difficulty: 3, questions: 5 }
]
},
{
id: 5, name: ‘Human Body’, icon: ‘🫀’, stageCount: 3,
stages: [
{ id: 1, name: ‘Body Parts’,  difficulty: 1, questions: 5 },
{ id: 2, name: ‘The Senses’,  difficulty: 2, questions: 5 },
{ id: 3, name: ‘Staying Healthy’, difficulty: 3, questions: 5 }
]
}
],

generateQuestions(worldId, stageId, count = 5) {
const banks = {
‘1-1’: sciQ_plants, ‘1-2’: sciQ_animals, ‘1-3’: sciQ_lifecycle,
‘2-1’: sciQ_landWater, ‘2-2’: sciQ_rocks, ‘2-3’: sciQ_naturalEvents,
‘3-1’: sciQ_weather, ‘3-2’: sciQ_seasons, ‘3-3’: sciQ_waterCycle,
‘4-1’: sciQ_sunMoon, ‘4-2’: sciQ_planets, ‘4-3’: sciQ_spaceExplore,
‘5-1’: sciQ_bodyParts, ‘5-2’: sciQ_senses, ‘5-3’: sciQ_healthy,
};
const pool = banks[`${worldId}-${stageId}`] || sciQ_plants;
return pickRandom(pool, count);
}
};

// ── Science Question Banks ────────────────────────────

const sciQ_plants = [
{ text: ‘What do plants need to make their own food?’, answers: makeA(‘Sunlight, water & air’, [‘Only water’,‘Only soil’,‘Sunlight only’]), correctValue: ‘Sunlight, water & air’, hint: ‘Plants use photosynthesis — they need sun, water, and CO₂ from air.’ },
{ text: ‘What part of the plant absorbs water from the soil?’, answers: makeA(‘Roots’, [‘Leaves’,‘Stems’,‘Flowers’]), correctValue: ‘Roots’, hint: ‘Roots anchor the plant and absorb water and nutrients.’ },
{ text: ‘What part of the plant makes food using sunlight?’, answers: makeA(‘Leaves’, [‘Roots’,‘Stems’,‘Seeds’]), correctValue: ‘Leaves’, hint: ‘Leaves contain chlorophyll which captures sunlight for photosynthesis.’ },
{ text: ‘What do seeds need to start growing?’, answers: makeA(‘Water and warmth’, [‘Only sunlight’,‘Only soil’,‘Cold and dark’]), correctValue: ‘Water and warmth’, hint: ‘Seeds germinate (sprout) when they get water and warmth.’ },
{ text: ‘What carries pollen between flowers?’, answers: makeA(‘Bees’, [‘Rocks’,‘Rain’,‘Wind only’]), correctValue: ‘Bees’, hint: ‘Bees collect nectar and carry pollen, helping plants reproduce.’ },
];

const sciQ_animals = [
{ text: ‘Which animal is a mammal?’, answers: makeA(‘Dog’, [‘Eagle’,‘Frog’,‘Salmon’]), correctValue: ‘Dog’, hint: ‘Mammals have fur/hair and feed their babies milk.’ },
{ text: ‘What do herbivores eat?’, answers: makeA(‘Only plants’, [‘Only meat’,‘Both plants and meat’,‘Only fish’]), correctValue: ‘Only plants’, hint: ‘Herbi = plant. Herbivores like rabbits and deer eat only plants.’ },
{ text: ‘Which is an example of a reptile?’, answers: makeA(‘Lizard’, [‘Frog’,‘Eagle’,‘Whale’]), correctValue: ‘Lizard’, hint: ‘Reptiles have scaly skin and are cold-blooded — lizards, snakes, turtles.’ },
{ text: ‘How do fish breathe underwater?’, answers: makeA(‘Through gills’, [‘Through lungs’,‘Through their skin’,‘Through their mouth’]), correctValue: ‘Through gills’, hint: ‘Gills extract oxygen from water just like lungs extract oxygen from air.’ },
{ text: ‘Which group do frogs belong to?’, answers: makeA(‘Amphibians’, [‘Reptiles’,‘Mammals’,‘Birds’]), correctValue: ‘Amphibians’, hint: ‘Amphibians live both in water AND on land — frogs, toads, salamanders.’ },
];

const sciQ_lifecycle = [
{ text: ‘What is the correct order of a butterfly life cycle?’, answers: makeA(‘Egg → Caterpillar → Chrysalis → Butterfly’, [‘Egg → Butterfly → Caterpillar’,‘Caterpillar → Egg → Butterfly’,‘Butterfly → Egg → Chrysalis’]), correctValue: ‘Egg → Caterpillar → Chrysalis → Butterfly’, hint: ‘The 4 stages are: Egg, Larva (caterpillar), Pupa (chrysalis), Adult.’ },
{ text: ‘What hatches from a frog's egg?’, answers: makeA(‘Tadpole’, [‘Baby frog’,‘Caterpillar’,‘Larva’]), correctValue: ‘Tadpole’, hint: ‘Frog eggs hatch into tadpoles, which then grow legs and become frogs.’ },
{ text: ‘Which stage comes after the egg in a chicken's life cycle?’, answers: makeA(‘Chick’, [‘Adult hen’,‘Egg again’,‘Caterpillar’]), correctValue: ‘Chick’, hint: ‘A chicken hatches from an egg as a small chick, then grows into an adult.’ },
{ text: ‘What do caterpillars turn into?’, answers: makeA(‘Butterflies or moths’, [‘Bees’,‘Beetles’,‘Dragonflies’]), correctValue: ‘Butterflies or moths’, hint: ‘Caterpillars are the larvae stage of butterflies and moths.’ },
{ text: ‘What is metamorphosis?’, answers: makeA(‘When an animal changes form as it grows’, [‘When an animal hibernates’,‘When plants grow’,‘When animals migrate’]), correctValue: ‘When an animal changes form as it grows’, hint: ‘Metamorphosis means a big change in body shape during an animal's life.’ },
];

const sciQ_landWater = [
{ text: ‘What covers most of Earth's surface?’, answers: makeA(‘Water (oceans)’, [‘Land’,‘Ice’,‘Desert’]), correctValue: ‘Water (oceans)’, hint: ‘About 71% of Earth is covered by water — mostly oceans.’ },
{ text: ‘What is the largest type of landmass called?’, answers: makeA(‘Continent’, [‘Island’,‘Peninsula’,‘Country’]), correctValue: ‘Continent’, hint: ‘There are 7 continents on Earth.’ },
{ text: ‘What do we call a large body of salt water?’, answers: makeA(‘Ocean’, [‘Lake’,‘River’,‘Pond’]), correctValue: ‘Ocean’, hint: ‘Oceans are huge and salty — like the Atlantic or Pacific.’ },
{ text: ‘What is a river?’, answers: makeA(‘Flowing water that moves toward the sea’, [‘A still body of water’,‘A frozen body of water’,‘An underground stream’]), correctValue: ‘Flowing water that moves toward the sea’, hint: ‘Rivers flow downhill and eventually reach the ocean or a lake.’ },
{ text: ‘What is an island?’, answers: makeA(‘Land surrounded by water’, [‘Land connected to more land’,‘A mountain in the sea’,‘A frozen lake’]), correctValue: ‘Land surrounded by water’, hint: ‘Islands are surrounded by water on all sides.’ },
];

const sciQ_rocks = [
{ text: ‘What are the three types of rock?’, answers: makeA(‘Igneous, Sedimentary, Metamorphic’, [‘Hard, soft, medium’,‘Old, new, ancient’,‘Big, small, tiny’]), correctValue: ‘Igneous, Sedimentary, Metamorphic’, hint: ‘Rocks are classified by how they were formed.’ },
{ text: ‘Which type of rock forms from cooled lava?’, answers: makeA(‘Igneous’, [‘Sedimentary’,‘Metamorphic’,‘Fossil’]), correctValue: ‘Igneous’, hint: ‘Igneous rock forms when lava or magma cools and hardens.’ },
{ text: ‘What is soil made of?’, answers: makeA(‘Tiny rock particles, minerals & plant matter’, [‘Only sand’,‘Only clay’,‘Only water’]), correctValue: ‘Tiny rock particles, minerals & plant matter’, hint: ‘Soil is a mix of broken rock, dead plants, and living organisms.’ },
{ text: ‘What is a fossil?’, answers: makeA(‘The preserved remains of ancient life’, [‘A type of rock’,‘A type of soil’,‘A crystal’]), correctValue: ‘The preserved remains of ancient life’, hint: ‘Fossils form when plants or animals are buried and preserved over millions of years.’ },
{ text: ‘What makes rocks change over time?’, answers: makeA(‘Wind, water, and weathering’, [‘Only heat’,‘Only pressure’,‘Only time’]), correctValue: ‘Wind, water, and weathering’, hint: ‘Erosion and weathering slowly break down and reshape rocks.’ },
];

const sciQ_naturalEvents = [
{ text: ‘What causes an earthquake?’, answers: makeA(‘Movement of tectonic plates’, [‘Heavy rain’,‘Strong wind’,‘Volcanic ash’]), correctValue: ‘Movement of tectonic plates’, hint: ‘Earth's outer layer is made of plates that move — when they shift, we feel earthquakes.’ },
{ text: ‘What is a volcano?’, answers: makeA(‘An opening in the Earth that releases lava’, [‘A large mountain covered in snow’,‘A deep ocean trench’,‘A type of earthquake’]), correctValue: ‘An opening in the Earth that releases lava’, hint: ‘Volcanoes erupt when molten rock (magma) forces its way to the surface.’ },
{ text: ‘What is a tsunami?’, answers: makeA(‘A giant wave caused by an underwater earthquake’, [‘A very strong wind’,‘A type of tornado’,‘A heavy snowstorm’]), correctValue: ‘A giant wave caused by an underwater earthquake’, hint: ‘Tsunamis are giant ocean waves triggered by earthquakes or volcanic eruptions under the sea.’ },
{ text: ‘What is a tornado?’, answers: makeA(‘A spinning column of air’, [‘A large rainstorm’,‘A gentle breeze’,‘A type of earthquake’]), correctValue: ‘A spinning column of air’, hint: ‘Tornadoes are violent rotating columns of air extending from thunderstorms.’ },
{ text: ‘What causes a flood?’, answers: makeA(‘Too much water overwhelming an area’, [‘Strong wind’,‘Lack of soil’,‘Hot temperatures’]), correctValue: ‘Too much water overwhelming an area’, hint: ‘Floods happen when heavy rain causes rivers and lakes to overflow.’ },
];

const sciQ_weather = [
{ text: ‘What tool measures temperature?’, answers: makeA(‘Thermometer’, [‘Barometer’,‘Ruler’,‘Scale’]), correctValue: ‘Thermometer’, hint: ‘A thermometer tells us how hot or cold it is.’ },
{ text: ‘What type of cloud brings rain?’, answers: makeA(‘Cumulonimbus’, [‘Cirrus’,‘Stratus’,‘Cumulus’]), correctValue: ‘Cumulonimbus’, hint: ‘Cumulonimbus are tall, dark storm clouds that bring heavy rain.’ },
{ text: ‘What is wind?’, answers: makeA(‘Moving air’, [‘Falling water’,‘Frozen air’,‘Rising heat’]), correctValue: ‘Moving air’, hint: ‘Wind is air that moves from areas of high pressure to low pressure.’ },
{ text: ‘What causes thunder?’, answers: makeA(‘Rapid expansion of air heated by lightning’, [‘Clouds bumping together’,‘Rain hitting the ground’,‘Strong wind’]), correctValue: ‘Rapid expansion of air heated by lightning’, hint: ‘Lightning heats the air so fast it expands quickly — that boom is thunder!’ },
{ text: ‘What is precipitation?’, answers: makeA(‘Water falling from the sky’, [‘Water evaporating’,‘Clouds forming’,‘Wind blowing’]), correctValue: ‘Water falling from the sky’, hint: ‘Precipitation includes rain, snow, sleet, and hail.’ },
];

const sciQ_seasons = [
{ text: ‘How many seasons are there?’, answers: makeA(‘4’, [‘2’,‘3’,‘6’]), correctValue: ‘4’, hint: ‘Spring, Summer, Autumn (Fall), and Winter.’ },
{ text: ‘Which season is the hottest?’, answers: makeA(‘Summer’, [‘Winter’,‘Spring’,‘Autumn’]), correctValue: ‘Summer’, hint: ‘Summer is when Earth tilts toward the Sun — bringing longer, hotter days.’ },
{ text: ‘Which season do leaves change color and fall?’, answers: makeA(‘Autumn’, [‘Spring’,‘Summer’,‘Winter’]), correctValue: ‘Autumn’, hint: ‘In autumn (fall), days shorten, temperatures drop, and leaves change color.’ },
{ text: ‘What happens to many trees in winter?’, answers: makeA(‘They lose their leaves’, [‘They grow faster’,‘They turn green’,‘They produce fruit’]), correctValue: ‘They lose their leaves’, hint: ‘Deciduous trees shed their leaves in autumn to save energy through winter.’ },
{ text: ‘What causes the seasons to change?’, answers: makeA(“Earth’s tilt as it orbits the Sun”, [“The Moon’s orbit”,“Distance from the Sun”,“The wind”]), correctValue: “Earth’s tilt as it orbits the Sun”, hint: “Earth is tilted 23.5°. As it orbits the Sun, different parts get more sunlight — that creates seasons.” },
];

const sciQ_waterCycle = [
{ text: ‘What is the process of water turning into vapor called?’, answers: makeA(‘Evaporation’, [‘Condensation’,‘Precipitation’,‘Collection’]), correctValue: ‘Evaporation’, hint: ‘The Sun's heat causes water to evaporate — turning liquid into water vapor.’ },
{ text: ‘What is it called when water vapor cools and forms clouds?’, answers: makeA(‘Condensation’, [‘Evaporation’,‘Precipitation’,‘Transpiration’]), correctValue: ‘Condensation’, hint: ‘When water vapor rises and cools, it condenses into tiny droplets forming clouds.’ },
{ text: ‘What is precipitation?’, answers: makeA(‘Water falling as rain, snow, or sleet’, [‘Water evaporating’,‘Clouds forming’,‘Water collecting in rivers’]), correctValue: ‘Water falling as rain, snow, or sleet’, hint: ‘When clouds get heavy enough, water falls back to Earth as precipitation.’ },
{ text: ‘What drives the water cycle?’, answers: makeA(‘Energy from the Sun’, [‘The Moon's gravity’,‘Wind only’,‘Ocean currents’]), correctValue: ‘Energy from the Sun’, hint: ‘The Sun's energy evaporates water, powering the entire water cycle.’ },
{ text: ‘Where does most evaporated water come from?’, answers: makeA(‘Oceans’, [‘Rivers’,‘Lakes’,‘Puddles’]), correctValue: ‘Oceans’, hint: ‘Oceans cover 71% of Earth — they are the biggest source of evaporation.’ },
];

const sciQ_sunMoon = [
{ text: ‘What is the Sun?’, answers: makeA(‘A star’, [‘A planet’,‘A moon’,‘An asteroid’]), correctValue: ‘A star’, hint: ‘The Sun is a medium-sized star at the center of our solar system.’ },
{ text: ‘How long does Earth take to orbit the Sun?’, answers: makeA(‘365 days (1 year)’, [‘24 hours’,‘30 days’,‘10 years’]), correctValue: ‘365 days (1 year)’, hint: ‘One Earth year = 365.25 days — that's why we have a leap year every 4 years!’ },
{ text: ‘What causes day and night?’, answers: makeA(“Earth spinning on its axis”, [“Earth orbiting the Sun”,“The Moon blocking the Sun”,“Clouds covering the Sun”]), correctValue: “Earth spinning on its axis”, hint: “Earth spins (rotates) once every 24 hours — the side facing the Sun has day.” },
{ text: ‘What shape is the Moon?’, answers: makeA(‘Roughly spherical (ball-shaped)’, [‘Flat and circular’,‘Cube-shaped’,‘Ring-shaped’]), correctValue: ‘Roughly spherical (ball-shaped)’, hint: ‘The Moon is a spherical rocky body — like a giant ball.’ },
{ text: ‘Does the Moon produce its own light?’, answers: makeA(‘No, it reflects sunlight’, [‘Yes, from inside’,‘Yes, like a star’,‘No, it glows from heat’]), correctValue: ‘No, it reflects sunlight’, hint: ‘The Moon has no light of its own — it reflects light from the Sun.’ },
];

const sciQ_planets = [
{ text: ‘How many planets are in our solar system?’, answers: makeA(‘8’, [‘7’,‘9’,‘10’]), correctValue: ‘8’, hint: ‘Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.’ },
{ text: ‘Which is the largest planet?’, answers: makeA(‘Jupiter’, [‘Saturn’,‘Earth’,‘Neptune’]), correctValue: ‘Jupiter’, hint: ‘Jupiter is so big that all other planets could fit inside it!’ },
{ text: ‘Which planet is known as the Red Planet?’, answers: makeA(‘Mars’, [‘Venus’,‘Mercury’,‘Saturn’]), correctValue: ‘Mars’, hint: ‘Mars appears red because of iron oxide (rust) on its surface.’ },
{ text: ‘Which planet has beautiful rings around it?’, answers: makeA(‘Saturn’, [‘Jupiter’,‘Uranus’,‘Neptune’]), correctValue: ‘Saturn’, hint: ‘Saturn's rings are made of ice and rock — they are thousands of miles wide!’ },
{ text: ‘Which planet is closest to the Sun?’, answers: makeA(‘Mercury’, [‘Venus’,‘Earth’,‘Mars’]), correctValue: ‘Mercury’, hint: ‘Mercury is the smallest and closest planet to the Sun.’ },
];

const sciQ_spaceExplore = [
{ text: ‘Who was the first person to walk on the Moon?’, answers: makeA(‘Neil Armstrong’, [‘Buzz Aldrin’,‘Yuri Gagarin’,‘John Glenn’]), correctValue: ‘Neil Armstrong’, hint: ‘Neil Armstrong stepped on the Moon on July 20, 1969, during Apollo 11.’ },
{ text: ‘What is an astronaut?’, answers: makeA(‘A person trained to travel in space’, [‘A scientist who studies stars’,‘A pilot who flies jets’,‘A person who builds rockets’]), correctValue: ‘A person trained to travel in space’, hint: ‘Astronauts are specially trained to live and work in space.’ },
{ text: ‘What does NASA stand for?’, answers: makeA(‘National Aeronautics and Space Administration’, [‘National Air and Space Agency’,‘North American Space Association’,‘National Astronomy and Space Academy’]), correctValue: ‘National Aeronautics and Space Administration’, hint: ‘NASA is the US government agency responsible for space exploration.’ },
{ text: ‘What is a satellite?’, answers: makeA(‘An object that orbits a planet’, [‘A type of rocket’,‘A space station’,‘A type of star’]), correctValue: ‘An object that orbits a planet’, hint: ‘The Moon is a natural satellite. GPS satellites are man-made.’ },
{ text: ‘What is a telescope used for?’, answers: makeA(‘To see distant objects in space’, [‘To measure temperature’,‘To track weather’,‘To communicate in space’]), correctValue: ‘To see distant objects in space’, hint: ‘Telescopes make faraway objects look closer and larger.’ },
];

const sciQ_bodyParts = [
{ text: ‘What does the heart do?’, answers: makeA(‘Pumps blood around the body’, [‘Helps you breathe’,‘Digests food’,‘Controls movement’]), correctValue: ‘Pumps blood around the body’, hint: ‘Your heart beats about 100,000 times a day pumping blood!’ },
{ text: ‘What do lungs do?’, answers: makeA(‘Help us breathe and take in oxygen’, [‘Pump blood’,‘Digest food’,‘Filter waste’]), correctValue: ‘Help us breathe and take in oxygen’, hint: ‘Lungs take in oxygen and release carbon dioxide.’ },
{ text: ‘What is the function of the brain?’, answers: makeA(‘Controls everything the body does’, [‘Pumps blood’,‘Digests food’,‘Helps us breathe’]), correctValue: ‘Controls everything the body does’, hint: ‘The brain is the control centre — it controls thoughts, movement, and body functions.’ },
{ text: ‘What does the stomach do?’, answers: makeA(‘Digests food’, [‘Pumps blood’,‘Controls movement’,‘Helps us breathe’]), correctValue: ‘Digests food’, hint: ‘The stomach uses acids and muscles to break down food.’ },
{ text: ‘What are bones part of?’, answers: makeA(‘The skeletal system’, [‘The digestive system’,‘The respiratory system’,‘The nervous system’]), correctValue: ‘The skeletal system’, hint: ‘The skeletal system gives our body shape and protects organs.’ },
];

const sciQ_senses = [
{ text: ‘Which sense uses your eyes?’, answers: makeA(‘Sight’, [‘Hearing’,‘Touch’,‘Taste’]), correctValue: ‘Sight’, hint: ‘Eyes let us see — that is the sense of sight.’ },
{ text: ‘Which organ is responsible for hearing?’, answers: makeA(‘Ears’, [‘Eyes’,‘Nose’,‘Tongue’]), correctValue: ‘Ears’, hint: ‘Ears detect sound waves — giving us the sense of hearing.’ },
{ text: ‘Which sense lets you taste food?’, answers: makeA(‘Taste’, [‘Smell’,‘Touch’,‘Sight’]), correctValue: ‘Taste’, hint: ‘Your tongue has taste buds that detect sweet, sour, salty, bitter, and savory flavors.’ },
{ text: ‘How many senses do humans have?’, answers: makeA(‘5’, [‘3’,‘4’,‘6’]), correctValue: ‘5’, hint: ‘Sight, hearing, smell, taste, and touch — the 5 basic senses.’ },
{ text: ‘Which sense helps you smell flowers?’, answers: makeA(‘Smell’, [‘Taste’,‘Touch’,‘Hearing’]), correctValue: ‘Smell’, hint: ‘Your nose detects odors — giving you the sense of smell.’ },
];

const sciQ_healthy = [
{ text: ‘How much sleep do most kids need each night?’, answers: makeA(‘9–11 hours’, [‘4–5 hours’,‘6–7 hours’,‘12–14 hours’]), correctValue: ‘9–11 hours’, hint: ‘Growing kids need lots of sleep — it helps their brain and body develop.’ },
{ text: ‘Why is drinking water important?’, answers: makeA(‘It keeps our body hydrated and working’, [‘It gives us energy’,‘It makes us stronger’,‘It helps us grow taller’]), correctValue: ‘It keeps our body hydrated and working’, hint: ‘Your body is about 60% water — staying hydrated is essential for health.’ },
{ text: ‘What food group gives us the most energy?’, answers: makeA(‘Carbohydrates’, [‘Fats’,‘Proteins’,‘Vitamins’]), correctValue: ‘Carbohydrates’, hint: ‘Bread, rice, pasta, and fruit are carbohydrates — our main energy source.’ },
{ text: ‘Why is exercise important?’, answers: makeA(‘It keeps our heart and muscles strong’, [‘It makes us taller’,‘It helps us read better’,‘It improves our eyesight’]), correctValue: ‘It keeps our heart and muscles strong’, hint: ‘Regular exercise strengthens your heart, lungs, and muscles.’ },
{ text: ‘Why should we wash our hands?’, answers: makeA(‘To remove germs that cause illness’, [‘To keep them warm’,‘To make them stronger’,‘To improve grip’]), correctValue: ‘To remove germs that cause illness’, hint: ‘Handwashing removes bacteria and viruses that can make you sick.’ },
];

// Helpers (shared with reading.js if loaded after)
function makeA(correct, wrongs) {
const all = [{ label: correct, isCorrect: true }, …wrongs.map(w => ({ label: w, isCorrect: false }))];
for (let i = all.length - 1; i > 0; i–) {
const j = Math.floor(Math.random() * (i + 1));
[all[i], all[j]] = [all[j], all[i]];
}
return all;
}
function pickRandom(arr, n) {
const copy = […arr];
const result = [];
while (result.length < n && copy.length > 0) {
const i = Math.floor(Math.random() * copy.length);
result.push({ …copy.splice(i, 1)[0] });
}
while (result.length < n) result.push({ …arr[Math.floor(Math.random() * arr.length)] });
return result;
}

window.ScienceSubject = ScienceSubject;
