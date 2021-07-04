// Options start
let dividerBetweenWordAndDefinition = "\t";
let endingCharacter = "\n";
let hideWordsFromDefinition = true;
let blank = "______"; // If you set hideWordsFromDefinition value to true, given words on example sentences will replaced with this string.
let removingDotInformation = true; // Dot information refers specific definitions starting with "•" symbol.
let linebreak = "<br>"; // Adjust linebreak between lines of definition. Choose between "<br>" and "\n"
let htmlFormatting = true; // Italicize   example sentences.
let definitionFirst = true; // Determines order between word and definition.
// Options finish


let partOfSpeech = ["adverb", "verb", "pronoun", "noun", "adjective", "preposition", "conjunction", "exclamation"];
let extraInformation = ["PHRASES", "PHRASAL VERBS", "DERIVATIVES", "ORIGIN"];
let specialWords = ["&", "Scottish informal", "North American", "mainly British", "British", "Logic", "Grammar", "informal", "Baseball", "Physics", "Golf", "archaic", "US", "Computing", "Printing", "Law"];


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
  word = remove1AfterWord(word); // If word has multiple groups of definitions (like pad), remove 1 after word.
  word = removePartOfSpeechFromWord(word); // There are some words that part of seech follows right after word.
  return word;
}

function remove1AfterWord(word) {
  if (word.charAt(word.length - 1) == "1" || word.charAt(word.length - 1) == "2") {
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
      text = text.substring(0, text.indexOf(`${element}`));
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
        let endIndex = text.indexOf(". ", startIndex);
        text = text.substring(0, startIndex) + text.substring(endIndex + 1);
    }
    return text;
}



// formatting--------------------------------------------------------------------------
function formatText(text) {
  text = formatByNumbers(text);
  text = formatByPartOfSpeech(text);
  text = breakLineProperly(text);
  if (htmlFormatting === true) {
    text = formatByHtml(text);
  }
  text = text.trim();
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
    text = text.replace(`${element} `, `${linebreak.repeat(2)}${element}${linebreak}  `);
  })
  text = text.replace(`${linebreak}`, "");
  text = text.replace(`${linebreak}`, "");
  partOfSpeech.forEach((element) => {
    let regex = `(\\(.*?)\\<br\\>\<br\\> ?(${element}) ?\\<br\\>(.*?)\\)`;
    text = text.replace(regex, "$1$2$3");   
  });
  return text;
}

function breakLineProperly(text) {
  partOfSpeech.forEach((element) => {
    let regexWithSquareBrackets = new RegExp(`(${element})\\<br\\>(\\(?[^\\<]*?\\)?) ?(\\[.*?\\]) `, 'g');
    text = text.replace(regexWithSquareBrackets, `$1 $2 $3${linebreak}`);
    let regexWithoutSquareBrackets = new RegExp(`(${element})\\<br\\>(\\([^\\<]*?\\)) `);
    text = text.replace(regexWithoutSquareBrackets, `$1 $2${linebreak}`);
    let regexForPartOfSpeechesInsideParentheses = new RegExp(`(\\([a-z ]*?)\\<br\\>\\<br\\>(${element})\\<br\\>([a-z ]*?\\))`);
    text = text.replace(regexForPartOfSpeechesInsideParentheses, "$1 $2 $3");
  })
  return text;
}

function formatByHtml(text) {
  text = italicizeExampleSentences(text);
  text = italicizeSquareBracketWords(text);
  text = italicizeSpecialWords(text);
  text = changeItalicizedTextColorToDarkgrey(text);
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

function changeItalicizedTextColorToDarkgrey(text) {
  text = text.replaceAll('<i>', '<span style="color:darkgrey"><i>');
  text = text.replaceAll('</i>', '</i></span>');
  return text;
}


// hiding -----------------------------------------------------------------------------
function hide(word, text) {
  let wordRemovedY = word.substring(0, word.length - 1);

  let startingVariations = [" ", "(", '“'];
  let wordForms = ["", "d", "ed", "s", "es", "ing", "er", "est"];
  let wordFormsWithY = ["ing", "ied", "ies", "ier", "iest"];
  let endingVariations = [" ", ".", ",", ":", ";", ")", '”'];


  if (hideWordsFromDefinition === true) {
    startingVariations.forEach((startingVariation) => {
      wordForms.forEach((wordForm) => {
        endingVariations.forEach((endingVariation) => {
          text = text.replaceAll(`${startingVariation}${word}${wordForm}${endingVariation}`, `${startingVariation}${blank}${wordForm}${endingVariation}`);
        })
      })
      wordFormsWithY.forEach((wordFormWithY) => {
        endingVariations.forEach((endingVariation) => {
          text = text.replaceAll(`${startingVariation}${wordRemovedY}${wordFormWithY}${endingVariation}`, `${startingVariation}${blank}${wordFormWithY}${endingVariation}`);
        })
      })
    })
  }
  return text;
}
