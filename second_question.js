// QUESTION #2

/*
    OBJECTIVE:
    Have the function LongestWord(sen) take the sen parameter
    being passed and return the longest word in the string.  
        a) If there are two or more words that are the same length, 
        return the first word from the string with that length.
        b) Ignore punctuation and assume sen will not be empty.
        c) Words may also contain numbers.

    TO EXECUTE:
    1. In the terminal write: node second_question.js
    2. Write a sentence and enter.
*/

const readline = require('readline');

const read_interface = readline.createInterface({
  input: process.stdin, // Read user input from the console.
  output: process.stdout // Write messages in the console.
});

function LongestWord() {
    read_interface.question('Please enter a phrase: ', (sentence) => {
    console.log("\nPhrase entered: " + sentence);
    // Remove characters other than alphanumeric and spaces, and convert the string to an array of words.
    const sentence_words = sentence.replace(/[^\w\s]/g, '').split(' ');
    
    // "let" is used to reassign with a new value at each iteration of the loop.
    let longestWord = ''; 
    
    // Iterate over each word and find the longest one.
    for (let i = 0; i < sentence_words.length; i++) {
      const word = sentence_words[i];
      
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }
    
    console.log("Longest word: " + longestWord);
    console.log("Extension: " + longestWord.length + " characters\n");
    read_interface.close();
  });
}

LongestWord();
