# macOS Dictionary.app retriever for Anki

### ⚡️ Create your English-English Anki flashcards from Oxford Dictionary on macOS
  
This code can process plain texts that *Automator "Get Definition of Word" action* retrieves from **Oxford Dictionary of English** or **New Oxford American Dictionary**.

## Features
- No internet connection is needed.
- This code makes word-definition sets ready to be imported into Anki. You just need to import the created text file.
- There are several options that you can choose from. Check out the options in [main.js](https://github.com/seungwoochoe/macOS-Dictionary-retriever-for-Anki/blob/main/main.js)'s first several lines.
- You can prune extra information like *ORIGIN* of the word and more specific definitions that are starting with "•".
- You can italicize and change font color of labels (e.g. *[with object], archaic, mainly British, North American, Biology*) and example sentences.
- You can replace words from the example sentences with underscores (______).


## Images
<img src="https://github.com/seungwoochoe/macOS-system-dictionary-retriever/blob/main/images/1.png" width="250">  
Select a word and press a shortcut you registered.
<br/>
<br/>
<img src="https://github.com/seungwoochoe/macOS-system-dictionary-retriever/blob/main/images/2.png" width="650">  
Then a processed text will be automatically written on an opened (or new) text file. You can add more word-definition sets.
<br/>
<br/>
<img src="https://github.com/seungwoochoe/macOS-system-dictionary-retriever/blob/main/images/3.png" width="650">  
Import the saved text file into Anki. This is what cards will look like after being imported.
<br/>
<br/>
  
## Limitations
- Cannot hide most of past and past participle forms of irregular verbs.
- Cannot be used for open compound words like *ice cream*.
- Cannot be used for phrases and phrasal verbs.
- Cannot get second+ definitions of homonym words. (Cannot get definition of *bat2*.)
- Formatting is not perfect in a few cases.
<br/>

## Quick Action example (check *[Releases](https://github.com/seungwoochoe/English-Anki-flashcard-maker/releases)* if you want to use pre-made Quick Action)
  
Automator - new Quick Action  
  
<img src="https://github.com/seungwoochoe/macOS-system-dictionary-retriever/blob/main/images/4.png" width="750">  
  
Save
  
Then assign a shortcut to this Quick Action (.workflow).
  
## Usage tip
Run Quick Action after opening a TextEdit file and minimizing it to the dock or hiding it. Then it will not pop up every time you run the Quick Action.