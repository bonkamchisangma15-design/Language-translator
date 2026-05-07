const phraseDictionary = {
  en: {
    'eat food': 'sisa kimang',
    'drink water': 'himar rinda',
    'thank you': 'ang',
    'how are you': 'nangseta',
    'good morning': 'amang rukha',
    'good night': 'amang mia',
    'i love you': 'nga se na',
    'where is the house': 'deng fingga',
    'where is the water': 'rinda fingga',
    'i want water': 'nga se rinda',
    'do you have food': 'na kimang da',
    'let us go': 'ning long',
  },
  hi: {
    'खाना खाओ': 'sisa kimang',
    'पानी पीओ': 'himar rinda',
    'धन्यवाद': 'ang',
    'आप कैसे हैं': 'nangseta',
    'शुभ प्रभात': 'amang rukha',
    'शुभ रात्रि': 'amang mia',
    'मैं तुमसे प्यार करता हूँ': 'nga se na',
    'घर कहाँ है': 'deng fingga',
    'पानी कहाँ है': 'rinda fingga',
    'मुझे पानी चाहिए': 'nga se rinda',
    'क्या तुम्हारे पास खाना है': 'na kimang da',
    'चलो चलते हैं': 'ning long',
  },
  grt: {
    'sisa kimang': 'eat food',
    'himar rinda': 'drink water',
    'ang': 'thank you',
    'nangseta': 'how are you',
    'amang rukha': 'good morning',
    'amang mia': 'good night',
    'nga se na': 'i love you',
    'deng fingga': 'where is the house',
    'rinda fingga': 'where is the water',
    'nga se rinda': 'i want water',
    'na kimang da': 'do you have food',
    'ning long': 'let us go',
  },
};

const dictionaries = {
  en: {
    eat: 'sisa',
    food: 'kimang',
    drink: 'himar',
    water: 'rinda',
    house: 'deng',
    home: 'deng',
    child: 'chika',
    friend: 'dawa',
    yes: 'ha',
    no: 'na',
    i: 'nga',
    me: 'nga',
    you: 'na',
    he: 'soni',
    she: 'songi',
    we: 'ning',
    they: 'nomi',
    good: 'tang',
    morning: 'amang',
    night: 'mia',
    thank: 'ang',
    thanks: 'ang',
    hello: 'hola',
    love: 'se',
    where: 'fingga',
    is: '',
    want: 'se',
    have: 'da',
    water: 'rinda',
    please: 'angchi',
    go: 'long',
    let: 'ning',
    us: 'ning',
    my: 'nga',
    name: 'a',
    great: 'tang',
    beautiful: 'tang',
    big: 'fula',
    small: 'jiling',
    school: 'skul',
    market: 'market',
    road: 'road',
    village: 'dingja',
  },
  hi: {
    खाना: 'kimang',
    खाओ: 'sisa',
    पानी: 'rinda',
    पीओ: 'himar',
    घर: 'deng',
    बच्चा: 'chika',
    दोस्त: 'dawa',
    हाँ: 'ha',
    नहीं: 'na',
    मैं: 'nga',
    मुझे: 'nga',
    तुम: 'na',
    वह: 'soni',
    हम: 'ning',
    अच्छा: 'tang',
    सुबह: 'amang',
    रात: 'mia',
    धन्यवाद: 'ang',
    प्यार: 'se',
    कहाँ: 'fingga',
    है: '',
    चाहिए: 'se',
    क्या: 'da',
    चलो: 'long',
    स्कूल: 'skul',
    बाज़ार: 'market',
    सड़क: 'road',
    गाँव: 'dingja',
  },
  grtToEn: {
    sisa: 'eat',
    kimang: 'food',
    himar: 'drink',
    rinda: 'water',
    deng: 'house',
    chika: 'child',
    dawa: 'friend',
    ha: 'yes',
    na: 'no',
    nga: 'I',
    soni: 'he',
    songi: 'she',
    ning: 'we',
    nomi: 'they',
    tang: 'good',
    amang: 'morning',
    mia: 'night',
    ang: 'thank',
    se: 'love',
    fingga: 'where',
    long: 'go',
    da: 'have',
    a: 'name',
    skul: 'school',
    market: 'market',
    road: 'road',
    dingja: 'village',
  },
  grtToHi: {
    sisa: 'खाओ',
    kimang: 'खाना',
    himar: 'पीओ',
    rinda: 'पानी',
    deng: 'घर',
    chika: 'बच्चा',
    dawa: 'दोस्त',
    ha: 'हाँ',
    na: 'नहीं',
    nga: 'मैं',
    soni: 'वह',
    songi: 'वह',
    ning: 'हम',
    nomi: 'वे',
    tang: 'अच्छा',
    amang: 'सुबह',
    mia: 'रात',
    ang: 'धन्यवाद',
    se: 'प्यार',
    fingga: 'कहाँ',
    long: 'चलो',
    da: 'क्या',
    a: 'नाम',
    skol: 'स्कूल',
    market: 'बाज़ार',
    road: 'सड़क',
    dingja: 'गाँव',
  },
};

