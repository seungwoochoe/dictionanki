# Dictionanki

### ⚡️ Create your English Anki flashcards from macOS system Oxford Dictionary
<br>

## Features
- No internet connection is needed.
- Replace words from example sentences with underscores (______).
- Italicize and dim example sentences and labels (*[with object], archaic, mainly British, North American, Biology*, ...).
- Optionally prune extra information like comparative and superlative form information, plural form information, regular verb conjugation forms information, *ORIGIN* part, and more specific definitions that are starting with "•".
- Configure as you'd like to. Check out the options in the first few lines of [main.js](https://github.com/seungwoochoe/dictionanki/blob/main/main.js).

<br/>

## How to use
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/1.jpg" width="350">  

After the [setup](https://github.com/seungwoochoe/dictionanki#Setup), right click on a word that you want to put into Anki and then select Dictionanki.
(You can also assign a shortcut for Dictionanki in macOS System Settings.)
<br/>
<br/>
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/2.png" width="550">  
Then a processed text will be automatically written on an opened (or new) text file. You can add more word-definition sets. To prevent TextEdit popping up every time, you can minimize (⌘M) the TextEdit window.
<br/>
<br/>
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/3-1.png" width="600">  
Save the text file and import it into Anki. This is what cards will look like after being imported.
<br/>
<br/>

## Setup
Download *Dictionanki.workflow.zip* from [Releases](https://github.com/seungwoochoe/dictionanki/releases) and install the workflow by double clicking it.

And voilà, you're done!

Optionally, you can configure options by opening the workflow located in "~/Library (hidden folder, press ⌘+⇧+. to reveal)/Services" and modifying the JavaScript inside. Check out the first few lines of [main.js](https://github.com/seungwoochoe/dictionanki/blob/main/main.js) to see the available options.

In case you want to create Quick Action by yourself, you can see the [Quick Action example](https://github.com/seungwoochoe/dictionanki#quick-action-example) below.

<br/>

## Limitations
- Cannot hide most of past and past participle forms of irregular verbs.
- Cannot be used for open compound words like *ice cream*.
- Cannot get second+ definitions of homonym words like *bat2*.
- Cannot be used for phrases and phrasal verbs.
- Formatting is not perfect in a few cases.
<br/>

## Quick Action example
  
Automator - new Quick Action  
  
<img src="https://github.com/seungwoochoe/dictionanki/blob/main/images/4.png" width="800">  
  
Save
  
Then assign a shortcut to this Quick Action (.workflow).
