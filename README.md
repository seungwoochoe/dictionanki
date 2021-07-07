# MacOS Dictionary.app retriever

**Make your English flashcard in a fast and convinient way ⚡️**
  
This code can process plain text that *Automator "Get Definition of Word" action* retrieves from *macOS Dictionary.app Oxford Dictionary of English (English (UK))* or *New Oxford American Dictionary (English (US))*.

## What this code can do
- Prune extra data like *ORIGIN* and detail definition (starting with •) from text.
- Format (change lines by each meaning, italicize and dim example sentences) definition text to make it more readable.
- Modify text to make it easy to import to the vocabulary flashcard services like *Anki*.
- Hide original words from example sentences with underscores (______).

## Limitations
- Cannot work with open compound words like *ice cream*.
- Cannot work with phrases.
- Cannot get second+ defititions of homonym words. (Cannot get defitition of *bat2*.)

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
  
Then assign shortcut to *Quick Action (.workflow)*. (For reference, I'm using *command-option-1*.)
  
When you select a specific word and press shortcut, dictionary.app search result will show up, and the result will be written in opened (or new, if there is no opened TextEdit file) TextEdit file.
