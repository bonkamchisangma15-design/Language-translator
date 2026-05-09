// Structured Garo lexical database for the A’chik language engine
// Uses categories, classifiers, morphology, and number generation

import Fuse from 'fuse.js';

const categoryHeaders = {
  'Fruits (Bite)': 'fruit',
  'Vegetables & Roots (Sam/Balong)': 'vegetable',
  'Emotions & Feelings (Chanchiani)': 'emotion',
  'Animals (Matburung)': 'animal',
  'Birds (Do·o)': 'bird',
  'Daily Verbs (Kam)': 'verb',
  'Family Members (Nokdang)': 'family',
  'Body Parts (Be·en)': 'body_part',
  'Colors (Rong)': 'color',
  'Numbers (Chananichi)': 'number',
  'Basic Phrases (Agangrikkani)': 'phrase',
  'Time & Seasons': 'time',
  'Time & Days (Somoi)': 'time',
  'Nature & Weather (A·gilsak)': 'nature',
  'Household Items (Nokni Bostu)': 'object',
  'Occupations & People (Kam Ka·giparang)': 'person',
  'Education & Learning (Skiani)': 'object',
  'Health & Medical (An·sengani)': 'object',
  'Daily Tools & Items (Bosturang)': 'object',
  'Clothing & Wearables (Gangkani)': 'object',
};

const classifierMap = {
  animal: 'Mang',
  bird: 'Mang',
  insect: 'Mang',
  fish: 'Mang',
  money: 'Gong',
  currency: 'Gong',
  person: 'Sak',
  family: 'Sak',
  book: 'King',
  paper: 'King',
  leaf: 'King',
  object: 'Ge',
  fruit: 'Ge',
  vegetable: 'Ge',
  emotion: 'Ge',
  body_part: 'Ge',
  color: 'Ge',
  number: 'Ge',
  phrase: 'Ge',
  verb: 'Ge',
  time: 'Ge',
};

const numberRoots = {
  1: 'sa',
  2: 'gni',
  3: 'gittam',
  4: 'bri',
  5: 'bonga',
  6: 'dok',
  7: 'sni',
  8: 'chet',
  9: 'sku',
  10: 'chiking',
  20: 'kolgrik',
  30: 'kolatchi',
  40: 'sotbri',
  50: 'sotbonga',
  60: 'sotdok',
  70: 'sotsni',
  80: 'sotchet',
  90: 'sotsku',
  100: 'ritchasa',
  1000: 'hajalsa',
};

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
};

function getCategoryFromHeader(header) {
  if (!header) return null;
  const trimmed = header.trim();
  if (categoryHeaders[trimmed]) return categoryHeaders[trimmed];

  const normalizedHeader = trimmed.toLowerCase();
  if (/animal|insect|bird|fish/.test(normalizedHeader)) return 'animal';
  if (/money|currency|coin/.test(normalizedHeader)) return 'money';
  if (/human|person|people|family|people/.test(normalizedHeader)) return 'person';
  if (/book|paper|leaf|cloth|thin|paper/.test(normalizedHeader)) return 'book';
  if (/fruit/.test(normalizedHeader)) return 'fruit';
  if (/vegetable|root/.test(normalizedHeader)) return 'vegetable';
  if (/emotion|feeling/.test(normalizedHeader)) return 'emotion';
  if (/body|part/.test(normalizedHeader)) return 'body_part';
  if (/time|season|day|night|month|year/.test(normalizedHeader)) return 'time';
  if (/number/.test(normalizedHeader)) return 'number';
  if (/verb|action/.test(normalizedHeader)) return 'verb';
  if (/color/.test(normalizedHeader)) return 'color';
  if (/phrase|greeting/.test(normalizedHeader)) return 'phrase';
  return 'object';
}

function getClassifier(categoryOrHeader) {
  if (!categoryOrHeader) return 'Ge';
  const category = classifierMap[categoryOrHeader]
    ? categoryOrHeader
    : getCategoryFromHeader(categoryOrHeader);
  return classifierMap[category] || 'Ge';
}

