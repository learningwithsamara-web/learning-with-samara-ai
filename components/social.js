/**

- components/social.js
- =====================================================
- Social Studies subject — worlds: Community,
- History, Geography, Government, and Culture.
- =====================================================
  */

const SocialSubject = {
id: ‘social’,
name: ‘Social Studies’,
icon: ‘🌎’,
color: ‘#FF6B6B’,

worlds: [
{
id: 1, name: ‘Community’, icon: ‘🏘️’, stageCount: 3,
stages: [
{ id: 1, name: ‘Neighborhoods’,   difficulty: 1, questions: 5 },
{ id: 2, name: ‘Community Helpers’, difficulty: 2, questions: 5 },
{ id: 3, name: ‘Rules & Laws’,    difficulty: 3, questions: 5 }
]
},
{
id: 2, name: ‘History’, icon: ‘🏛️’, stageCount: 3,
stages: [
{ id: 1, name: ‘Famous Leaders’,  difficulty: 1, questions: 5 },
{ id: 2, name: ‘US History’,      difficulty: 2, questions: 5 },
{ id: 3, name: ‘World Events’,    difficulty: 3, questions: 5 }
]
},
{
id: 3, name: ‘Geography’, icon: ‘🗺️’, stageCount: 3,
stages: [
{ id: 1, name: ‘Continents’,      difficulty: 1, questions: 5 },
{ id: 2, name: ‘Countries’,       difficulty: 2, questions: 5 },
{ id: 3, name: ‘Landmarks’,       difficulty: 3, questions: 5 }
]
},
{
id: 4, name: ‘Government’, icon: ‘⚖️’, stageCount: 3,
stages: [
{ id: 1, name: ‘What is Government?’, difficulty: 1, questions: 5 },
{ id: 2, name: ‘US Government’,       difficulty: 2, questions: 5 },
{ id: 3, name: ‘Democracy’,           difficulty: 3, questions: 5 }
]
},
{
id: 5, name: ‘Cultures’, icon: ‘🎭’, stageCount: 3,
stages: [
{ id: 1, name: ‘Traditions’,      difficulty: 1, questions: 5 },
{ id: 2, name: ‘World Cultures’,  difficulty: 2, questions: 5 },
{ id: 3, name: ‘Celebrations’,    difficulty: 3, questions: 5 }
]
}
],

generateQuestions(worldId, stageId, count = 5) {
const banks = {
‘1-1’: ssQ_neighborhoods, ‘1-2’: ssQ_communityHelpers, ‘1-3’: ssQ_rules,
‘2-1’: ssQ_famousLeaders, ‘2-2’: ssQ_usHistory, ‘2-3’: ssQ_worldEvents,
‘3-1’: ssQ_continents, ‘3-2’: ssQ_countries, ‘3-3’: ssQ_landmarks,
‘4-1’: ssQ_whatIsGov, ‘4-2’: ssQ_usGov, ‘4-3’: ssQ_democracy,
‘5-1’: ssQ_traditions, ‘5-2’: ssQ_worldCultures, ‘5-3’: ssQ_celebrations,
};
const pool = banks[`${worldId}-${stageId}`] || ssQ_neighborhoods;
return pickRandom(pool, count);
}
};

// ── Social Studies Question Banks ─────────────────────

const ssQ_neighborhoods = [
{ text: ‘What is a community?’, answers: makeA(‘A group of people living in the same area’, [‘A school building’,‘A type of park’,‘A government office’]), correctValue: ‘A group of people living in the same area’, hint: ‘Communities are groups of people who share a neighborhood, town, or city.’ },
{ text: ‘Which of these is found in most neighborhoods?’, answers: makeA(‘Schools, stores, and homes’, [‘Only beaches’,‘Only farms’,‘Only skyscrapers’]), correctValue: ‘Schools, stores, and homes’, hint: ‘Most neighborhoods have places to live, learn, and shop.’ },
{ text: ‘What is a suburb?’, answers: makeA(‘A residential area outside a city’, [‘The center of a city’,‘A rural farming area’,‘An industrial zone’]), correctValue: ‘A residential area outside a city’, hint: ‘Suburbs are quieter residential areas surrounding a larger city.’ },
{ text: ‘What makes a neighborhood safe?’, answers: makeA(‘People following rules and looking out for each other’, [‘Having no roads’,‘Having tall walls’,‘Having only one family’]), correctValue: ‘People following rules and looking out for each other’, hint: ‘Community safety comes from cooperation and shared responsibility.’ },
{ text: ‘What is a city?’, answers: makeA(‘A large community with many people and buildings’, [‘A small farm’,‘A single house’,‘A forest’]), correctValue: ‘A large community with many people and buildings’, hint: ‘Cities are large, densely populated communities with lots of services.’ },
];

