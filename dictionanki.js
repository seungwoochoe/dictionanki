// --------------------------------------------------------------------------------------
// Configuration & Constants
// --------------------------------------------------------------------------------------
const config = {
	separatorBetweenWordAndItsDefinition: "\t",
	separatorBetweenGeneratedResults: "\n",
	shouldHideWordsInExampleSentences: true,
	blank: "______",
	shouldIncludeDotDefinitions: false,
	shouldIncludeRegularVerbConjugationFormsInfo: false,
	shouldIncludeComparativeAndSuperlativeFormsInfo: false,
	shouldIncludePluralFormInfo: false,
	shouldUseHtmlFormatting: true,
	fontColorForExampleSentences: "darkgrey",
	shouldWordComeBeforeItsDefinition: true,
	linebreak: "<br>", // Deprecated. Use carefully if exporting to Quizlet, etc.
};

const PART_OF_SPEECH_TAGS = [
	"adverb",
	"verb",
	"pronoun",
	"noun",
	"adjective",
	"preposition",
	"conjunction",
	"exclamation",
];

const EXTRA_INFORMATION_TAGS = ["PHRASES", "PHRASAL VERBS", "DERIVATIVES", "ORIGIN"];

// Labels that contain other labels should precede the contained labels. For example,
// 'informal' should precede 'formal'.
const LABELS = [
	"mainly US", "Music", "Medicine", "Linguistics", "Microbiology", "Biology", "technical",
	"litarary", "Chemistry", "Mathematics", "Geology", "Prosody", "Heraldry", "humorous",
	"Theology", "historical", "Philosophy", "&", "Scottish informal", "mainly North American",
	"North American,", "North American", "Northern English", "mainly British", "British",
	"Scottish,", "Scottish", "Logic", "Grammar", "informal,", "informal", "formal", "Baseball",
	"Physics", "Golf", "archaic", "US", "Computing", "Printing", "Law", "Anatomy", "Zoology",
	"rare", "Architecture", "Electronics", "Military", "Photography", "Geometry", "Psychoanalysis",
	"Botany", "or dialect", "dialect", "South Asian",
];

// --------------------------------------------------------------------------------------
// Main Entry
// --------------------------------------------------------------------------------------
function run(input) {
	const rawText = input[0];
	const word = getWord(rawText);
	const definition = getDefinition(word, rawText);

	return combineWordAndDefinition(word, definition);
}

// --------------------------------------------------------------------------------------
// Getting the Word
// --------------------------------------------------------------------------------------
const getWord = (text) => {
	// Remove any "·" markers and split by space (removing any trailing punctuation/pronunciation)
	text = text.replaceAll("·", "").split(" ")[0];
	// Clean up homonym numbers and part-of-speech tags
	return removeWordExceptions(text);
};

const removeWordExceptions = (word) => {
	word = removeHomonymNumberFromWord(word);
	word = removePartOfSpeechFromWord(word);
	return word.trim();
};

const removeHomonymNumberFromWord = (word) => {
	// If word ends in "1" or "2" (like "bat1"), remove it
	const lastChar = word.charAt(word.length - 1);
	if (lastChar === "1" || lastChar === "2") {
		return word.substring(0, word.length - 1);
	}
	return word;
};

const removePartOfSpeechFromWord = (word) => {
	PART_OF_SPEECH_TAGS.forEach((pos) => {
		word = word.replace(pos, "");
	});
	return word;
};

// --------------------------------------------------------------------------------------
// Getting the Definition
// --------------------------------------------------------------------------------------
const getDefinition = (word, text) => {
	// Remove extraneous sections, then apply formatting
	let result = pruneText(word, text);
	result = formatText(result);

	// Optionally hide words in example sentences
	if (config.shouldHideWordsInExampleSentences) {
		result = hideWordsInExampleSentences(word, result);
	}
	return result.trim();
};

const pruneText = (word, text) => {
	text = removeAdditionalInfo(text);
	text = removeWordAndPronunciation(text);
	if (!config.shouldIncludeDotDefinitions) {
		text = removeDotDefinitions(text);
	}
	if (!config.shouldIncludeRegularVerbConjugationFormsInfo) {
		text = removeRegularVerbConjugationFormsInfo(word, text);
	}
	if (!config.shouldIncludeComparativeAndSuperlativeFormsInfo) {
		text = removeComparativeAndSuperlativeFormsInfo(word, text);
	}
	if (!config.shouldIncludePluralFormInfo) {
		text = removePluralFormInfo(word, text);
	}
	return text;
};

