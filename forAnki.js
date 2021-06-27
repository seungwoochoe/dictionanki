// You can change variables from here
let dividerBetweenWordAndDefinition = "\t";
let endingCharacter = "\n";
let hideWordsFromDefinition = true;
let blank = " ____________ ";
// to here as your using purpose.


function run(input, parameters) {
  let wholeText = input[0];
  let word = getWord(wholeText);
  let definition = getDefinition(word, wholeText);
  let result = `${word}${dividerBetweenWordAndDefinition}${definition}${endingCharacter}`;
  return result;
}



// Getting word.
function getWord(text) {
  text = text.replaceAll("·", "");
  let word = text.split(" ")[0];
  word = removeWordException(word);
  return word;
}

function removeWordException(word) {
  word = remove1AfterWord(word);
  word = removePartOfSpeechFromWord(word);
  return word;
}

function remove1AfterWord(word) {
  if (word.charAt(word.length - 1) == "1") {
    word = word.substring(0, word.length - 1);
  }
  return word;
}

function removePartOfSpeechFromWord(word) {
  word = word.replace("adverb", "");
  word = word.replace("verb", "");
  word = word.replace("noun", "");
  word = word.replace("adjective", "");
  word = word.replace("exclamation", "");
  word = word.replace("preposition", "");
  return word;
}



// Getting definition.
function getDefinition(word, text) {
  let prunedText = pruneText(text);
  let formattedText = formatText(prunedText);
  let result = hide(word, formattedText).trimStart();
  result = removeFirstBr(result);
  return result;
}

function pruneText(text) {
  text = removeAdditionalInformation(text);
  text = removeWordAndPronounciation(text);
  return text;
}

function removeAdditionalInformation(text) {
  if (text.includes("PHRASES")) {
    text = text.substring(0, text.indexOf("PHRASES") - 1);
  }
  if (text.includes("PHRASAL VERBS")) {
    text = text.substring(0, text.indexOf("PHRASAL VERBS") - 1);
  }
  if (text.includes("DERIVATIVES")) {
    text = text.substring(0, text.indexOf("DERIVATIVES") - 1);
  }
  if (text.includes("ORIGIN")) {
    text = text.substring(0, text.indexOf("ORIGIN") - 1);
  }
  return text;
}

function removeWordAndPronounciation(text) {
  let nounIndex;
  let verbIndex;
  let adverbIndex;
  let adjectiveIndex;
  let exclamationIndex;
  if (text.includes("noun")) {
    nounIndex = text.indexOf("noun");
  } else {
    nounIndex = Infinity;
  }
  if (text.includes("verb")) {
    verbIndex = text.indexOf("verb");
  } else {
    verbIndex = Infinity;
  }
  if (text.includes("adverb")) {
    adverbIndex = text.indexOf("adverb");
  } else {
    adverbIndex = Infinity;
  }
  if (text.includes("adjective")) {
    adjectiveIndex = text.indexOf("adjective");
  } else {
    adjectiveIndex = Infinity;
  }
  if (text.includes("exclamation")) {
    exclamationIndex = text.indexOf("exclamation");
  } else {
    exclamationIndex = Infinity;
  }
  
  let minIndex = Math.min(nounIndex, verbIndex, adverbIndex, adjectiveIndex, exclamationIndex);
  if (text[minIndex - 1] === " ") {
    text = text.substring(minIndex - 1);
  } else {
    text = text.substring(minIndex);
  }
  return text;
}

function formatText(text) {
  text = formatByNumbers(text);
  text = formatByPartOfSpeech(text);
  return text;
}

function formatByNumbers(text) {
  text = text.replaceAll(" 2 ", "<br>2 ");
  text = text.replaceAll(" 3 ", "<br>3 ");
  text = text.replaceAll(" 4 ", "<br>4 ");
  text = text.replaceAll(" 5 ", "<br>5 ");
  text = text.replaceAll(" 6 ", "<br>6 ");
  text = text.replaceAll(" 7 ", "<br>7 ");
  text = text.replaceAll(" 8 ", "<br>8 ");
  text = text.replaceAll(" 9 ", "<br>9 ");
  text = text.replaceAll(" •", "<br> •");
  return text;
}

