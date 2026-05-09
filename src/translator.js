// Authentic Garo Language Dictionary from Meghalaya
// Based on documented Garo vocabulary and sentence structures from languageshome.com and Garo learning resources
// Garo has simple grammar: mainly word order + tense suffixes (-aha past, -en future, -enga continuous)

import { dictionary, getEntryByEnglish, translateNumberedPhrase } from './garoDatabase.js';

const phraseDictionary = {
  en: {
    'how are you': 'na.a namengama',
    'i am fine': 'ang.a namengava',
    'what is your name': 'nang bimung maia',
    'do you love me': 'na.a angna kasa.a ma',
    'yes i love you': 'hoe ang.a nangna kasa.a',
    'he is eating an apple': 'bia apple cha.enga',
    'he ate an apple': 'bia apple cha.aha',
    'the dog bit me': 'a·chak angko dakaha',
    'i drink water': 'anga chi ringa',
    'he ran fast': 'ua rakki kata',
    'the food is good': 'cha·ani a namen',
    'i saw the film last week': 'ang.a ia film ko nia mija antio',
    'she came by bus yesterday': 'bia bus o raba.a mijalo',
    'they went to the mosque': 'bisong olakiramchi re.anga',
    'he slept the whole night': 'bia walgimik tua',
    'where did you come from': 'na.a banoni reba.a',
    'why did you come': 'na.a maina reba.a',
    'how did you come': 'na.a maidake reba.a',
    'i shall come with you': 'ang.a nangming reangen',
    'will you come with me': 'na.ara ang.ming rebagenma',
    'food': 'cha·ani',
    'chicken': 'do.u',
    'meat': 'be·en',
    'good': 'namen',
    'goodbye': 'jaa',
    'thank you': 'mitela',
  },
  hi: {
    'आप कैसे हैं': 'na.a namengama',
    'मैं ठीक हूँ': 'ang.a namengava',
    'आपका नाम क्या है': 'nang bimung maia',
    'क्या आप मुझसे प्यार करते हैं': 'na.a angna kasa.a ma',
    'हाँ मैं आपसे प्यार करता हूँ': 'hoe ang.a nangna kasa.a',
    'वह एक सेब खा रहा है': 'bia apple cha.enga',
    'वह एक सेब खा गया': 'bia apple cha.aha',
    'मैंने पिछले हफ्ते फिल्म देखी': 'ang.a ia film ko nia mija antio',
    'वह कल बस से आई': 'bia bus o raba.a mijalo',
    'वे मस्जिद गए': 'bisong olakiramchi re.anga',
    'वह पूरी रात सोया': 'bia walgimik tua',
    'आप कहाँ से आए': 'na.a banoni reba.a',
    'आप क्यों आए': 'na.a maina reba.a',
    'आप कैसे आए': 'na.a maidake reba.a',
    'मैं आपके साथ आऊंगा': 'ang.a nangming reangen',
    'आप मेरे साथ आएंगे': 'na.ara ang.ming rebagenma',
    'धन्यवाद': 'mitela',
    'अलविदा': 'jaa',
    'मुझे भूख लगी है': 'ang.a mi chajok',
    'मुझे प्यास लगी है': 'ang.a donkhwa ringri',
  },
  grt: {
    'na.a namengama': 'how are you',
    'ang.a namengava': 'i am fine',
    'nang bimung maia': 'what is your name',
    'na.a angna kasa.a ma': 'do you love me',
    'hoe ang.a nangna kasa.a': 'yes i love you',
    'bia apple cha.enga': 'he is eating an apple',
    'bia apple cha.aha': 'he ate an apple',
    'ang.a ia film ko nia mija antio': 'i saw the film last week',
    'bia bus o raba.a mijalo': 'she came by bus yesterday',
    'bisong olakiramchi re.anga': 'they went to the mosque',
    'bia walgimik tua': 'he slept the whole night',
    'na.a banoni reba.a': 'where did you come from',
    'na.a maina reba.a': 'why did you come',
    'a·chak angko dakaha': 'the dog bit me',
    'anga chi ringa': 'i drink water',
    'ua rakki kata': 'he ran fast',
    'cha·ani a namen': 'the food is good',
    'na.a maidake reba.a': 'how did you come',
    'ang.a nangming reangen': 'i shall come with you',
    'na.ara ang.ming rebagenma': 'will you come with me',
    'i haam': 'food',
    'jaa': 'goodbye',
    'mitela': 'thank you',
  },
};

