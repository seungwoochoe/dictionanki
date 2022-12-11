# Dictionanki

### ⚡️ Create your English-English Anki flashcards from Oxford Dictionary on macOS
  
This code can process plain texts that *Automator "Get Definition of Word" action* retrieves from **Oxford Dictionary of English** or **New Oxford American Dictionary**.

## Features
- No internet connection is needed.
- This code makes word-definition sets ready to be imported into Anki. You just need to import the created text file.
- There are several options that you can choose from. Check out the options in the first few lines of [main.js](https://github.com/seungwoochoe/dictionanki/blob/main/main.js).
- You can prune extra information like comparative and superlative form information, plural form information, regular verb conjugation forms information,  *ORIGIN* part, more specific definitions that are starting with "•".
- You can italicize and change font color of labels—*[with object], archaic, mainly British, North American, Biology, etc.— and example sentences.
- You can replace words from example sentences with underscores (______).


## Images
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/1.png" width="250">  
Right click on a word that you want to put into Anki and then select Dictionanki.
You can also assign a shortcut for Dictionanki in macOS System Preferences.
<br/>
<br/>
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/2.png" width="650">  
Then a processed text will be automatically written on an opened (or new) text file. You can add more word-definition sets.
<br/>
<br/>
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/3.png" width="650">  
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

## Quick Action example (check *[Releases](https://github.com/seungwoochoe/dictionanki/releases)* if you want to use pre-made Quick Action)
  
Automator - new Quick Action  
  
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/4.png" width="750">  
  
Save
  
Then assign a shortcut to this Quick Action (.workflow).
  
## Usage tip
Run Quick Action after opening a TextEdit file and minimizing it to the dock or hiding it. Then it will not pop up every time you run the Quick Action.
