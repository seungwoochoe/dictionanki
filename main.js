// Options start
const dividerBetweenWordAndDefinition = "\t";
const endingCharacter = "\n";
const hidingWordsFromDefinition = true;
const blank = "______";
const removingDotInformation = true; // Dot information: definitions starting with "•" symbol in dictionary.
const htmlFormatting = true; // Italicize and change font color of example sentences.
const exampleSentencesFontColor = "darkgrey"; // Put desired html color name here.
const wordFirst = true; // Determines order between word and definition in the final result.
// Options finish
const linebreak = "<br>"; // Depricated Option. Adjust linebreak between lines of definition. Choose between "<br>" and "\n"



const partOfSpeech = ["adverb", "verb", "pronoun", "noun", "adjective", "preposition", "conjunction", "exclamation"];
const extraInformation = ["PHRASES", "PHRASAL VERBS", "DERIVATIVES", "ORIGIN"];
const labels = ["Biology", "technical", "formal", "litarary", "Chemistry", "Mathematics", "Geology", "Prosody", "Heraldry", "humorous", "Theology", "historical", "Philosophy", "&", "Scottish informal", "mainly North American", "North American", "Northern English", "mainly British", "British", "Logic", "Grammar", "informal", "informal,", "Baseball", "Physics", "Golf", "archaic", "US", "Computing", "Printing", "Law", "Anatomy", "Zoology", "rare"];


function run(input, parameters) {
	const wholeText = input[0];
	const word = getWord(wholeText);
	const definition = getDefinition(word, wholeText);

	return getResult(word, definition);
}



// --------------------------------------------------------------------------------------
// Getting word. ------------------------------------------------------------------------
const getWord = (text) => {
	text = text.replaceAll("·", "");
	text = text.split(" ")[0];
	text = removeWordException(text);
	return text;
}

const removeWordException = (word) => {
	word = removeHomonymNumberFromWord(word); // If word has multiple groups of definitions (like bat), remove 1 after word.
	word = removePartOfSpeechFromWord(word); // There are some words that part of seech follows right after word.
	return word;
}

const removeHomonymNumberFromWord = (word) => {
	if (word.charAt(word.length - 1) == "1" || word.charAt(word.length - 1) == "2") {
		word = word.substring(0, word.length - 1);
	}
	return word;
}

const removePartOfSpeechFromWord = (word) => {
	partOfSpeech.forEach((element) => {
		word = word.replace(`${element}`, "");
	})
	return word;
}


// -----------------------------------------------------------------------------------
// Getting definition.----------------------------------------------------------------
const getDefinition = (word, text) => {
	text = pruneText(text);
	text = formatText(text);
	if (hidingWordsFromDefinition === true) {
		text = hideWordsFromDefinition(word, text);
	}
	return text;
}

// pruning-------------------------------------------------------------------------------
const pruneText = (text) => {
	text = removeAdditionalInformation(text);
	text = removeWordAndPronunciation(text);
	if (removingDotInformation === true) {
		text = removeDotInformation(text);
	}
	return text;
}

const removeAdditionalInformation = (text) => {
	extraInformation.forEach((element) => {
		if (text.includes(`${element}`)) {
			text = text.substring(0, text.indexOf(`${element}`));
		}
	})
	return text;
}