function parseCompoundGaro(garo) {
  const text = String(garo || '').trim();
  const tokens = text.split(/\s+/).filter(Boolean);
  const combined = tokens.join(' ');
  const rootToken = tokens.length ? tokens[0] : '';
  const segments = rootToken.split(/[-·]/).filter(Boolean);
  return {
    root: segments[0] || rootToken,
    modifiers: [...segments.slice(1), ...tokens.slice(1)],
    combined_form: combined,
  };
}

function buildNumber(value) {
  const number = Number(value);
  if (Number.isNaN(number) || number < 1) return null;
  if (numberRoots[number]) return numberRoots[number];
  if (number < 20) {
    return `chiking-${numberRoots[number - 10]}`;
  }
  if (number < 100) {
    const tens = Math.floor(number / 10) * 10;
    const unit = number % 10;
    return unit === 0 ? numberRoots[tens] : `${numberRoots[tens]}-${numberRoots[unit]}`;
  }
  if (number < 1000) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    const prefix = hundreds === 1 ? numberRoots[100] : `${numberRoots[100]}-${numberRoots[hundreds]}`;
    return remainder === 0 ? prefix : `${prefix}-${buildNumber(remainder)}`;
  }
  if (number === 1000) return numberRoots[1000];
  return String(number);
}

function normalizeText(text) {
  return String(text || '').trim().toLowerCase().replace(/[-\s]+/g, ' ').replace(/[?!.]/g, '');
}

function generateVariants(canonical) {
  const variants = [canonical];
  const words = canonical.split(/\s+/);
  if (words.length > 1) {
    variants.push(words.join('')); // joined
    variants.push(words.join('-')); // hyphenated
    variants.push(canonical.toUpperCase());
    variants.push(canonical.charAt(0).toUpperCase() + canonical.slice(1));
  }
  return variants;
}

function augmentEntry(entry) {
  const { root, modifiers, combined_form } = parseCompoundGaro(entry.garo);
  return {
    ...entry,
    hindi: entry.hindi || '',
    category: entry.category || getCategoryFromHeader(entry.english),
    classifier: entry.classifier || getClassifier(entry.category || entry.english),
    root: entry.root || root,
    modifiers: entry.modifiers && entry.modifiers.length ? entry.modifiers : modifiers,
    combined_form: entry.combined_form || combined_form,
  };
}

class Dictionary {
  constructor(initialEntries = []) {
    this.entries = [];
    this.canonicalMap = new Map();
    this.variantMap = new Map();
    this.fuzzyIndex = null;
    this.garoMap = new Map();
    this.hindiMap = new Map();
    initialEntries.forEach(entry => this.addEntry(entry));
  }

  addEntry(entry) {
    const augmented = augmentEntry(entry);
    this.entries.push(augmented);
    const canonical = normalizeText(augmented.english);
    this.canonicalMap.set(canonical, augmented);
    const variants = generateVariants(canonical);
    variants.forEach(variant => {
      this.variantMap.set(normalizeText(variant), canonical);
    });
    if (augmented.garo) {
      this.garoMap.set(normalizeText(augmented.garo), augmented);
    }
    if (augmented.hindi) {
      this.hindiMap.set(normalizeText(augmented.hindi), augmented);
    }
    this.rebuildFuzzyIndex();
  }

  rebuildFuzzyIndex() {
    this.fuzzyIndex = new Fuse(this.entries, {
      keys: ['english'],
      threshold: 0.4,
      includeScore: true,
    });
  }

  searchEnglish(text) {
    const normalized = normalizeText(text);
    // 1. exact match
    if (this.canonicalMap.has(normalized)) {
      return this.canonicalMap.get(normalized);
    }
    // 2. canonical match (variant)
    if (this.variantMap.has(normalized)) {
      const canonical = this.variantMap.get(normalized);
      return this.canonicalMap.get(canonical);
    }
    // 3. fuzzy match
    if (this.fuzzyIndex) {
      const results = this.fuzzyIndex.search(normalized);
      if (results.length && results[0].score < 0.4) {
        return results[0].item;
      }
    }
    // 4. semantic, morphology, AI fallback - TODO
    return null;
  }

