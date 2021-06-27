# MacOS Dictionary.app retriever


## What this code will do
It will get input from "Get Definition of Word" action in Automator Quick Action and process it to be more readable and compact. It will remove extra information like origin of the word and phrases. It can also hide original words from example sentences. There are some options that you can change via changing variable values placed on top of the code.
You can integrate this code to make your own Automator Quick Action which retrieves definition from Dictionary.app and hide original words from example sentences.


## Quick Action example
Automator - new Quick Action  
get text input from selection  
Set Value of Variable  
Get Value of Variable (You should check "ignore this action's input" on the option.)  
Run Shell Script (Write "open dict://$1" in shell script, and change Pass input to "as arguments".)  
get value of variable (You should check "ignore this action's input" on the option.)  
Get Definition of Word (I used New Oxford American Dictionary.)  
Run Javascript (Copy and paste code from dict.js to here.)  
Set Contents of TextEdit Document  
  
Then assign shortcut to this action.
  
When you select a specific word and press shortcut, dictionary.app search result will show up, and the result will be written in new TextEdit file.
Now you can use this text to import vocabulary flashcard service like *Quizlet*.

## Limitations
- Formatting is not perfect. For example, if there are keywords like "noun" in definition of word, formatting might not act as intended. Also, places of "[with object]" kind of things might not the same as original dictionary.
- I test this code only with *New Oxford American Dictionary (English (US))*.