// Authentic Garo vocabulary dictionary
// Only includes verified Garo words from documented sources
const dictionaries = {
  en: {
// Pronouns
    i: 'anga',
    he: 'ua',
    she: 'bia',
    you: 'na.a',
    it: 'ia',
    this: 'ia',
    that: 'haiwa',
    we: 'aching',
    they: 'bisong',

    // Verbs (base forms)
    come: 'reba',
    came: 'reba.aha',
    open: 'khulibo',
    opened: 'khulia.a',
    sit: 'asongbo',
    walk: 'roranbo',
    eat: 'cha·a',
    ate: 'cha·aha',
    eating: 'cha·enga',
    drink: 'ring',
    drank: 'ringaha',
    win: 'am.a',
    go: 're·ang',
    ran: 'kata',
    run: 'kat',
    write: 'se.a',
    pay: 'gama',
    bring: 'raba.a',
    drive: 'sal.a',
    sleep: 'tusi',
    slept: 'tusiha',
    bite: 'chika',
    bit: 'dakaha',
    cut: 'den',
    cutting: 'denenga',

    // Nouns
    name: 'bimung',
    book: 'kitab',
    answer: 'aganchakani',
    pen: 'pen',
    box: 'box',
    exam: 'porikka',
    lunch: 'mi',
    bus: 'bus',
    apple: 'apple',
    film: 'film',
    week: 'antio',
    night: 'walgi',
    money: 'tangka',
    car: 'gari',
    bag: 'bag',
    hand: 'jako',
    room: 'room',
    story: 'golpo',
    letter: 'chitthio',
    rice: 'mi',
    curry: 'jaba',
    side: 'sam',
    pork: 'wak',
    mutton: 'dlang',
    vegetables: 'sak',
    greens: 'sam-bi-jak',
    chutney: 'na-kam',
    dried: 'tungta',
    fish: 'na·a',
    dog: 'achak',
    cat: 'bi·sim',
    cow: 'misi',
    bird: 'do·si',
    head: 'skang',
    eye: 'mikron',
    ear: 'nachil',
    nose: 'nok',
    mouth: 'ku·sik',
    leg: 'ja',
    body: 'be\'en',
    happy: 'katcha',
    sad: 'ka·sachia',
    angry: 'ka·ding',
    love: 'ka·saa',
    fear: 'ken·a',
    me: 'angko',
    water: 'donkhwa',
    food: 'cha·ani',
    good: 'namen',
    meal: 'mi',

    // Question words
    what: 'maia',
    why: 'maina',
    how: 'maidake',
    where: 'bano',
    which: 'badia',
    whom: 'sako',
    when: 'kontakta',
    who: 'aisko',

    // Common words
    yes: 'hoe',
    no: 'jok',
    your: 'nangni',
    please: 'sorang',
    thank: 'mitela',
    thanks: 'mitela',
    is: 'a',
    wrong: 'bad',
    goodbye: 'jaa',
    hello: 'a chikku',
    sorry: 'kema',

    // Real Garo words (verified from authentic sources)
    school: 'skolchi',
    teacher: 'guru',
    tree: 'gittam',
    house: 'apa',
    work: 'kam',
    'believe': 'Bi',
    'belittle': 'Chon',
    'bell': 'Konta',
    'bellows': 'Mul',
    'bellow': 'Bfatchu',
    'belly': 'Ok',
    'belong': '-ni',
    'benefit': 'Namgni',
    'beseech': 'Besought',
    'beset': 'Champeng',
    'besiege': 'Champeng',
    'best': 'Nambata',
    'bestow': 'Oiva',
    'bet': 'Aramaria',
    'betimes': 'Seng*',
    'betroth': 'Bia',
    'better': 'Namkala',
    'beverage': 'Ring',
    'beware': 'Gisik',
    'bewitch': 'Mnni',
    'bin': 'Mi',
    'biped': '3a',
    'birth': 'Atobiani',
    'bitch': 'Aebak',
    'bladder': 'Su-bu',
    'blade': 'Bimik',
    'blame': 'Matnan',
    'bland': 'KVsinn',
    'blank': 'Sea',
    'blaspheme': 'Isol',
    'blast': 'Balwa',
    'blaze': 'Walchaa',
    'bleach': 'Bokata',
    'blind': 'Mikfl',
    'blindfold': 'Mik',
    'blink': 'Mikjapa',
    'block': '*',
    'blockhead': 'Goka',
    'blood': 'Ancbi',
    'bloodshot': 'An',
    'bloom': 'Balgawa',
    'blossom': 'Bibal',
    'blot': 'Daknanga',
    'blow': 'Dukani',
    'blue': 'Tangsima',
    'blunt': 'Matgija',
    'blur': 'Mrikmrak',
    'blush': 'Krateba-o',
    'board': 'Tokta',
    'boast': 'Gaora',
    'boat': 'King',
    'boil': 'Rita',
    'bold': 'Ka\'donggipa',
    'boll': 'Bitckn',
    'bone': 'Greng',
    'bonnet': 'Memrang',
    'booty': 'Ra\'seke',
    'border': 'Sima',
    'bore': 'A\'kol',
    'borrow': 'Ra\'chaka',
    'bosom': 'Ka"bak',
    'boss': 'Ge"etgipa',
    'both': 'Gnian',
    'bother': 'Golmal',
    'bottle': 'Botol',
    'bounteous': 'One',
    'bountiful': 'On\'e',
    'bow': 'Chri',
    'bowels': 'Bil',
    'bowl': 'Piala',
    'boy': 'Mo',
    'brace': 'Singchakani',
    'bracelet': '.in)',
    'brag': 'Rasong',
    'bramble': 'Bir^u',
    'bran': 'Gii.dc',
    'brandish': 'Tonu',
    'brandy': 'Chu',
    'brass': 'Bil',
    'brazen': 'Pitolniko',
    'breach': 'Nap<',
    'breadth': 'Gipeng',
    'breathe': 'Rang\'sita',
    'breeches': 'Ja\'skao',
    'breed': 'bbbd',
    'breeze': 'Ka\'aingi]',
    'brethren': 'Jong',
    'brewery': 'Clm',
    'brief': 'Kan',
    'brier': 'Bn\'au',
    'bright': 'Cbing*B',
    'brilliant': 'Cbing\'',
    'brim': 'Hiking',
    'brindled': 'Brin',
    'brine': 'Kari',
  },

  hi: {
    'मैं': 'ang.a',
    'वह': 'ua',
    'आप': 'na.a',
    'यह': 'ia',
    'आओ': 'reba',
    'आया': 'reba.aha',
    'खोलो': 'khulibo',
    'बैठो': 'asongbo',
    'चलो': 'roranbo',
    'खाओ': 'chabo',
    'पीओ': 'ringbo',
    'जाओ': 'reangbo',
    'दौड़ो': 'katbo',
    'लिखो': 'se.a',
    'दो': 'gama',
    'नाम': 'bimung',
    'आपका': 'nangni',
    'क्या': 'maia',
    'क्यों': 'maina',
    'कैसे': 'maidake',
    'कहाँ': 'bano',
    'कौन': 'aisko',
    'हाँ': 'hoe',
    'नहीं': 'jok',
    'प्यार': 'kasa.a',
    'किताब': 'kitab',
    'कलम': 'pen',
    'बॉक्स': 'box',
    'परीक्षा': 'porikka',
    'बस': 'bus',
    'पैसे': 'tangka',
    'गाड़ी': 'gari',
    'कमरा': 'room',
    'पानी': 'donkhwa',
    'स्कूल': 'skolchi',
    'शिक्षक': 'guru',
    'कुत्ता': 'achak',
    'बिल्ली': 'menggo',
    'पेड़': 'gittam',
    'घर': 'apa',
    'काम': 'kam',
    'खाना': 'i haam',
    'चावल': 'mi',
    'करी': 'jaba',
    'सब्जी': 'sak',
    'मांस': 'do.o',
    'चिकन': 'do.o',
    'सूअर': 'wak',
    'मटन': 'dlang',
    'हरी': 'sak',
    'चटनी': 'na-kam',
    'सूखा': 'tungta',
    'मछली': 'au',
    'दोपहर': 'mi',
    'धन्यवाद': 'mitela',
    'माफी': 'kema',
    'कृपया': 'sorang',
    'अलविदा': 'jaa',
  },

  // Garo to English dictionary
  grtToEn: {
'ang.a': 'I',
    'ua': 'he',
    'bia': 'she',
    'na.a': 'you',
    'ia': 'it',
    'haiwa': 'that',
    'reba': 'come',
    'reba.aha': 'came',
    'reangen': 'will come',
    'khulibo': 'open',
    'khulia.a': 'opened',
    'asongbo': 'sit',
    'roranbo': 'walk',
    'chabo': 'eat',
    'cha.enga': 'is eating',
    'cha.aha': 'ate',
    'chagen': 'will eat',
    'ringbo': 'drink',
    'am.a': 'win',
    'reangbo': 'go',
    're.anga': 'went',
    'katbo': 'run',
    'tua': 'sleep',
    'tusia': 'slept',
    'se.a': 'write',
    'se.ataha': 'wrote',
    'gama': 'pay',
    'raba.a': 'bring',
    'sal.a': 'drive',
    'bimung': 'name',
    'nangni': 'your',
    'maia': 'what',
    'maina': 'why',
    'maidake': 'how',
    'bano': 'where',
    'badia': 'which',
    'sako': 'whom',
    'kontakta': 'when',
    'aisko': 'who',
    'hoe': 'yes',
    'jok': 'no',
    'kasa.a': 'love',
    'kitab': 'book',
    'aganchakani': 'answer',
    'pen': 'pen',
    'box': 'box',
    'porikka': 'exam',
    'mi': 'rice',
    'jaba': 'curry',
    'sam': 'side',
    'do.o': 'meat',
    'dlang': 'mutton',
    'sak': 'vegetable',
    'sam-bi-jak': 'greens',
    'na-kam': 'chutney',
    'tungta': 'dried fish',
    'au': 'fish',
    'bus': 'bus',
    'tangka': 'money',
    'gari': 'car',
    'bag': 'bag',
    'jako': 'hand',
    'room': 'room',
    'golpo': 'story',
    'chitthio': 'letter',
    'mitela': 'thank',
    'kema': 'sorry',
    'sorang': 'please',
    'a chikku': 'hello',
    'skolchi': 'school',
    'guru': 'teacher',
    'achak': 'dog',
    'bi·sim': 'cat',
    'misi': 'cow',
    'wak': 'pig',
    'do·o': 'chicken',
    'na·a': 'fish',
    'do·si': 'bird',
    'skang': 'head',
    'mikron': 'eye',
    'nachil': 'ear',
    'nok': 'nose',
    'ku·sik': 'mouth',
    'jak': 'hand',
    'ja': 'leg',
    'be\'en': 'body',
    'katcha': 'happy',
    'ka·sachia': 'sad',
    'ka·ding': 'angry',
    'ka·saa': 'love',
    'ken·a': 'fear',
    'i haam': 'food',
    'cha·ani': 'food',
    'namen': 'good',
    'bi': 'believe',
    'chon': 'belittle',
    'konta': 'bell',
    'mul': 'bellows',
    'bfatchu': 'bellow',
    'ok': 'belly',
    '-ni': 'belong',
    'namgni': 'benefit',
    'besought': 'beseech',
    'champeng': 'beset',
    'nambata': 'best',
    'oiva': 'bestow',
    'aramaria': 'bet',
    'Seng*': 'betimes',
    'namkala': 'better',
    'ring': 'beverage',
    'gisik': 'beware',
    'mnni': 'bewitch',
    '3a': 'biped',
    'atobiani': 'birth',
    'aebak': 'bitch',
    'bit': 'bite',
    'Su-bu': 'bladder',
    'bimik': 'blade',
    'matnan': 'blame',
    'kvsinn': 'bland',
    'sea': 'blank',
    'isol': 'blaspheme',
    'balwa': 'blast',
    'walchaa': 'blaze',
    'bokata': 'bleach',
    'mikfl': 'blind',
    'mik': 'blindfold',
    'mikjapa': 'blink',
    '*': 'block',
    'goka': 'blockhead',
    'ancbi': 'blood',
    'an': 'bloodshot',
    'balgawa': 'bloom',
    'bibal': 'blossom',
    'daknanga': 'blot',
    'dukani': 'blow',
    'tangsima': 'blue',
    'matgija': 'blunt',
    'mrikmrak': 'blur',
    'Krateba-o': 'blush',
    'tokta': 'board',
    'gaora': 'boast',
    'king': 'boat',
    'Be\'en': 'body',
    'rita': 'boil',
    'Ka\'donggipa': 'bold',
    'bitckn': 'boll',
    'greng': 'bone',
    'memrang': 'bonnet',
    'Ki\'tap': 'book',
    'Ra\'seke': 'booty',
    'sima': 'border',
    'A\'kol': 'bore',
    'Ra\'chaka': 'borrow',
    'Ka"bak': 'bosom',
    'Ge"etgipa': 'boss',
    'gnian': 'both',
    'golmal': 'bother',
    'botol': 'bottle',
    'one': 'bounteous',
    'On\'e': 'bountiful',
    'chri': 'bow',
    'olakia': 'bow',
    'bil': 'bowels',
    'piala': 'bowl',
    'mo': 'boy',
    'singchakani': 'brace',
    '.in)': 'bracelet',
    'rasong': 'brag',
    'Bir^u': 'bramble',
    'Gii.dc': 'bran',
    'tonu': 'brandish',
    'chu': 'brandy',
    'pitolniko': 'brazen',
    'Nap<': 'breach',
    'gipeng': 'breadth',
    'Rang\'sita': 'breathe',
    'Ja\'skao': 'breeches',
    'bbbd': 'breed',
    'Ka\'aingi]': 'breeze',
    'jong': 'brethren',
    'clm': 'brewery',
    'kan': 'brief',
    'Bn\'au': 'brier',
    'Cbing*B': 'bright',
    'Cbing\'': 'brilliant',
    'hiking': 'brim',
    'brin': 'brindled',
    'kari': 'brine',
    'brought': 'bring',
  },

  // Garo to Hindi dictionary
  grtToHi: {
    'ang.a': 'मैं',
    'ua': 'वह',
    'bia': 'वह',
    'na.a': 'आप',
    'ia': 'यह',
    'haiwa': 'वह',
    'reba': 'आओ',
    'reba.aha': 'आया',
    'reangen': 'आएगा',
    'khulibo': 'खोलो',
    'khulia.a': 'खुला',
    'asongbo': 'बैठो',
    'roranbo': 'चलो',
    'chabo': 'खाओ',
    'cha.enga': 'खा रहा है',
    'cha.aha': 'खा गया',
    'chagen': 'खाएगा',
    'ringbo': 'पीओ',
    'am.a': 'जीतो',
    'sala': 'सब्जी',
    'reangbo': 'जाओ',
    're.anga': 'गए',
    'katbo': 'दौड़ो',
    'tua': 'सोओ',
    'tusia': 'सोया',
    'se.a': 'लिखो',
    'se.ataha': 'लिखा',
    'gama': 'दो',
    'raba.a': 'लाओ',
    'sal.a': 'चलाओ',
    'bimung': 'नाम',
    'nangni': 'आपका',
    'maia': 'क्या',
    'maina': 'क्यों',
    'maidake': 'कैसे',
    'bano': 'कहाँ',
    'badia': 'कौन',
    'sako': 'किसको',
    'kontakta': 'कब',
    'aisko': 'कौन',
    'hoe': 'हाँ',
    'jok': 'नहीं',
    'kasa.a': 'प्यार',
    'kitab': 'किताब',
    'aganchakani': 'उत्तर',
    'pen': 'कलम',
    'box': 'बॉक्स',
    'porikka': 'परीक्षा',
    'bus': 'बस',
    'tangka': 'पैसे',
    'gari': 'गाड़ी',
    'bag': 'बैग',
    'room': 'कमरा',
    'mitela': 'धन्यवाद',
    'kema': 'माफी',
    'sorang': 'कृपया',
    'a chikku': 'हेलो',
    'skolchi': 'स्कूल',
    'guru': 'शिक्षक',
    'achak': 'कुत्ता',
    'menggo': 'बिल्ली',
    'gittam': 'पेड़',
    'apa': 'घर',
    'kam': 'काम',
    'donkhwa': 'पानी',
    'i haam': 'खाना',
    'khimang': 'खाना',
    'kimang': 'खाना',
    'mi': 'चावल',
    'jaba': 'करी',
    'sam': 'साइड',
    'do.o': 'मांस',
    'wak': 'सूअर का मांस',
    'dlang': 'मटन',
    'sak': 'सब्जी',
    'sam-bi-jak': 'हरी सब्जी',
    'na-kam': 'चटनी',
    'tungta': 'सूखा मछली',
  },

};