const ssQ_communityHelpers = [
{ text: ‘Who helps put out fires?’, answers: makeA(‘Firefighters’, [‘Police officers’,‘Doctors’,‘Teachers’]), correctValue: ‘Firefighters’, hint: ‘Firefighters protect our community by fighting fires and rescuing people.’ },
{ text: ‘Who teaches children in school?’, answers: makeA(‘Teachers’, [‘Nurses’,‘Builders’,‘Pilots’]), correctValue: ‘Teachers’, hint: ‘Teachers educate children — they are very important community helpers!’ },
{ text: ‘Who delivers mail to homes?’, answers: makeA(‘Mail carriers’, [‘Police officers’,‘Doctors’,‘Firefighters’]), correctValue: ‘Mail carriers’, hint: ‘Mail carriers (postal workers) deliver letters and packages.’ },
{ text: ‘Who helps keep our community safe from crime?’, answers: makeA(‘Police officers’, [‘Teachers’,‘Nurses’,‘Farmers’]), correctValue: ‘Police officers’, hint: ‘Police officers enforce laws and help keep communities safe.’ },
{ text: ‘Who builds houses and buildings?’, answers: makeA(‘Construction workers’, [‘Doctors’,‘Teachers’,‘Firefighters’]), correctValue: ‘Construction workers’, hint: ‘Construction workers use tools and materials to build our homes and buildings.’ },
];

const ssQ_rules = [
{ text: ‘Why do communities have rules?’, answers: makeA(‘To keep people safe and treat everyone fairly’, [‘To make life harder’,‘To give only some people rights’,‘To stop people having fun’]), correctValue: ‘To keep people safe and treat everyone fairly’, hint: ‘Rules and laws protect everyone and make sure things are fair.’ },
{ text: ‘What is a law?’, answers: makeA(‘An official rule everyone must follow’, [‘A suggestion’,‘A personal choice’,‘A school rule’]), correctValue: ‘An official rule everyone must follow’, hint: ‘Laws are made by governments and apply to everyone in that community or country.’ },
{ text: ‘What happens if someone breaks a law?’, answers: makeA(‘They may face a punishment or consequence’, [‘Nothing happens’,‘They get a prize’,‘They become a leader’]), correctValue: ‘They may face a punishment or consequence’, hint: ‘Breaking laws has consequences — like fines or community service — to discourage harmful behavior.’ },
{ text: ‘Why is it important to follow traffic rules?’, answers: makeA(‘To prevent accidents and keep everyone safe’, [‘To make driving harder’,‘So only fast cars win’,‘To waste time’]), correctValue: ‘To prevent accidents and keep everyone safe’, hint: ‘Traffic rules like stop signs and speed limits prevent accidents.’ },
{ text: ‘Who makes the laws in the United States?’, answers: makeA(‘Congress (Senate and House of Representatives)’, [‘The President alone’,‘Police officers’,‘The courts’]), correctValue: ‘Congress (Senate and House of Representatives)’, hint: ‘In the US, Congress is the lawmaking branch of government.’ },
];