function formatByPartOfSpeech(text) {
  text = text.replace(" noun ", "<br><br>noun<br>");
  text = text.replace(" verb ", "<br><br>verb<br>");
  text = text.replace(" adverb ", "<br><br>adverb<br>");
  text = text.replace(" adjective ", "<br><br>adjective<br>");
  text = text.replace(" exclamation ", "<br><br>exclamation<br>");
  return text;
}

function hide(word, text) {
  if (hideWordsFromDefinition === true) {
    text = text.replaceAll(" " + word + " ", blank);
    text = text.replaceAll(" " + word + "d ", blank);
    text = text.replaceAll(" " + word + "ed ", blank);
    text = text.replaceAll(" " + word + "s ", blank);
    text = text.replaceAll(" " + word + "es ", blank);
    text = text.replaceAll(" " + word + "ing ", blank);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ing ", blank);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ies ", blank);
  
    let blankDot = blank.substring(0, blank.length - 1) + ".";
    text = text.replaceAll(" " + word + ".", blankDot);
    text = text.replaceAll(" " + word + "s.", blankDot);
    text = text.replaceAll(" " + word + "es.", blankDot);
    text = text.replaceAll(" " + word + "d.", blankDot);
    text = text.replaceAll(" " + word + "ed.", blankDot);
    text = text.replaceAll(" " + word + "ing.", blankDot);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ing.", blankDot);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ies.", blankDot);
  
    let blankComma = blank.substring(0, blank.length - 1) + ",";
    text = text.replaceAll(" " + word + ",", blankComma);
    text = text.replaceAll(" " + word + "s,", blankComma);
    text = text.replaceAll(" " + word + "es,", blankComma);
    text = text.replaceAll(" " + word + "d,", blankComma);
    text = text.replaceAll(" " + word + "ed,", blankComma);
    text = text.replaceAll(" " + word + "ing,", blankComma);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ing,", blankComma);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ies,", blankComma);
  
    let blankColon = blank.substring(0, blank.length - 1) + ",";
    text = text.replaceAll(" " + word + ":", blankColon);
    text = text.replaceAll(" " + word + "s:", blankColon);
    text = text.replaceAll(" " + word + "es:", blankColon);
    text = text.replaceAll(" " + word + "d:", blankColon);
    text = text.replaceAll(" " + word + "ed:", blankColon);
    text = text.replaceAll(" " + word + "ing:", blankColon);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ing:", blankColon);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ies:", blankColon);
  
    let blankOpenParanthesis = "(" + blank.substring(1, blank.length);
    text = text.replaceAll("(" + word + " ", blankOpenParanthesis);
    text = text.replaceAll("(" + word + "s ", blankOpenParanthesis);
    text = text.replaceAll("(" + word + "es ", blankOpenParanthesis);
    text = text.replaceAll("(" + word + "d ", blankOpenParanthesis);
    text = text.replaceAll("(" + word + "ed ", blankOpenParanthesis);
    text = text.replaceAll("(" + word + "ing ", blankOpenParanthesis);
    text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ing ", blankOpenParanthesis);
    text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ies ", blankOpenParanthesis);
  
    let blankCloseParanthesis = blank.substring(0, blank.length - 1) + ")";
    text = text.replaceAll(" " + word + ")", blankCloseParanthesis);
    text = text.replaceAll(" " + word + "s)", blankCloseParanthesis);
    text = text.replaceAll(" " + word + "es)", blankCloseParanthesis);
    text = text.replaceAll(" " + word + "d)", blankCloseParanthesis);
    text = text.replaceAll(" " + word + "ed)", blankCloseParanthesis);
    text = text.replaceAll(" " + word + "ing)", blankCloseParanthesis);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ing)", blankCloseParanthesis);
    text = text.replaceAll(" " + word.substring(0, word.length - 1) + "ies)", blankCloseParanthesis);
  
    let blankParantheses = "(" + blank.substring(1, blank.length - 1) + ")";
    text = text.replaceAll("(" + word + ")", blankParantheses);
    text = text.replaceAll("(" + word + "s)", blankParantheses);
    text = text.replaceAll("(" + word + "es)", blankParantheses);
    text = text.replaceAll("(" + word + "d)", blankParantheses);
    text = text.replaceAll("(" + word + "ed)", blankParantheses);
    text = text.replaceAll("(" + word + "ing)", blankParantheses);
    text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ing)", blankParantheses);
    text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ies)", blankParantheses);
    }
  return text;
}

function removeFirstBr(text) {
    text = text.replace("<br>", "");
    text = text.replace("<br>", "");
    return text;
}