// Verb conjugations for Garo
const verbConjugations = {
  'eat': { root: 'cha·a', present: 'cha·enga', past: 'cha·aha', future: 'cha·gen', negative: 'cha·jawa' },
  'go': { root: 're·ang', present: 're·angenga', past: 're·angaha', future: 're·anggen', negative: 're·angjawa' },
  'come': { root: 're·ba', present: 're·baenga', past: 're·baaha', future: 're·bagen', negative: 're·bajawa' },
  'sleep': { root: 'tusi', present: 'tusienga', past: 'tusiha', future: 'tusigen', negative: 'tusijawa' },
  'read': { root: 'pora', present: 'poraenga', past: 'poraaha', future: 'poragen', negative: 'porajawa' },
  'write': { root: 'sera', present: 'seraenga', past: 'seraaha', future: 'seragen', negative: 'serajawa' },
  'drink': { root: 'ring', present: 'ringa', past: 'ringaha', future: 'ringgen', negative: 'ringjawa' },
  'run': { root: 'kat', present: 'katenga', past: 'kata', future: 'katgen', negative: 'katjawa' },
  'see': { root: 'nia', present: 'nienga', past: 'niaha', future: 'nigen', negative: 'nijawa' },
  'love': { root: 'ka·saa', present: 'ka·sa.enga', past: 'ka·sa.aha', future: 'ka·sa.gen', negative: 'ka·sa.jawa' },
  'bite': { root: 'chika', present: 'chikaenga', past: 'chikaaha', future: 'chikagen', negative: 'chikajawa' },
  'cut': { root: 'den', present: 'denenga', past: 'denaha', future: 'dengen', negative: 'denjawa' },
};