const ssQ_famousLeaders = [
{ text: ‘Who was the first President of the United States?’, answers: makeA(‘George Washington’, [‘Abraham Lincoln’,‘Thomas Jefferson’,‘Benjamin Franklin’]), correctValue: ‘George Washington’, hint: ‘George Washington led the Continental Army and became the first US President in 1789.’ },
{ text: ‘Who wrote the Declaration of Independence?’, answers: makeA(‘Thomas Jefferson’, [‘George Washington’,‘Benjamin Franklin’,‘John Adams’]), correctValue: ‘Thomas Jefferson’, hint: ‘Thomas Jefferson was the primary author of the Declaration of Independence (1776).’ },
{ text: ‘Martin Luther King Jr. is famous for:’, answers: makeA(‘Fighting for civil rights and equality’, [‘Discovering electricity’,‘Being the first president’,‘Leading a war’]), correctValue: ‘Fighting for civil rights and equality’, hint: ‘Dr. King led the civil rights movement, advocating for equality through peaceful protest.’ },
{ text: ‘Who was the 16th President of the United States?’, answers: makeA(‘Abraham Lincoln’, [‘George Washington’,‘Thomas Jefferson’,‘Theodore Roosevelt’]), correctValue: ‘Abraham Lincoln’, hint: ‘Abraham Lincoln led the US during the Civil War and ended slavery.’ },
{ text: ‘What is Rosa Parks famous for?’, answers: makeA(‘Refusing to give up her bus seat to protest racial segregation’, [‘Being the first woman in space’,‘Writing the Constitution’,‘Discovering America’]), correctValue: ‘Refusing to give up her bus seat to protest racial segregation’, hint: ‘Rosa Parks' brave act in 1955 helped spark the civil rights movement.’ },
];

const ssQ_usHistory = [
{ text: ‘In what year did the United States declare independence?’, answers: makeA(‘1776’, [‘1492’,‘1865’,‘1620’]), correctValue: ‘1776’, hint: ‘The Declaration of Independence was signed on July 4, 1776.’ },
{ text: ‘What ship carried the Pilgrims to America in 1620?’, answers: makeA(‘The Mayflower’, [‘The Santa Maria’,‘The Titanic’,‘The Endeavour’]), correctValue: ‘The Mayflower’, hint: ‘The Mayflower carried 102 passengers (Pilgrims) from England to Plymouth, Massachusetts.’ },
{ text: ‘What does the 4th of July celebrate?’, answers: makeA(“American Independence Day”, [“The end of World War II”,“George Washington’s birthday”,“The founding of New York”]), correctValue: “American Independence Day”, hint: “July 4th, 1776 — the day the Declaration of Independence was adopted.” },
{ text: ‘The Civil War was fought over:’, answers: makeA(‘Slavery and states' rights’, [‘Trade with Europe’,‘Religious freedom’,‘Land with Mexico’]), correctValue: ‘Slavery and states' rights’, hint: ‘The Civil War (1861-1865) was primarily fought over slavery and whether states could leave the Union.’ },
{ text: ‘Who was the first American to walk on the Moon?’, answers: makeA(‘Neil Armstrong’, [‘Buzz Aldrin’,‘John Glenn’,‘Alan Shepard’]), correctValue: ‘Neil Armstrong’, hint: ‘Neil Armstrong stepped onto the Moon on July 20, 1969.’ },
];

const ssQ_worldEvents = [
{ text: ‘What was World War II?’, answers: makeA(‘A global conflict from 1939–1945’, [‘A trade war in the 1800s’,‘A war between two countries’,‘A revolution in France’]), correctValue: ‘A global conflict from 1939–1945’, hint: ‘WWII involved most of the world's nations and ended in 1945.’ },
{ text: ‘What did the Berlin Wall separate?’, answers: makeA(‘East and West Berlin’, [‘France and Germany’,‘The US and Canada’,‘North and South Korea’]), correctValue: ‘East and West Berlin’, hint: ‘The Berlin Wall (1961-1989) divided the city of Berlin in Germany during the Cold War.’ },
{ text: ‘What was the Renaissance?’, answers: makeA(‘A period of great art, science, and learning in Europe’, [‘A type of war’,‘A natural disaster’,‘A form of government’]), correctValue: ‘A period of great art, science, and learning in Europe’, hint: ‘The Renaissance (14th-17th century) was a flowering of culture, art, and science in Europe.’ },
{ text: ‘Who was Nelson Mandela?’, answers: makeA(‘Leader who fought against apartheid in South Africa’, [‘The first US president’,‘A famous scientist’,‘A European explorer’]), correctValue: ‘Leader who fought against apartheid in South Africa’, hint: ‘Mandela spent 27 years in prison before becoming South Africa's first democratically elected president.’ },
{ text: ‘What was the Silk Road?’, answers: makeA(‘Ancient trade routes connecting Asia to Europe’, [‘A road made of silk’,‘A wall in China’,‘A river in Asia’]), correctValue: ‘Ancient trade routes connecting Asia to Europe’, hint: ‘The Silk Road was a network of trade routes used for over 1,500 years.’ },
];

const ssQ_continents = [
{ text: ‘How many continents are there?’, answers: makeA(‘7’, [‘5’,‘6’,‘8’]), correctValue: ‘7’, hint: ‘Africa, Antarctica, Asia, Australia, Europe, North America, South America.’ },
{ text: ‘What is the largest continent?’, answers: makeA(‘Asia’, [‘Africa’,‘North America’,‘Europe’]), correctValue: ‘Asia’, hint: ‘Asia is the largest continent — covering about 30% of Earth's land area.’ },
{ text: ‘Which continent is the United States on?’, answers: makeA(‘North America’, [‘South America’,‘Europe’,‘Asia’]), correctValue: ‘North America’, hint: ‘The US is in North America, along with Canada and Mexico.’ },
{ text: ‘Which continent is at the South Pole?’, answers: makeA(‘Antarctica’, [‘Australia’,‘Africa’,‘South America’]), correctValue: ‘Antarctica’, hint: ‘Antarctica surrounds the South Pole and is covered in ice.’ },
{ text: ‘Which is both a continent and a country?’, answers: makeA(‘Australia’, [‘Africa’,‘Europe’,‘Antarctica’]), correctValue: ‘Australia’, hint: ‘Australia is unique — it is the only country that is also an entire continent.’ },
];

const ssQ_countries = [
{ text: ‘What is the capital of France?’, answers: makeA(‘Paris’, [‘London’,‘Berlin’,‘Madrid’]), correctValue: ‘Paris’, hint: ‘Paris, the City of Light, is the capital of France.’ },
{ text: ‘What country is the Great Wall located in?’, answers: makeA(‘China’, [‘Japan’,‘India’,‘Mongolia’]), correctValue: ‘China’, hint: ‘The Great Wall of China stretches thousands of miles across China.’ },
{ text: ‘Which country is the largest in the world by area?’, answers: makeA(‘Russia’, [‘Canada’,‘China’,‘United States’]), correctValue: ‘Russia’, hint: ‘Russia is the largest country — covering about 17 million km².’ },
{ text: ‘What language is spoken in Brazil?’, answers: makeA(‘Portuguese’, [‘Spanish’,‘English’,‘French’]), correctValue: ‘Portuguese’, hint: ‘Brazil was colonized by Portugal — that's why Brazilians speak Portuguese.’ },
{ text: ‘What country has the most people?’, answers: makeA(‘India’, [‘China’,‘United States’,‘Indonesia’]), correctValue: ‘India’, hint: ‘India recently surpassed China as the world's most populous country.’ },
];

const ssQ_landmarks = [
{ text: ‘Where is the Eiffel Tower located?’, answers: makeA(‘Paris, France’, [‘London, England’,‘Rome, Italy’,‘Berlin, Germany’]), correctValue: ‘Paris, France’, hint: ‘The Eiffel Tower was built for the 1889 World's Fair in Paris.’ },
{ text: ‘Where is the Great Pyramid of Giza?’, answers: makeA(‘Egypt’, [‘Greece’,‘Mexico’,‘India’]), correctValue: ‘Egypt’, hint: ‘The Great Pyramid was built around 2560 BC — it's one of the Seven Wonders of the Ancient World.’ },
{ text: ‘The Statue of Liberty was a gift from which country?’, answers: makeA(‘France’, [‘England’,‘Spain’,‘Canada’]), correctValue: ‘France’, hint: ‘France gave the Statue of Liberty to the US in 1886 as a symbol of friendship.’ },
{ text: ‘Where is the Colosseum located?’, answers: makeA(‘Rome, Italy’, [‘Athens, Greece’,‘Madrid, Spain’,‘Paris, France’]), correctValue: ‘Rome, Italy’, hint: ‘The Colosseum is an ancient Roman amphitheater built in 70–80 AD.’ },
{ text: ‘Where is Machu Picchu?’, answers: makeA(‘Peru’, [‘Mexico’,‘Brazil’,‘Chile’]), correctValue: ‘Peru’, hint: ‘Machu Picchu is an ancient Inca city high in the Andes mountains of Peru.’ },
];

const ssQ_whatIsGov = [
{ text: ‘What does a government do?’, answers: makeA(‘Makes laws and provides services for people’, [‘Sells products’,‘Teaches in schools only’,‘Runs businesses’]), correctValue: ‘Makes laws and provides services for people’, hint: ‘Governments make and enforce laws and provide services like roads, schools, and police.’ },
{ text: ‘What are the 3 branches of the US government?’, answers: makeA(‘Legislative, Executive, Judicial’, [‘City, State, Federal’,‘Congress, Army, Courts’,‘Senate, Police, Schools’]), correctValue: ‘Legislative, Executive, Judicial’, hint: ‘Three branches keep power balanced: lawmakers, the president, and the courts.’ },
{ text: ‘What does the President of the US do?’, answers: makeA(‘Leads the country and enforces laws’, [‘Makes the laws’,‘Judges court cases’,‘Runs all businesses’]), correctValue: ‘Leads the country and enforces laws’, hint: ‘The President is the head of the Executive Branch — they enforce the laws Congress makes.’ },
{ text: ‘What is the Constitution?’, answers: makeA(‘The supreme law of the United States’, [‘A famous speech’,‘A type of tax’,‘The US national anthem’]), correctValue: ‘The supreme law of the United States’, hint: ‘The US Constitution (1787) is the foundation of American law and government.’ },
{ text: ‘Who can vote in the United States?’, answers: makeA(‘Citizens who are 18 or older’, [‘Anyone who lives in the US’,‘Only men’,‘Only people who own property’]), correctValue: ‘Citizens who are 18 or older’, hint: ‘The 26th Amendment (1971) set the voting age at 18.’ },
];

const ssQ_usGov = [
{ text: ‘How many senators does each US state have?’, answers: makeA(‘2’, [‘1’,‘3’,‘5’]), correctValue: ‘2’, hint: ‘Every US state has exactly 2 senators — 50 states × 2 = 100 senators total.’ },
{ text: ‘How long is a US President's term?’, answers: makeA(‘4 years’, [‘2 years’,‘6 years’,‘8 years’]), correctValue: ‘4 years’, hint: ‘US Presidents serve 4-year terms and can be elected for a maximum of 2 terms.’ },
{ text: ‘What is the Supreme Court?’, answers: makeA(‘The highest court in the United States’, [‘The President's office’,‘The main lawmaking body’,‘The national police’]), correctValue: ‘The highest court in the United States’, hint: ‘The Supreme Court is the top court — its decisions are final.’ },
{ text: ‘Where does Congress meet?’, answers: makeA(‘The US Capitol Building’, [‘The White House’,‘The Pentagon’,‘The Supreme Court’]), correctValue: ‘The US Capitol Building’, hint: ‘The Capitol Building in Washington DC is where Congress (Senate + House) meets.’ },
{ text: ‘What is the Bill of Rights?’, answers: makeA(‘The first 10 amendments protecting citizens' freedoms’, [‘A list of taxes’,‘A set of trade agreements’,‘A list of government officials’]), correctValue: ‘The first 10 amendments protecting citizens' freedoms’, hint: ‘The Bill of Rights (1791) protects freedoms like speech, religion, and press.’ },
];

const ssQ_democracy = [
{ text: ‘What is democracy?’, answers: makeA(‘A system where citizens vote for their leaders’, [‘A system with one all-powerful ruler’,‘A system run by the military’,‘A system run by the richest people’]), correctValue: ‘A system where citizens vote for their leaders’, hint: ‘Democracy means “rule by the people” — citizens choose their leaders through elections.’ },
{ text: ‘What is an election?’, answers: makeA(‘A process where people vote to choose leaders’, [‘A type of law’,‘A government tax’,‘A military ceremony’]), correctValue: ‘A process where people vote to choose leaders’, hint: ‘Elections are how citizens in democracies choose who governs them.’ },
{ text: ‘What does “freedom of speech” mean?’, answers: makeA(‘The right to express your opinions’, [‘The right to take others' property’,‘The right to break laws’,‘The right to govern others’]), correctValue: ‘The right to express your opinions’, hint: ‘Freedom of speech allows people to speak their minds without fear of punishment by the government.’ },
{ text: ‘Why is it important to vote?’, answers: makeA(‘It gives citizens a voice in how they are governed’, [‘It makes you rich’,‘It is required to get a job’,‘It gives you extra rights’]), correctValue: ‘It gives citizens a voice in how they are governed’, hint: ‘Voting is how citizens participate in democracy and choose their representatives.’ },
{ text: ‘What is a representative?’, answers: makeA(‘A person elected to speak and act on behalf of others’, [‘A judge’,‘A soldier’,‘A police officer’]), correctValue: ‘A person elected to speak and act on behalf of others’, hint: ‘Representatives in Congress speak for the citizens who voted for them.’ },
];

const ssQ_traditions = [
{ text: ‘What is a tradition?’, answers: makeA(‘A custom passed down through generations’, [‘A new law’,‘A type of food’,‘A school subject’]), correctValue: ‘A custom passed down through generations’, hint: ‘Traditions are practices that families and communities repeat over time.’ },
{ text: ‘Which holiday celebrates American independence?’, answers: makeA(‘Independence Day (4th of July)’, [‘Thanksgiving’,‘Labor Day’,‘Memorial Day’]), correctValue: ‘Independence Day (4th of July)’, hint: ‘The 4th of July celebrates the signing of the Declaration of Independence in 1776.’ },
{ text: ‘What is Thanksgiving about?’, answers: makeA(‘Giving thanks and sharing a meal with family’, [‘A harvest festival from another country’,‘A celebration of a military victory’,‘A religious holiday only’]), correctValue: ‘Giving thanks and sharing a meal with family’, hint: ‘Thanksgiving in the US dates to the Pilgrims' 1621 harvest celebration.’ },
{ text: ‘What do families often do during cultural celebrations?’, answers: makeA(‘Share food, music, dance, and stories’, [‘Go to work as usual’,‘Stay silent all day’,‘Avoid all gatherings’]), correctValue: ‘Share food, music, dance, and stories’, hint: ‘Celebrations bring communities together through shared food, music, and stories.’ },
{ text: ‘Why are traditions important?’, answers: makeA(‘They connect us to our history and community’, [‘They make us eat less’,‘They replace laws’,‘They stop change’]), correctValue: ‘They connect us to our history and community’, hint: ‘Traditions strengthen cultural identity and connect generations.’ },
];

const ssQ_worldCultures = [
{ text: ‘What continent is Japan located on?’, answers: makeA(‘Asia’, [‘Africa’,‘Europe’,‘Australia’]), correctValue: ‘Asia’, hint: ‘Japan is an island country in East Asia.’ },
{ text: ‘What language do people speak in Mexico?’, answers: makeA(‘Spanish’, [‘Portuguese’,‘English’,‘French’]), correctValue: ‘Spanish’, hint: ‘Mexico was colonized by Spain — Spanish became the primary language.’ },
{ text: ‘What is a culture?’, answers: makeA(‘The beliefs, customs, and way of life of a group of people’, [‘A type of government’,‘A science experiment’,‘A type of food’]), correctValue: ‘The beliefs, customs, and way of life of a group of people’, hint: ‘Culture includes language, food, music, art, religion, and traditions.’ },
{ text: ‘Which country is famous for the Eiffel Tower and croissants?’, answers: makeA(‘France’, [‘Italy’,‘Spain’,‘Germany’]), correctValue: ‘France’, hint: ‘France is known for its art, cuisine, and iconic landmarks like the Eiffel Tower.’ },
{ text: ‘What is a common form of traditional Japanese theater?’, answers: makeA(‘Kabuki’, [‘Opera’,‘Ballet’,‘Flamenco’]), correctValue: ‘Kabuki’, hint: ‘Kabuki is a classical form of Japanese theater with elaborate costumes and makeup.’ },
];

const ssQ_celebrations = [
{ text: ‘What is Diwali?’, answers: makeA(‘The Hindu festival of lights’, [‘A Chinese New Year celebration’,‘A Mexican harvest festival’,‘An African drum festival’]), correctValue: ‘The Hindu festival of lights’, hint: ‘Diwali is celebrated by Hindus, Sikhs, and Jains — marked by lights, fireworks, and sweets.’ },
{ text: ‘What is the Chinese New Year also called?’, answers: makeA(‘Lunar New Year’, [‘Solar New Year’,‘Spring Festival’,‘Harvest Festival’]), correctValue: ‘Lunar New Year’, hint: ‘Chinese New Year is based on the lunar calendar and is also called Spring Festival.’ },
{ text: ‘What holiday involves trick-or-treating?’, answers: makeA(‘Halloween’, [‘Christmas’,‘Easter’,‘Hanukkah’]), correctValue: ‘Halloween’, hint: ‘Halloween on October 31st involves costumes, candy, and trick-or-treating.’ },
{ text: ‘What is Ramadan?’, answers: makeA(‘A holy month of fasting observed by Muslims’, [‘A Christian holiday’,‘A Hindu harvest festival’,‘A Jewish new year’]), correctValue: ‘A holy month of fasting observed by Muslims’, hint: ‘During Ramadan, Muslims fast from sunrise to sunset for a full month.’ },
{ text: ‘What is Hanukkah?’, answers: makeA(‘A Jewish festival celebrated for 8 nights’, [‘A Muslim holiday’,‘A Hindu festival’,‘A Christian holiday’]), correctValue: ‘A Jewish festival celebrated for 8 nights’, hint: ‘Hanukkah is the Jewish Festival of Lights, celebrated for 8 nights with a menorah.’ },
];

// ── Helpers ───────────────────────────────────────────
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

window.SocialSubject = SocialSubject;
