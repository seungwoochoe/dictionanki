# MacOS Dictionary.app retriever

It will get input from "Get Definition of Word" action in *Automator* and process it to be more readable and compact.
There are several options that you can adjust via changing variable values placed on top of the code.
You can integrate this code to make your own Automator Quick Action which retrieves definition from Dictionary.app.

## What this code can do
- Prune unnecessary data from text.
- Format definition in order to import vocabulary flashcard services like *Anki* or *Quizlet*.
- Hide original word from example sentences.

## Quick Action example
Automator - new Quick Action  
get text input from selection  
Set Value of Variable  
Get Value of Variable (You should check "ignore this action's input" on the option.)  
Run Shell Script (Write "open dict://$1" in shell script, and change Pass input to "as arguments".)  
Get Value of Variable (You should check "ignore this action's input" on the option.)  
Get Definition of Word (I used New Oxford American Dictionary.)  
Run Javascript (Copy and paste code from dict.js to here.)  
Set Contents of TextEdit Document  
  
Then assign shortcut to this action. (For reference, I'm using *command-option-1*.)
  
When you select a specific word and press shortcut, dictionary.app search result will show up, and the result will be written in new TextEdit file.

## Limitations
- This code only work with words with no spaces (this code can't be used to format definition of word "high school").
- Formatting is not perfect. For example, if there are keywords like "noun" in definition of word, formatting might not act as intended. Also, places of "[with object]" kind of things might not the same as original dictionary.
- I test this code only with *New Oxford American Dictionary (English (US))*.
