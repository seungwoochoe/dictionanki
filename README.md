# MacOS Dictionary.app retriever

Make your English flashcard in a fast and convinient way from macOS system dictionary ⚡️
  
This code can process plain text that *Automator "Get Definition of Word" action* retrieves from *New Oxford American Dictionary (English (US))*.

## What this code can do
- Prune extra data from text.
- Format definition to make it readable.
- Modify text easy to import to vocabulary flashcard services like *Anki*.
- Hide original words from example sentences.

## Quick Action example
Automator - new Quick Action  
  
get text input from selection  
Set Value of Variable  
Get Value of Variable (You should check "ignore this action's input" on the option.)  
Run Shell Script (Write "open dict://$1" in shell script, and change Pass input to "as arguments".)  
Get Value of Variable (You should check "ignore this action's input" on the option.)  
Get Definition of Word (I used New Oxford American Dictionary.)  
Run Javascript (Copy and paste code of main.js to here.)  
Set Contents of TextEdit Document  
  
Then assign shortcut to this action. (For reference, I'm using *command-option-1*.)
  
When you select a specific word and press shortcut, dictionary.app search result will show up, and the result will be written in new TextEdit file.

## Limitations
- This code only work with words with no spaces (this code can't be used to format definition of word "high school").
- I test this code only with *New Oxford American Dictionary (English (US))*.
