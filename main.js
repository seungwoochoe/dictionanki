// Options start
let dividerBetweenWordAndDefinition = "\t";
let endingCharacter = "\n";
let hideWordsFromDefinition = true;
let blank = " _________ "; // If you set hideWordsFromDefinition value to true, given words on example sentences will replaced with this string.
let removingDotInformation = true; // Dot information refers specific definitions starting with "•" symbol.
let linebreak = "<br>"; // Adjust linebreak between lines of definition. Choose between "<br>" and "\n"
let htmlFormatting = true; // Italicize   example sentences.
let definitionFirst = true; // Determines order between word and definition.
// Options finish


let partOfSpeech = ["adverb", "verb", "pronoun", "noun", "adjective", "preposition", "conjunction"];
let extraInformation = ["PHRASES", "PHRASAL VERBS", "DERIVATIVES", "ORIGIN"];
let specialWords = ["Scottish informal", "North American", "mainly British", "British", "Grammar", "informal", "Baseball", "Physics", "Golf", "archaic", "US", "Computing", "Printing"];

function run(input, parameters) {
  let wholeText = input[0];
  let word = getWord(wholeText);
  let definition = getDefinition(word, wholeText);
  let result;
  if (definitionFirst === true) {
    result = `${definition}${dividerBetweenWordAndDefinition}${word}${endingCharacter}`;
  } else {
    result = `${word}${dividerBetweenWordAndDefinition}${definition}${endingCharacter}`;
  }
  return result;
}



// --------------------------------------------------------------------------------------
// Getting word. ------------------------------------------------------------------------
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
  partOfSpeech.forEach((element) => {
    word = word.replace(`${element}`, "");
  })
  return word;
}


// -----------------------------------------------------------------------------------
// Getting definition.----------------------------------------------------------------
function getDefinition(word, text) {
  text = pruneText(text);
  text = formatText(text);
  text = hide(word, text);
  text = trimText(text);
  return text;
}


// pruning-------------------------------------------------------------------------------
function pruneText(text) {
  text = removeAdditionalInformation(text);
  text = removeWordAndPronounciation(text);
  if (removingDotInformation === true) {
    text = removeDotInformation(text);
  }
  return text;
}

function removeAdditionalInformation(text) {
  extraInformation.forEach((element) => {
    if (text.includes(`${element}`)) {
      text = text.substring(0, text.indexOf(`${element}`) - 1);
    }
  })
  return text;
}

function removeWordAndPronounciation(text) {
  let indexs = [];
  partOfSpeech.forEach((element) => {
    if (text.includes(`${element}`)) {
      indexs.push(text.indexOf(`${element}`));
    }
  })
  let minIndex = Math.min(...indexs);
  if (text[minIndex - 1] === " ") {
    text = text.substring(minIndex - 1);
  } else {
    text = text.substring(minIndex);
  }
  return text;
}

function removeDotInformation(text) {
    while (text.includes("•")) {
        let startIndex = text.indexOf("•") - 1;
        let endIndex = text.indexOf(".", startIndex);
        text = text.substring(0, startIndex) + text.substring(endIndex + 1);
    }
    return text;
}

function removeFirstBr(text) {
  text = text.replace("<br>", "");
  text = text.replace("<br>", "");
  return text;
}



// formatting--------------------------------------------------------------------------
function formatText(text) {
  text = formatByNumbers(text);
  text = formatByPartOfSpeech(text);
  if (htmlFormatting === true) {
    text = formatByHtml(text);
  }
  return text;
}

function formatByNumbers(text) {
  for (i = 2; i < 10; i++) {
    text = text.replaceAll(` ${i} `, linebreak + `${i} `);
  }
  text = text.replaceAll(" •", linebreak + "• ");
  return text;
}

function formatByPartOfSpeech(text) {
  partOfSpeech.forEach((element) => {
    text = text.replace(` ${element} `, `${linebreak.repeat(2)}` + `${element}` + `${linebreak}`);
  })
  return text;
}

function formatByHtml(text) {
  text = italicizeExampleSentences(text);
  text = italicizeSquareBracketWords(text);
  text = italicizeSpecialWords(text);
  return text;
}


function italicizeExampleSentences(text) {
  while (text.includes(": ")) {
    let indexOfColon = text.indexOf(": ");
    let indexOfPeriod = text.indexOf(".", indexOfColon);
    text = text.substring(0, indexOfPeriod + 1) + "</i>" + text.substring(indexOfPeriod + 1);
    text = text.replace(": ", ":<i> ");
  }
  return text;
}

function italicizeSquareBracketWords(text) {
  text = text.replaceAll("[", "<i>[");
  text = text.replaceAll("]", "]</i>");
  return text;
}

function italicizeSpecialWords(text) {
  specialWords.forEach((element) => {
    text = text.replaceAll(`${element}`, `<i>${element}</i>`);
  })
  return text;
}


// hiding -----------------------------------------------------------------------------
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
  
    let blankColon = blank.substring(0, blank.length - 1) + ":";
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


// Trim
function trimText(text) {
  text = text.trim();
  text = removeFirstBr(text);
  return text;
}