// --------------------------------------------------------------------------------------
// Pruning Helpers
// --------------------------------------------------------------------------------------
const removeAdditionalInfo = (text) => {
	EXTRA_INFORMATION_TAGS.forEach((tag) => {
		if (text.includes(tag)) {
			text = text.substring(0, text.indexOf(tag));
		}
	});
	return text;
};

const removeWordAndPronunciation = (text) => {
	// Finds the earliest part-of-speech index and cuts off everything before it.
	const indexes = [];
	PART_OF_SPEECH_TAGS.forEach((pos) => {
		if (text.includes(pos)) {
			indexes.push(text.indexOf(pos));
		}
	});
	if (!indexes.length) return text;

	const minIndex = Math.min(...indexes);
	return text.substring(minIndex - 1 === " " ? minIndex - 1 : minIndex);
};

const removeDotDefinitions = (text) => {
	// Removes sections starting at "•" up to the next period (". ")
	while (text.includes("•")) {
		const startIndex = text.indexOf("•") - 1;
		const endIndex = text.indexOf(". ", startIndex);
		if (endIndex === -1) break; // Safety check
		text = text.substring(0, startIndex) + text.substring(endIndex + 1);
	}
	return text;
};

const removeRegularVerbConjugationFormsInfo = (word, text) => {
	// e.g. for "copy", it might remove " (cop ies, copying, copied)"
	const lastCharacterRemovedWord = word.slice(0, -1);
	const target = ` (${lastCharacterRemovedWord}ies, ${word}ing, ${lastCharacterRemovedWord}ied)`;
	return text.replace(target, "");
};

const removeComparativeAndSuperlativeFormsInfo = (word, text) => {
	// e.g. " (happy, happier, happiest)"
	const lastCharacterRemovedWord = word.slice(0, -1);
	const variants = [
		` (${word}r, ${word}st)`,
		` (${word}er, ${word}est)`,
		` (${lastCharacterRemovedWord}ier, ${lastCharacterRemovedWord}iest)`,
	];
	variants.forEach((v) => {
		text = text.replace(v, "");
	});
	return text;
};

const removePluralFormInfo = (word, text) => {
	// e.g. " (plural copies)" for "copy"
	const lastCharacterRemovedWord = word.slice(0, -1);
	const target = ` (plural ${lastCharacterRemovedWord}ies)`;
	return text.replace(target, "");
};

// --------------------------------------------------------------------------------------
// Formatting
// --------------------------------------------------------------------------------------
const formatText = (text) => {
	text = addLineBreakBeforeEachDefinition(text);
	text = formatByPartOfSpeech(text);
	text = breakLinesProperly(text);
	text = text.replace(" ]", "]"); // remove stray space before brackets

	if (config.shouldUseHtmlFormatting) {
		text = applyHtmlStyling(text);
	}
	return text;
};

const addLineBreakBeforeEachDefinition = (text) => {
	// Insert linebreaks before numbered definitions (2, 3, etc.)
	for (let i = 2; i < 10; i++) {
		text = text.replaceAll(` ${i} `, config.linebreak + `${i} `);
	}
	// If including dot definitions, add linebreaks before "•"
	if (config.shouldIncludeDotDefinitions) {
		text = text.replaceAll(" •", config.linebreak + "• ");
	}
	return text;
};

const formatByPartOfSpeech = (text) => {
	PART_OF_SPEECH_TAGS.forEach((pos) => {
		// Insert double linebreak, then single line indentation
		text = text.replace(`${pos} `, `${config.linebreak.repeat(2)}${pos}${config.linebreak}  `);

		// Cancel line breaks if part-of-speech is inside parentheses
		const re = new RegExp(`(\$begin:math:text$[a-z ]*?)${config.linebreak}${config.linebreak}(${pos})${config.linebreak}([a-z ]*?\\$end:math:text$)`);
		text = text.replace(re, "$1 $2 $3");
	});
	// Remove accidental empty double-break if no POS found
	return text.replace(`${config.linebreak}${config.linebreak}`, "");
};