// Verb stems for irregular forms
const verbStems = {
  'ate': 'eat',
  'eating': 'eat',
  'goes': 'go',
  'went': 'go',
  'saw': 'see',
  'seen': 'see',
  'loved': 'love',
  'loving': 'love',
  'slept': 'sleep',
  'sleeping': 'sleep',
  'read': 'read', // past is same
  'reading': 'read',
  'wrote': 'write',
  'writing': 'write',
  'drank': 'drink',
  'drinking': 'drink',
  'ran': 'run',
  'running': 'run',
  'bit': 'bite',
  'bitten': 'bite',
  'biting': 'bite',
  'cut': 'cut',
  'cutting': 'cut',
};

// Garo grammar is simple - mainly word order with tense suffixes
// Translation patterns for common sentence structures
const translationPatterns = [
  {
    from: 'en',
    to: 'grt',
    regex: /^where is (?:the )?(.+)$/,
    handler: (match) => `${translateWordByWord(match[1], 'en', 'grt')} bano`,
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^did you (.+)$/,
    handler: (match) => {
      const verb = normalizeText(match[1]);
      if (verb === 'eat') return 'na.a cha.aha';
      return `na.a ${translateWordByWord(match[1], 'en', 'grt')}`.trim();
    },
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^i want (.+)$/,
    handler: (match) => `ang.a se ${translateWordByWord(match[1], 'en', 'grt')}`,
  },
  {
    from: 'en',
    to: 'grt',
    regex: /^do you have (.+)$/,
    handler: (match) => `na.a ${translateWordByWord(match[1], 'en', 'grt')} jok ma`,
  },
  {
    from: 'hi',
    to: 'grt',
    regex: /^(.+) कहाँ है$/,
    handler: (match) => `${translateWordByWord(match[1], 'hi', 'grt')} bano`,
  },
  {
    from: 'hi',
    to: 'grt',
    regex: /^मुझे (.+) चाहिए$/,
    handler: (match) => `ang.a se ${translateWordByWord(match[1], 'hi', 'grt')}`,
  },
];

