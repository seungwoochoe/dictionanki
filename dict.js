function run(input, parameters) {
  // You can change dividing character between term and definition by changing "divider" variable below.
  let divider = "@";

  // You can change ending character by changing "ending" variable below.
  let ending = "&\n";

  // You can change how many underscores to input by changing "blank" variable below.
  blank = " ___________ ";
    
  let wholeText = input[0];
  let word = getWord(wholeText);
  let definition = getDefinition(wholeText);
  let editedDefinition = hideWordsFromDefinition(definition, word).trimStart();
  let result = `${word}${divider}${editedDefinition}${ending}`;
  return  result;
}


function getWord(text) {
  text = text.replaceAll("·", "");
  let word = text.split(" ")[0];
  if (word.charAt(word.length - 1) == "1") {
    word = word.substring(0, word.length - 1);
  }
  return word;
}

function getDefinition(text) {
  let prunedText = pruneText(text);
  let formattedText = formatText(prunedText);
  return formattedText;
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
  text = text.substring(minIndex - 1);
  return text;
}

function formatText(text) {
  text = formatByNumbers(text);
  text = formatByPartOfSpeech(text);
  return text;
}

function formatByNumbers(text) {
  text = text.replaceAll(" 2 ", "\n2 ");
  text = text.replaceAll(" 3 ", "\n3 ");
  text = text.replaceAll(" 4 ", "\n4 ");
  text = text.replaceAll(" 5 ", "\n5 ");
  text = text.replaceAll(" 6 ", "\n6 ");
  text = text.replaceAll(" 7 ", "\n7 ");
  text = text.replaceAll(" 8 ", "\n8 ");
  text = text.replaceAll(" 9 ", "\n9 ");
  text = text.replaceAll(" •", "\n •");
  return text;
}

function formatByPartOfSpeech(text) {
  text = text.replace(" noun ", "\n\nnoun\n");
  text = text.replace(" verb ", "\n\nverb\n");
  text = text.replace(" adverb ", "\n\nadverb\n");
  text = text.replace(" adjective ", "\n\nadjective\n");
  text = text.replace(" exclamation ", "\n\nexclamation\n");
  return text;
}

function hideWordsFromDefinition(text, word) {
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

  let blankParanthesis = "(" + blank.substring(1, blank.length - 1) + ")";
  text = text.replaceAll("(" + word + ")", blankParanthesis);
  text = text.replaceAll("(" + word + "s)", blankParanthesis);
  text = text.replaceAll("(" + word + "es)", blankParanthesis);
  text = text.replaceAll("(" + word + "d)", blankParanthesis);
  text = text.replaceAll("(" + word + "ed)", blankParanthesis);
  text = text.replaceAll("(" + word + "ing)", blankParanthesis);
  text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ing)", blankParanthesis);
  text = text.replaceAll("(" + word.substring(0, word.length - 1) + "ies)", blankParanthesis);

  return text;
}