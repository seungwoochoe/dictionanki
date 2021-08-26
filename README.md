# English Anki Flashcard Maker

### ⚡️ Create your English-English Anki flashcards from Oxford Dictionary on macOS
  
This code can process data that *Automator "Get Definition of Word" action* retrieves from **Oxford Dictionary of English** or **New Oxford American Dictionary**.

## Features
- You can use this without internet connection because this retrieves data from the macOS Dictionary.app.
- This can prune extra data like *ORIGIN* and detailed definitions (starting with •).  
- HTML formatting available (change lines by each meaning, italicize and change font color of example sentences and ect.).  
- Hiding words from example sentences with underscores available, so that you can guess word without being exposed by answer.  
- This makes word-definition sets ready-to-be-imported into *Anki*. Just save text file and import it.

## Images
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/1.png" width="250">  
Select a word and press shortcut you registered.
<br/>
<br/>
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/2.png" width="600">  
Then processed text will be automatically written on the opened (or new) TextEdit file. You can add more word-definition sets.
<br/>
<br/>
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/3.png" width="600">  
Import saved text file into Anki. This is what cards will look like after being imported.
<br/>
<br/>
  
## Limitations
- Cannot hide most of past and past participle forms of irregular verbs.
- Cannot work with open compound words like *ice cream*.
- Cannot work with phrases.
- Cannot get second+ definitions of homonym words. (Cannot get definition of *bat2*.)
- Formatting might not be perfect in a few cases.
<br/>

## Quick Action example (check *Releases* if you want to use pre-made Quick Action)
  
Automator - new Quick Action  
  
Get Text Input From Selection  
Set Value of Variable  
Get Value of Variable (check "ignore this action's input" on the option.)  
Run Shell Script (Write "open dict://$1" in shell script, and change Pass input to "as arguments".)  
Get Value of Variable (check "ignore this action's input" on the option.)  
Get Definition of Word (Oxford Dictionary of English (English (UK)) or New Oxford American Dictionary (Engsish (US)))  
Run Javascript (Copy and paste code of main.js to here.)  
Set Contents of TextEdit Document  
  
Save
  
Then assign shortcut to this Quick Action (.workflow).