const translationPatterns = [
  {
    from: 'en',
    to: 'grt',
    regex: /^where is (?:the )?(.+)$/,
    handler: (match) => `${translateWordByWord(match[1], dictionaries.en)} fingga`,
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^i want (.+)$/,
    handler: (match) => `nga se ${translateWordByWord(match[1], dictionaries.en)}`,
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^do you have (.+)$/,
    handler: (match) => `na ${translateWordByWord(match[1], dictionaries.en)} da`,
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^let us go$/,
    handler: () => 'ning long',
  },
  {
    from: 'hi',
    to: 'grt',
    regex: /^(.+) कहाँ है$/,
    handler: (match) => `${translateWordByWord(match[1], dictionaries.hi)} fingga`,
  },
  {
    from: 'hi',
    to: 'grt',
    regex: /^मुझे (.+) चाहिए$/,
    handler: (match) => `nga se ${translateWordByWord(match[1], dictionaries.hi)}`,
  },
  {
    from: 'grt',
    to: 'en',
    regex: /^(.+) fingga$/,
    handler: (match) => `where is ${translateWordByWord(match[1], dictionaries.grtToEn)}`,
  },
  {
    from: 'grt',
    to: 'hi',
    regex: /^(.+) fingga$/,
    handler: (match) => `${translateWordByWord(match[1], dictionaries.grtToHi)} कहाँ है`,
  },
];

function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,!?]+/g, '')
    .replace(/\s+/g, ' ');
}

function translatePhrase(text, from, to) {
  const normalized = normalizeText(text);
  if (phraseDictionary[from] && phraseDictionary[from][normalized]) {
    return phraseDictionary[from][normalized];
  }
  return null;
}

function translatePattern(text, from, to) {
  const normalized = normalizeText(text);
  const pattern = translationPatterns.find((item) => item.from === from && item.to === to && item.regex.test(normalized));
  if (!pattern) return null;
  const match = normalized.match(pattern.regex);
  return match ? pattern.handler(match) : null;
}

function translateWordByWord(text, dictionary) {
  const normalized = normalizeText(text);
  return normalized
    .split(' ')
    .map((word) => dictionary[word] ?? word)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectLanguage(text) {
  const normalized = normalizeText(text);
  if (/[ऀ-ॿ]/.test(text)) {
    return 'hi';
  }

  const words = normalized.split(' ').filter(Boolean);
  const counts = {
    grt: words.filter((word) => dictionaries.grtToEn[word] || dictionaries.grtToHi[word]).length,
    hi: words.filter((word) => dictionaries.hi[word]).length,
    en: words.filter((word) => dictionaries.en[word]).length,
  };

  if (counts.grt >= Math.max(counts.en, counts.hi) && counts.grt > 0) {
    return 'grt';
  }
  if (counts.hi > counts.en) {
    return 'hi';
  }
  return 'en';
}

export default function translateText(text, from, to) {
  if (!text || !text.trim()) return '';
  if (from === to) return text;

  const normalized = normalizeText(text);
  const phrase = translatePhrase(normalized, from, to);
  if (phrase) return phrase;

  const pattern = translatePattern(normalized, from, to);
  if (pattern) return pattern;

  if (from === 'en' && to === 'grt') {
    return translateWordByWord(normalized, dictionaries.en);
  }

  if (from === 'hi' && to === 'grt') {
    return translateWordByWord(normalized, dictionaries.hi);
  }

  if (from === 'grt' && to === 'en') {
    return translateWordByWord(normalized, dictionaries.grtToEn);
  }

  if (from === 'grt' && to === 'hi') {
    return translateWordByWord(normalized, dictionaries.grtToHi);
  }

  if (from !== 'grt' && to !== 'grt') {
    const intermediate = translateText(text, from, 'grt');
    return translateText(intermediate, 'grt', to);
  }

  return 'Translation unavailable for this language pair.';
}