const breakLinesProperly = (text) => {
	PART_OF_SPEECH_TAGS.forEach((element) => {
		let regexWithSquareBrackets = new RegExp(`(${element})\\<br\\>(\\(?[^\\<\\d]*?\\)?) ?(\\[.*?\\]) `, 'g');
		text = text.replace(regexWithSquareBrackets, `$1 $2 $3${config.linebreak}`);
		let regexWithoutSquareBrackets = new RegExp(`(${element})\\<br\\> *(\\([^\\<\\d]*?\\)) `);
		text = text.replace(regexWithoutSquareBrackets, `$1 $2${config.linebreak}`);
	})
	return text;
};

// --------------------------------------------------------------------------------------
// HTML Formatting Helpers
// --------------------------------------------------------------------------------------
const applyHtmlStyling = (text) => {
	text = italicizeExampleSentences(text);
	text = italicizeUsageInfo(text);
	text = italicizeLabels(text);
	text = colorizeItalicText(text);
	return text;
};

const italicizeExampleSentences = (text) => {
	// e.g. "Usage: This is a sample sentence."
	// transforms into "Usage:<i> This is a sample sentence.</i>"
	while (text.includes(": ")) {
		const indexOfColon = text.indexOf(": ");
		const indexOfPeriod = text.indexOf(".", indexOfColon);
		if (indexOfPeriod === -1) break;

		text =
			text.substring(0, indexOfPeriod + 1) +
			"</i>" +
			text.substring(indexOfPeriod + 1);
		text = text.replace(": ", ":<i> ");
	}
	return text;
};

const italicizeUsageInfo = (text) => {
	// e.g. "[formal]" => "<i>[formal]</i>"
	return text
		.replaceAll("[", "<i>[")
		.replaceAll("]", "]</i>");
};

const italicizeLabels = (text) => {
	LABELS.forEach((label) => {
		// Wrap each occurrence of the label with <i>...</i>
		text = text.replaceAll(label, `<i>${label}</i>`);
	});
	return text;
};

const colorizeItalicText = (text) => {
	// Wrap all <i> tags with a span that sets color to config.fontColorForExampleSentences
	text = text.replaceAll("<i>", `<span style='color:${config.fontColorForExampleSentences}'><i>`);
	return text.replaceAll("</i>", "</i></span>");
};

// --------------------------------------------------------------------------------------
// Hiding Words in Example Sentences
// --------------------------------------------------------------------------------------
const hideWordsInExampleSentences = (word, text) => {
	// We try to replace word forms with blanks in sample sentences
	const lastCharRemoved = word.slice(0, -1);
	const lastChar = word.slice(-1);

	const starters = [" ", "(", "“", "-", "—"];
	const endings = [" ", ".", ",", ":", ";", ")", "”", "-", "—"];

	// Word forms that might appear in example sentences
	const generalForms = ["", "d", "ed", "s", "es", "ing", "r", "er", "st", "est", `${lastChar}ed`, `${lastChar}ing`];
	const yEndingForms = ["ing", "ied", "ies", "ier", "iest"];

	starters.forEach((starter) => {
		generalForms.forEach((form) => {
			endings.forEach((ender) => {
				const target = `${starter}${word}${form}${ender}`;
				const replacement = `${starter}${config.blank}${form}${ender}`;
				text = text.replaceAll(target, replacement);
			});
		});
		// For words ending with "y", we handle forms like "copied", "copies", etc.
		yEndingForms.forEach((form) => {
			endings.forEach((ender) => {
				const target = `${starter}${lastCharRemoved}${form}${ender}`;
				const replacement = `${starter}${config.blank}${form}${ender}`;
				text = text.replaceAll(target, replacement);
			});
		});
	});

	return text;
};

// --------------------------------------------------------------------------------------
// Combine Word & Definition
// --------------------------------------------------------------------------------------
const combineWordAndDefinition = (word, definition) => {
	return config.shouldWordComeBeforeItsDefinition
		? `${word}${config.separatorBetweenWordAndItsDefinition}${definition}${config.separatorBetweenGeneratedResults}`
		: `${definition}${config.separatorBetweenWordAndItsDefinition}${word}${config.separatorBetweenGeneratedResults}`;
};

// --------------------------------------------------------------------------------------
// For testing
// --------------------------------------------------------------------------------------
// module.exports = { run };
