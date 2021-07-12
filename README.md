# MacOS Dictionary.app retriever

### ⚡️ Make your English flashcards in a fast and convinient way
  
This code can process plain text that *Automator "Get Definition of Word" action* retrieves from (macOS Dictionary.app) *Oxford Dictionary of English* or *New Oxford American Dictionary*.

## What this can do
- Prune extra data like *ORIGIN* and detail definition (starting with •) from definition.
- Format (change lines by each meaning, italicize and dim example sentences) definition text with HTML tags.
- Hide original words from example sentences with underscores (______), or whatever you want. 
- Adjust word-definition sets ready-to-be-imported into *Anki*.

## Example
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/1.png" width="250">  
Select a word and press shortcut you registered.
<br/>
<br/>
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/2.png" width="600">  
Then processed text will be automatically written on the opened (or new) TextEdit file. You can add more word-definition sets.
<br/>
<br/>
<img src="https://github.com/SeungwooChoe/macOS-system-dictionary-retriever/blob/main/images/3.png" width="600">  
Import saved text file to Anki. This is what cards will look like after imported.
<br/>
<br/>
  
## Limitations
- Cannot hide most of past and past participle forms of irregular verbs.
- Cannot work with open compound words like *ice cream*.
- Cannot work with phrases.
- Cannot get second+ definitions of homonym words. (Cannot get definition of *bat2*.)
- Formatting is not perfect.
<br/>

### Quick Action example (check *Releases* if you want use pre-made *Quick Action*)
  
Automator - new Quick Action  
  
Get Text Input From Selection  
Set Value of Variable  
Get Value of Variable (check "ignore this action's input" on the option.)  
Run Shell Script (Write "open dict://$1" in shell script, and change Pass input to "as arguments".)  
Get Value of Variable (check "ignore this action's input" on the option.)  
Get Definition of Word (*Oxford Dictionary of English (English (UK))* or *New Oxford American Dictionary (Engsish (US))*)  
Run Javascript (Copy and paste code of main.js to here.)  
Set Contents of TextEdit Document  
  
Save
  
Then assign shortcut to this *Quick Action (.workflow)*.