  searchGaro(text) {
    const normalized = normalizeText(text);
    return this.garoMap.get(normalized) || null;
  }

  searchHindi(text) {
    const normalized = normalizeText(text);
    return this.hindiMap.get(normalized) || null;
  }

  getAllEntries() {
    return this.entries;
  }
}

const rawGaroEntries = [
  { english: 'pineapple', garo: 'anaros', category: 'fruit', classifier: getClassifier('fruit'), root: 'anaros', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'banana', garo: 'boldug', category: 'fruit', classifier: getClassifier('fruit'), root: 'boldug', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'orange', garo: 'narang', category: 'fruit', classifier: getClassifier('fruit'), root: 'narang', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'guava', garo: 'goaba', category: 'fruit', classifier: getClassifier('fruit'), root: 'goaba', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'papaya', garo: 'modu', category: 'fruit', classifier: getClassifier('fruit'), root: 'modu', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'jackfruit', garo: 'te·brong', category: 'fruit', classifier: getClassifier('fruit'), root: 'te·brong', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'mango', garo: 'am', category: 'fruit', classifier: getClassifier('fruit'), root: 'am', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'lychee', garo: 'letchu', category: 'fruit', classifier: getClassifier('fruit'), root: 'letchu', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'coconut', garo: 'narikel', category: 'fruit', classifier: getClassifier('fruit'), root: 'narikel', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'watermelon', garo: 'te·e raja', category: 'fruit', classifier: getClassifier('fruit'), root: 'te·e', modifiers: ['raja'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'lemon', garo: 'kakji', category: 'fruit', classifier: getClassifier('fruit'), root: 'kakji', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pomegranate', garo: 'dalim', category: 'fruit', classifier: getClassifier('fruit'), root: 'dalim', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sugar cane', garo: 'ge·rit', category: 'fruit', classifier: getClassifier('fruit'), root: 'ge·rit', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'tamarind', garo: 'che·eng', category: 'fruit', classifier: getClassifier('fruit'), root: 'che·eng', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pear', garo: 'naspati', category: 'fruit', classifier: getClassifier('fruit'), root: 'naspati', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'custard apple', garo: 'atapol', category: 'fruit', classifier: getClassifier('fruit'), root: 'atapol', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pomelo', garo: 'narang-gira', category: 'fruit', classifier: getClassifier('fruit'), root: 'narang', modifiers: ['gira'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'blackberry', garo: 'jam', category: 'fruit', classifier: getClassifier('fruit'), root: 'jam', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'grapes', garo: 'drakka', category: 'fruit', classifier: getClassifier('fruit'), root: 'drakka', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'wild berry', garo: 'bol-meseng', category: 'fruit', classifier: getClassifier('fruit'), root: 'bol', modifiers: ['meseng'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pumpkin', garo: 'gominda', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'gominda', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'potato', garo: 'alu', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'alu', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'tomato', garo: 'baring belati', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'baring', modifiers: ['belati'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'brinjal', garo: 'baring', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'baring', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'bottle gourd', garo: 'lau', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'lau', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'bitter gourd', garo: 'karela', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'karela', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'bamboo shoot', garo: 'me·a', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'me·a', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'garlic', garo: 'rasin gipok', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'rasin', modifiers: ['gipok'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'ginger', garo: 're·ching', category: 'vegetable', classifier: getClassifier('vegetable'), root: 're·ching', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'chilli', garo: 'jal·ik', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'jal·ik', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'okra', garo: 'dorai', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'dorai', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'cucumber', garo: 'te·e', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'te·e', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'mustard leaves', garo: 'besual', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'besual', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'spinach', garo: 'palong-sam', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'palong', modifiers: ['sam'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'broad beans', garo: 'nakap', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'nakap', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'yam', garo: 'ta·a', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'ta·a', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sweet potato', garo: 'ta·we', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'ta·we', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'colocasia', garo: 'thabisa', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'thabisa', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'onion', garo: 'rasin', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'rasin', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'cabbage', garo: 'kobi', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'kobi', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'cauliflower', garo: 'pul kobi', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'pul', modifiers: ['kobi'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'carrot', garo: 'kajol', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'kajol', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'radish', garo: 'mula', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'mula', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'drumstick', garo: 'sojona', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'sojona', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'peas', garo: 'motor', category: 'vegetable', classifier: getClassifier('vegetable'), root: 'motor', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'love', garo: 'ka·saa', category: 'emotion', classifier: getClassifier('emotion'), root: 'ka·saa', modifiers: [], tense_forms: {}, examples: ['Anga nangna ka·saa'], dialect: '', source: '' },
  { english: 'happiness', garo: 'kusi', category: 'emotion', classifier: getClassifier('emotion'), root: 'kusi', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sadness', garo: 'duk', category: 'emotion', classifier: getClassifier('emotion'), root: 'duk', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'anger', garo: 'ka·o nanga', category: 'emotion', classifier: getClassifier('emotion'), root: 'ka·o', modifiers: ['nanga'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'fear', garo: 'kenani', category: 'emotion', classifier: getClassifier('emotion'), root: 'kenani', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hatred', garo: 'mittera', category: 'emotion', classifier: getClassifier('emotion'), root: 'mittera', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hope', garo: 'ka·donga', category: 'emotion', classifier: getClassifier('emotion'), root: 'ka·donga', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'peace', garo: 'tom·toma', category: 'emotion', classifier: getClassifier('emotion'), root: 'tom·toma', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'trust', garo: 'bebe ra·a', category: 'emotion', classifier: getClassifier('emotion'), root: 'bebe', modifiers: ['ra·a'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'jealousy', garo: 'mikboka', category: 'emotion', classifier: getClassifier('emotion'), root: 'mikboka', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'shame', garo: 'kracha·a', category: 'emotion', classifier: getClassifier('emotion'), root: 'kracha·a', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pride', garo: 'gaora', category: 'emotion', classifier: getClassifier('emotion'), root: 'gaora', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'surprise', garo: 'jagokani', category: 'emotion', classifier: getClassifier('emotion'), root: 'jagokani', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'worry', garo: 'gisik ding·a', category: 'emotion', classifier: getClassifier('emotion'), root: 'gisik', modifiers: ['ding·a'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'patience', garo: 'chakchikani', category: 'emotion', classifier: getClassifier('emotion'), root: 'chakchikani', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'mercy', garo: 'kema', category: 'emotion', classifier: getClassifier('emotion'), root: 'kema', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'satisfaction', garo: 'chu·ongnika', category: 'emotion', classifier: getClassifier('emotion'), root: 'chu·ongnika', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'loneliness', garo: 'saksan', category: 'emotion', classifier: getClassifier('emotion'), root: 'saksan', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'grateful', garo: 'mitela', category: 'emotion', classifier: getClassifier('emotion'), root: 'mitela', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'courage', garo: 'ka·rakani', category: 'emotion', classifier: getClassifier('emotion'), root: 'ka·rakani', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'dog', garo: 'achak', category: 'animal', classifier: getClassifier('animal'), root: 'achak', modifiers: [], tense_forms: {}, examples: ['The dog bit me → Achak angko dakaha'], dialect: '', source: '' },
  { english: 'cat', garo: 'menggo', category: 'animal', classifier: getClassifier('animal'), root: 'menggo', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'cow', garo: 'matchu', category: 'animal', classifier: getClassifier('animal'), root: 'matchu', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'elephant', garo: 'mong', category: 'animal', classifier: getClassifier('animal'), root: 'mong', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'tiger', garo: 'matcha', category: 'animal', classifier: getClassifier('animal'), root: 'matcha', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'deer', garo: 'matchok', category: 'animal', classifier: getClassifier('animal'), root: 'matchok', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pig', garo: 'wak', category: 'animal', classifier: getClassifier('animal'), root: 'wak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pork', garo: 'wak', category: 'animal', classifier: getClassifier('animal'), root: 'wak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'goat', garo: 'do·bok', category: 'animal', classifier: getClassifier('animal'), root: 'do·bok', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'horse', garo: 'gure', category: 'animal', classifier: getClassifier('animal'), root: 'gure', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'monkey', garo: 'makre', category: 'animal', classifier: getClassifier('animal'), root: 'makre', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'snake', garo: 'chipu', category: 'animal', classifier: getClassifier('animal'), root: 'chipu', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'rat', garo: 'mese', category: 'animal', classifier: getClassifier('animal'), root: 'mese', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'buffalo', garo: 'matma', category: 'animal', classifier: getClassifier('animal'), root: 'matma', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'bear', garo: 'matmak', category: 'animal', classifier: getClassifier('animal'), root: 'matmak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'rabbit', garo: 'sapau', category: 'animal', classifier: getClassifier('animal'), root: 'sapau', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'crow', garo: 'do·ka', category: 'bird', classifier: getClassifier('bird'), root: 'do·ka', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hen', garo: 'do·bit', category: 'bird', classifier: getClassifier('bird'), root: 'do·bit', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'rooster', garo: 'do·bi', category: 'bird', classifier: getClassifier('bird'), root: 'do·bi', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'duck', garo: 'do·gep', category: 'bird', classifier: getClassifier('bird'), root: 'do·gep', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'owl', garo: 'do·po', category: 'bird', classifier: getClassifier('bird'), root: 'do·po', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'eagle', garo: 'do·reng', category: 'bird', classifier: getClassifier('bird'), root: 'do·reng', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'parrot', garo: 'do·sik', category: 'bird', classifier: getClassifier('bird'), root: 'do·sik', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'pigeon', garo: 'do·bak', category: 'bird', classifier: getClassifier('bird'), root: 'do·bak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'peacock', garo: 'do·de', category: 'bird', classifier: getClassifier('bird'), root: 'do·de', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sparrow', garo: 'do·matchi', category: 'bird', classifier: getClassifier('bird'), root: 'do·matchi', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'eat', garo: 'cha·a', category: 'verb', classifier: getClassifier('verb'), root: 'cha·a', modifiers: [], tense_forms: { present: 'cha·enga', past: 'cha·aha', future: 'cha·gen', negative: 'cha·jawa' }, examples: ['Anga mi cha·enga'], dialect: '', source: '' },
  { english: 'drink', garo: 'ringa', category: 'verb', classifier: getClassifier('verb'), root: 'ring', modifiers: [], tense_forms: { present: 'ringa', past: 'ringaha', future: 'ringgen', negative: 'ringjawa' }, examples: ['Ua chi ringa'], dialect: '', source: '' },
  { english: 'sleep', garo: 'tusia', category: 'verb', classifier: getClassifier('verb'), root: 'tusi', modifiers: [], tense_forms: { present: 'tusienga', past: 'tusia', future: 'tusigen', negative: 'tusijawa' }, examples: ['Bi·sa tusienga'], dialect: '', source: '' },
  { english: 'walk', garo: 're·a', category: 'verb', classifier: getClassifier('verb'), root: 're·a', modifiers: [], tense_forms: { present: 're·aenga', past: 're·aha', future: 're·agen', negative: 're·ajawa' }, examples: [], dialect: '', source: '' },
  { english: 'run', garo: 'kat-a', category: 'verb', classifier: getClassifier('verb'), root: 'kat', modifiers: [], tense_forms: { present: 'katenga', past: 'kata', future: 'katgen', negative: 'katjawa' }, examples: ['Ua rakki kata'], dialect: '', source: '' },
  { english: 'speak', garo: 'agana', category: 'verb', classifier: getClassifier('verb'), root: 'agan', modifiers: [], tense_forms: { present: 'aganenga', past: 'aganaha', future: 'agangen', negative: 'aganjawa' }, examples: [], dialect: '', source: '' },
  { english: 'listen', garo: 'knachika', category: 'verb', classifier: getClassifier('verb'), root: 'knachik', modifiers: [], tense_forms: { present: 'knachikenga', past: 'knachikaha', future: 'knachikgen', negative: 'knachikjawa' }, examples: [], dialect: '', source: '' },
  { english: 'see', garo: 'nika', category: 'verb', classifier: getClassifier('verb'), root: 'nik', modifiers: [], tense_forms: { present: 'nikenga', past: 'nika', future: 'nikgen', negative: 'nikjawa' }, examples: [], dialect: '', source: '' },
  { english: 'give', garo: 'on·a', category: 'verb', classifier: getClassifier('verb'), root: 'on', modifiers: [], tense_forms: { present: 'on·enga', past: 'on·aha', future: 'on·gen', negative: 'on·jawa' }, examples: [], dialect: '', source: '' },
  { english: 'take', garo: 'ra·a', category: 'verb', classifier: getClassifier('verb'), root: 'ra', modifiers: [], tense_forms: { present: 'ra·enga', past: 'ra·aha', future: 'ra·gen', negative: 'ra·jawa' }, examples: [], dialect: '', source: '' },
  { english: 'work', garo: 'dak-a', category: 'verb', classifier: getClassifier('verb'), root: 'dak', modifiers: [], tense_forms: { present: 'dakenga', past: 'dakaha', future: 'dakgen', negative: 'dakjawa' }, examples: [], dialect: '', source: '' },
  { english: 'play', garo: 'kal·a', category: 'verb', classifier: getClassifier('verb'), root: 'kal', modifiers: [], tense_forms: { present: 'kalenga', past: 'kalaha', future: 'kalgen', negative: 'kaljawa' }, examples: [], dialect: '', source: '' },
  { english: 'sit', garo: 'asong-a', category: 'verb', classifier: getClassifier('verb'), root: 'asong', modifiers: [], tense_forms: { present: 'asongenga', past: 'asongaha', future: 'asonggen', negative: 'asongjawa' }, examples: [], dialect: '', source: '' },
  { english: 'stand', garo: 'chadenga', category: 'verb', classifier: getClassifier('verb'), root: 'chadeng', modifiers: [], tense_forms: { present: 'chadengenga', past: 'chadengaha', future: 'chadenggen', negative: 'chadengjawa' }, examples: [], dialect: '', source: '' },
  { english: 'laugh', garo: 'ka·ding-a', category: 'verb', classifier: getClassifier('verb'), root: 'ka·ding', modifiers: [], tense_forms: { present: 'ka·dingenga', past: 'ka·dingaha', future: 'ka·dinggen', negative: 'ka·dingjawa' }, examples: [], dialect: '', source: '' },
  { english: 'cry', garo: 'grap-a', category: 'verb', classifier: getClassifier('verb'), root: 'grap', modifiers: [], tense_forms: { present: 'grapenga', past: 'grapaha', future: 'grapgen', negative: 'grapjawa' }, examples: [], dialect: '', source: '' },
  { english: 'buy', garo: 'brea', category: 'verb', classifier: getClassifier('verb'), root: 'bre', modifiers: [], tense_forms: { present: 'breenga', past: 'breaha', future: 'bregen', negative: 'brejawa' }, examples: [], dialect: '', source: '' },
  { english: 'sell', garo: 'pala', category: 'verb', classifier: getClassifier('verb'), root: 'pal', modifiers: [], tense_forms: { present: 'palenga', past: 'palaha', future: 'palgen', negative: 'paljawa' }, examples: [], dialect: '', source: '' },
  { english: 'come', garo: 're·ba-a', category: 'verb', classifier: getClassifier('verb'), root: 're·ba', modifiers: ['a'], tense_forms: { present: 're·baenga', past: 're·baaha', future: 're·bagen', negative: 're·bajawa' }, examples: [], dialect: '', source: '' },
  { english: 'go', garo: 're·ang-a', category: 'verb', classifier: getClassifier('verb'), root: 're·ang', modifiers: ['a'], tense_forms: { present: 're·angenga', past: 're·angaha', future: 're·anggen', negative: 're·angjawa' }, examples: [], dialect: '', source: '' },
  { english: 'father', garo: 'pa', category: 'family', classifier: getClassifier('family'), root: 'pa', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'mother', garo: 'ma', category: 'family', classifier: getClassifier('family'), root: 'ma', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'son', garo: 'de-bi-pa', category: 'family', classifier: getClassifier('family'), root: 'de', modifiers: ['bi','pa'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'daughter', garo: 'de-me-chik', category: 'family', classifier: getClassifier('family'), root: 'de', modifiers: ['me','chik'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'grandfather', garo: 'abi-tang', category: 'family', classifier: getClassifier('family'), root: 'abi', modifiers: ['tang'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'grandmother', garo: 'ambichang', category: 'family', classifier: getClassifier('family'), root: 'ambi', modifiers: ['chang'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'elder brother', garo: 'ada', category: 'family', classifier: getClassifier('family'), root: 'ada', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'elder sister', garo: 'abi', category: 'family', classifier: getClassifier('family'), root: 'abi', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'younger sibling', garo: 'jong', category: 'family', classifier: getClassifier('family'), root: 'jong', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'uncle', garo: 'mama', category: 'family', classifier: getClassifier('family'), root: 'mama', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'aunt', garo: 'mani', category: 'family', classifier: getClassifier('family'), root: 'mani', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'friend', garo: 'ripeng', category: 'family', classifier: getClassifier('family'), root: 'ripeng', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'people', garo: 'mande', category: 'person', classifier: getClassifier('person'), root: 'mande', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'person', garo: 'mande', category: 'person', classifier: getClassifier('person'), root: 'mande', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'head', garo: 'sko', category: 'body_part', classifier: getClassifier('body_part'), root: 'sko', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'eye', garo: 'mikron', category: 'body_part', classifier: getClassifier('body_part'), root: 'mikron', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'ear', garo: 'nachil', category: 'body_part', classifier: getClassifier('body_part'), root: 'nachil', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'nose', garo: 'gingting', category: 'body_part', classifier: getClassifier('body_part'), root: 'gingting', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'mouth', garo: 'ku·sik', category: 'body_part', classifier: getClassifier('body_part'), root: 'ku·sik', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hand', garo: 'jak', category: 'body_part', classifier: getClassifier('body_part'), root: 'jak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'leg', garo: 'ja·a', category: 'body_part', classifier: getClassifier('body_part'), root: 'ja·a', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hair', garo: 'kni', category: 'body_part', classifier: getClassifier('body_part'), root: 'kni', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'stomach', garo: 'ok', category: 'body_part', classifier: getClassifier('body_part'), root: 'ok', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'teeth', garo: 'wagatchik', category: 'body_part', classifier: getClassifier('body_part'), root: 'wagatchik', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'tongue', garo: 'sre', category: 'body_part', classifier: getClassifier('body_part'), root: 'sre', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'skin', garo: 'bigil', category: 'body_part', classifier: getClassifier('body_part'), root: 'bigil', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'heart', garo: 'ka·tong', category: 'body_part', classifier: getClassifier('body_part'), root: 'ka·tong', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'red', garo: 'gitchak', category: 'color', classifier: getClassifier('color'), root: 'gitchak', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'white', garo: 'gipok', category: 'color', classifier: getClassifier('color'), root: 'gipok', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'black', garo: 'gisim', category: 'color', classifier: getClassifier('color'), root: 'gisim', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'green', garo: 'tangsek', category: 'color', classifier: getClassifier('color'), root: 'tangsek', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'blue', garo: 'tang-sim', category: 'color', classifier: getClassifier('color'), root: 'tang', modifiers: ['sim'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'yellow', garo: 'rimit', category: 'color', classifier: getClassifier('color'), root: 'rimit', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'one', garo: 'sa', category: 'number', classifier: getClassifier('number'), root: 'sa', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'two', garo: 'gni', category: 'number', classifier: getClassifier('number'), root: 'gni', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'three', garo: 'gittam', category: 'number', classifier: getClassifier('number'), root: 'gittam', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'four', garo: 'bri', category: 'number', classifier: getClassifier('number'), root: 'bri', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'five', garo: 'bonga', category: 'number', classifier: getClassifier('number'), root: 'bonga', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'six', garo: 'dok', category: 'number', classifier: getClassifier('number'), root: 'dok', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'seven', garo: 'sni', category: 'number', classifier: getClassifier('number'), root: 'sni', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'eight', garo: 'chet', category: 'number', classifier: getClassifier('number'), root: 'chet', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'nine', garo: 'sku', category: 'number', classifier: getClassifier('number'), root: 'sku', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'ten', garo: 'chiking', category: 'number', classifier: getClassifier('number'), root: 'chiking', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'book', garo: 'ki·tap', category: 'book', classifier: getClassifier('book'), root: 'ki·tap', modifiers: [], tense_forms: {}, examples: ['Chiking King lekka'], dialect: '', source: '' },
  { english: 'paper', garo: 'lekka', category: 'book', classifier: getClassifier('book'), root: 'lekka', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'money', garo: 'tangka', category: 'money', classifier: getClassifier('money'), root: 'tangka', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'coin', garo: 'tangka-bisil', category: 'money', classifier: getClassifier('money'), root: 'tangka', modifiers: ['bisil'], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'hello', garo: 'salam', category: 'phrase', classifier: getClassifier('phrase'), root: 'salam', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'how are you?', garo: 'na·a namengama?', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'i am fine', garo: 'anga namenga.', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'thank you', garo: 'mitela.', category: 'phrase', classifier: getClassifier('phrase'), root: 'mitela', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'what is your name?', garo: 'na·ani bimungara maia?', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'my name is...', garo: 'angni bimungara...', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'where are you going?', garo: 'na·a bano re·angenga?', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'good morning', garo: 'pring-nam.', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'good night', garo: 'wal-nam.', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'yes', garo: 'oe', category: 'phrase', classifier: getClassifier('phrase'), root: 'oe', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'no', garo: 'ong·ja', category: 'phrase', classifier: getClassifier('phrase'), root: 'ong·ja', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'please', garo: 'ka·sapae', category: 'phrase', classifier: getClassifier('phrase'), root: 'ka·sapae', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: "i don't know", garo: 'anga u·ija', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'come here', garo: 'iano re·ba', category: 'phrase', classifier: getClassifier('phrase'), root: '', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'chicken', garo: 'do·u', category: 'animal', classifier: getClassifier('animal'), root: 'do·u', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sun', garo: 'sal', category: 'object', classifier: getClassifier('object'), root: 'sal', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'god', garo: 'gitil', category: 'person', classifier: getClassifier('person'), root: 'gitil', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'sky', garo: 'salanti', category: 'object', classifier: getClassifier('object'), root: 'salanti', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
  { english: 'moon', garo: 'chiring', category: 'object', classifier: getClassifier('object'), root: 'chiring', modifiers: [], tense_forms: {}, examples: [], dialect: '', source: '' },
];

const dictionary = new Dictionary(rawGaroEntries);

// For backward compatibility
const garoEntries = dictionary.getAllEntries();

function singularizeEnglish(word) {
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ches') || word.endsWith('shes') || word.endsWith('xes') || word.endsWith('ses') || word.endsWith('zes') || word.endsWith('ges') || word.endsWith('oes')) {
    return word.slice(0, -1);
  }
  if (word.endsWith('es')) return word.slice(0, -2);
  if (word.endsWith('s')) return word.slice(0, -1);
  return word;
}

function getEntryByEnglish(english) {
  return dictionary.searchEnglish(english);
}

function getEntryByGaro(garo) {
  return dictionary.searchGaro(garo);
}

function parseNumberFromToken(token) {
  const numeric = Number(token);
  if (!Number.isNaN(numeric)) return numeric;
  return numberWords[token] || null;
}

function translateNumberedPhrase(text) {
  const normalized = normalizeText(text);
  const numberWordPattern = Object.keys(numberWords).join('|');
  const match = normalized.match(new RegExp(`^(\\d+|${numberWordPattern})\\s+(.+)$`));
  if (!match) return null;
  const countSource = match[1];
  const nounPhrase = match[2];
  const count = parseNumberFromToken(countSource);
  if (!count) return null;
  const entry = getEntryByEnglish(nounPhrase);
  if (!entry) return null;
  const numberWord = buildNumber(count);
  const classifier = getClassifier(entry.category);
  return `${classifier} ${numberWord} ${entry.garo}`;
}

export {
  dictionary,
  garoEntries,
  categoryHeaders,
  classifierMap,
  getCategoryFromHeader,
  getClassifier,
  buildNumber,
  getEntryByEnglish,
  getEntryByGaro,
  translateNumberedPhrase,
};