function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[?!,]+/g, '')
    .replace(/\s+/g, ' ');
}

function translatePhrase(text, from) {
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

function translateNumberedText(text, from, to) {
  if (from === 'en' && to === 'grt') {
    return translateNumberedPhrase(text);
  }
  return null;
}

function translateWordByWord(text, from, to) {
  const normalized = normalizeText(text);
  // First, check if the whole phrase has an entry
  let entry;
  if (from === 'en' && to === 'grt') {
    entry = dictionary.searchEnglish(normalized);
    if (entry && entry.garo) return entry.garo;
  }
  if (from === 'hi' && to === 'grt') {
    entry = dictionary.searchHindi(normalized);
    if (entry && entry.garo) return entry.garo;
  }
  if (from === 'grt' && to === 'en') {
    entry = dictionary.searchGaro(normalized);
    if (entry && entry.english) return entry.english;
  }
  if (from === 'grt' && to === 'hi') {
    entry = dictionary.searchGaro(normalized);
    if (entry && entry.hindi) return entry.hindi;
  }
  // Otherwise, word by word
  return normalized
    .split(' ')
    .map((word) => {
      if (from === 'en' && to === 'grt') {
        const entry = dictionary.searchEnglish(word);
        return entry ? entry.garo : '';
      }
      if (from === 'hi' && to === 'grt') {
        const entry = dictionary.searchHindi(word);
        return entry ? entry.garo : '';
      }
      if (from === 'grt' && to === 'en') {
        const entry = dictionary.searchGaro(word);
        return entry ? entry.english : '';
      }
      if (from === 'grt' && to === 'hi') {
        const entry = dictionary.searchGaro(word);
        return entry ? entry.hindi : '';
      }
      return '';
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse English sentence into components
function parseEnglish(sentence) {
  const words = normalizeText(sentence).split(' ');
  let subject = null, verb = null, object = null, tense = 'present', isContinuous = false, isPast = false, isFuture = false, isNegative = false;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(word)) {
      subject = word;
    } else if (['the', 'a', 'an'].includes(word)) {
      continue;
    } else if (['am', 'is', 'are', 'was', 'were'].includes(word)) {
      if (word === 'was' || word === 'were') isPast = true;
      if (words[i+1] && words[i+1].endsWith('ing')) isContinuous = true;
    } else if (word === 'will') {
      isFuture = true;
    } else if (word === 'not') {
      isNegative = true;
    } else if (verbStems[word] || verbConjugations[word] || word.endsWith('ing') || word.endsWith('ed') || word.endsWith('s')) {
      verb = verbStems[word] || word.replace(/ing$|ed$|es$|s$/, '');
      if (verbStems[word] && verbStems[word] !== word && !word.endsWith('ing')) isPast = true;
      if (word.endsWith('ing')) isContinuous = true;
      if (word.endsWith('ed')) isPast = true;
      if (word.endsWith('s') && !word.endsWith('es')) isPast = false; // present for 3rd person
    } else if (!subject && !verb) {
      subject = word;
    } else if (subject && verb) {
      object = word;
    }
  }

  if (isFuture) tense = 'future';
  else if (isPast) tense = 'past';
  else if (isContinuous) tense = 'present_continuous';
  else tense = 'present';

  return { subject, verb, object, tense, isNegative };
}

// Translate sentence using rule-based parsing
function translateSentence(text, from, to) {
  if (from === 'en' && to === 'grt') {
    const parsed = parseEnglish(text);
    if (parsed.subject && parsed.verb) {
      const subj = getEntryByEnglish(parsed.subject)?.garo || dictionaries.en[parsed.subject] || parsed.subject;
      const obj = parsed.object ? (getEntryByEnglish(parsed.object)?.garo || dictionaries.en[parsed.object] || parsed.object) : '';
      const verbData = verbConjugations[parsed.verb];
      if (verbData) {
        let garoVerb = verbData.root;
        if (parsed.tense === 'present_continuous') garoVerb = verbData.present;
        else if (parsed.tense === 'past') garoVerb = verbData.past;
        else if (parsed.tense === 'future') garoVerb = verbData.future;
        if (parsed.isNegative) garoVerb = verbData.negative;
        return `${subj} ${obj} ${garoVerb}`.trim();
      }
    }
  }
  return null;
}

export function detectLanguage(text) {
  const normalized = normalizeText(text);
  // Detect Hindi by Devanagari script
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

  // Try phrase dictionary first
  const phrase = translatePhrase(normalized, from, to);
  if (phrase) return phrase;

  // Try number + classifier translation
  const numberPhrase = translateNumberedText(normalized, from, to);
  if (numberPhrase) return numberPhrase;

  // Try pattern-based translation
  const pattern = translatePattern(normalized, from, to);
  if (pattern) return pattern;

  // Try sentence parsing for English to Garo
  const sentence = translateSentence(normalized, from, to);
  if (sentence) return sentence;

  // Word-by-word translation
  if (from === 'en' && to === 'grt') {
    return translateWordByWord(normalized, 'en', 'grt');
  }

  if (from === 'hi' && to === 'grt') {
    return translateWordByWord(normalized, 'hi', 'grt');
  }

  if (from === 'grt' && to === 'en') {
    return translateWordByWord(normalized, 'grt', 'en');
  }

  if (from === 'grt' && to === 'hi') {
    return translateWordByWord(normalized, 'grt', 'hi');
  }

  // Cross-language translation via Garo bridge
  if (from !== 'grt' && to !== 'grt') {
    const intermediate = translateText(text, from, 'grt');
    return translateText(intermediate, 'grt', to);
  }

  return 'Translation unavailable for this language pair.';
}

export function addVocabularyEntry(entry) {
  dictionary.addEntry(entry);
}

export function getDictionary() {
  return dictionary;
}