const removeWordAndPronunciation = (text) => {
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

const removeDotInformation = (text) => {
		while (text.includes("•")) {
				const startIndex = text.indexOf("•") - 1;
				const endIndex = text.indexOf(". ", startIndex);
				text = text.substring(0, startIndex) + text.substring(endIndex + 1);
		}
		return text;
}



// formatting--------------------------------------------------------------------------
const formatText = (text) => {
	text = formatByNumbers(text);
	text = formatByPartOfSpeech(text);
	text = breakLineProperly(text);
	if (htmlFormatting === true) {
		text = formatByHtml(text);
	}
	text = text.trim();
	return text;
}

const formatByNumbers = (text) => {
	for (i = 2; i < 10; i++) {
		text = text.replaceAll(` ${i} `, linebreak + `${i} `);
	}
	text = text.replaceAll(" •", linebreak + "• ");
	return text;
}

const formatByPartOfSpeech = (text) => {
	partOfSpeech.forEach((element) => {
		text = text.replace(`${element} `, `${linebreak.repeat(2)}${element}${linebreak}  `);
		let regexForPartOfSpeechesInsideParentheses = new RegExp(`(\\([a-z ]*?)\\<br\\>\\<br\\>(${element})\\<br\\>([a-z ]*?\\))`);
		text = text.replace(regexForPartOfSpeechesInsideParentheses, "$1 $2 $3"); // cancel line break part of speech inside defitition like "(as adecjtive pelleted)".
	})
	text = text.replace(`${linebreak}${linebreak}`, "");
	return text;
}

const breakLineProperly = (text) => {
	partOfSpeech.forEach((element) => {
		let regexWithSquareBrackets = new RegExp(`(${element})\\<br\\>(\\(?[^\\<\\d]*?\\)?) ?(\\[.*?\\]) `, 'g');
		text = text.replace(regexWithSquareBrackets, `$1 $2 $3${linebreak}`);
		let regexWithoutSquareBrackets = new RegExp(`(${element})\\<br\\> *(\\([^\\<\\d]*?\\)) `);
		text = text.replace(regexWithoutSquareBrackets, `$1 $2${linebreak}`);
	})
	return text;
}

const formatByHtml = (text) => {
	text = italicizeExampleSentences(text);
	text = italicizeSquareBracketWords(text);
	text = italicizeLabels(text);
	text = changeItalicizedTextColorToDarkgrey(text);
	return text;
}


const italicizeExampleSentences = (text) => {
	while (text.includes(": ")) {
		const indexOfColon = text.indexOf(": ");
		const indexOfPeriod = text.indexOf(".", indexOfColon);
		text = text.substring(0, indexOfPeriod + 1) + "</i>" + text.substring(indexOfPeriod + 1);
		text = text.replace(": ", ":<i> ");
	}
	return text;
}

const italicizeSquareBracketWords = (text) => {
	text = text.replaceAll("[", "<i>[");
	text = text.replaceAll("]", "]</i>");
	return text;
}

const italicizeLabels = (text) => {
	labels.forEach((element) => {
		text = text.replaceAll(`${element}`, `<i>${element}</i>`);
	})
	return text;
}

const changeItalicizedTextColorToDarkgrey = (text) => {
	text = text.replaceAll('<i>', `<span style="color:${exampleSentencesFontColor}"><i>`);
	text = text.replaceAll('</i>', '</i></span>');
	return text;
}



// hiding -----------------------------------------------------------------------------
const hideWordsFromDefinition = (word, text) => {
	const lastCharacterRemovedWord = word.substring(0, word.length - 1);
	const lastCharacter = word.substring(word.length - 1);

	const startingVariations = [" ", "(", '“'];
	const wordForms = ["", "d", "ed", "s", "es", "ing", "er", "est", `${lastCharacter}ed`, `${lastCharacter}ing`];
	const wordFormsWithY = ["ing", "ied", "ies", "ier", "iest"];
	const endingVariations = [" ", ".", ",", ":", ";", ")", '”'];

	startingVariations.forEach((startingVariation) => {
		wordForms.forEach((wordForm) => {
			endingVariations.forEach((endingVariation) => {
				text = text.replaceAll(`${startingVariation}${word}${wordForm}${endingVariation}`, `${startingVariation}${blank}${wordForm}${endingVariation}`);
			})
		})
		wordFormsWithY.forEach((wordFormWithY) => {
			endingVariations.forEach((endingVariation) => {
				text = text.replaceAll(`${startingVariation}${lastCharacterRemovedWord}${wordFormWithY}${endingVariation}`, `${startingVariation}${blank}${wordFormWithY}${endingVariation}`);
			})
		})
	})
	return text;
}

// -------------------------------------------------------------------------------------------
// Getting result-----------------------------------------------------------------------------
const getResult = (word, definition) => {
	if (wordFirst === true) {
		result = `${word}${dividerBetweenWordAndDefinition}${definition}${endingCharacter}`;
	} else {
		result = `${definition}${dividerBetweenWordAndDefinition}${word}${endingCharacter}`;
	}
	return result;
}