// QUESTION #3

/*
    OBJECTIVE:
    To determine the smallest substring of N that contains all the characters in K.
        a) Using the function MinWindowSubstring(strArr) take the array 
        of strings stored in strArr, which will contain only two strings, 
            - The string N.
            - The string K of some characters.
        b)  Both parameters will be strings ranging in length 
        from 1 to 50 characters.
        c) All of K's characters will exist somewhere in the string N.
        d) Both strings will only contain lowercase alphabetic characters.

    TO EXECUTE:
    1. In the terminal write: node third_question.js
    2. Write in the string N some lowercase characters.
    3. Write a small string in the string K, with 
        some letters that are in the string N.
*/

const readline = require('readline');

const read_interface = readline.createInterface({
  input: process.stdin, // Read user input from the console.
  output: process.stdout // Write messages in the console.
});

// Check if the string contains only lowercase characters.
function validateInput(str) {
  const lowercase_chrtr = /^[a-z]+$/;
  return lowercase_chrtr.test(str);
}

// Asynchronous user input capture.
function user_input(user_request) {
  return new Promise((resolve) => {
    read_interface.question(user_request, (input) => {
      resolve(input.trim()); // Remove any blank space of user input.
    });
  });
}

async function MinWindowSubstring() {
  let N = '';
  let K = '';

  // Request and validate the N string
  while (true) {
    N = await user_input('\nEnter string N (lowercase characters only): ');
    if (validateInput(N)) { //Verify lowercase condition
      break;
    } else {
      console.log('Error: The string N must contain only lowercase characters. Please try again.\n');
    }
  }

  // Request and validate the K string
  while (true) {
    K = await user_input('Enter string K (lowercase characters only): ');
    if (validateInput(K)) { //Verify lowercase condition
      break;
    } else {
      console.log('Error: The string K must contain only lowercase characters. Please try again.\n');
    }
  }

  let minLength = Infinity;
  // Store the shortest substring containing all characters of the string K.
  let result = '';

  // Create an object to count characters in K
  const char_K_Count = {};
  for (const char of K) {
    char_K_Count[char] = char_K_Count[char] + 1 || 1;
  }

  // To count of characters in the current substring
  let act_pos_left = 0;
  let act_pos_right = 0;
  let count = 0;

  while (act_pos_right < N.length) {
    const rightChar = N[act_pos_right];

    if (char_K_Count[rightChar] !== undefined) {
      char_K_Count[rightChar]--;
      // Count the number of characters of K found in N by right.
      if (char_K_Count[rightChar] >= 0) {
        count++;
      }
    }

    // Checks if a substring has been found that contains all the characters of K.
    while (count === K.length) {
      const currentLength = act_pos_right - act_pos_left + 1;

      // Update the smallest substring found.
      if (currentLength < minLength) {
        minLength = currentLength;
        result = N.substr(act_pos_left, currentLength);
      }

      const leftChar = N[act_pos_left];

      if (char_K_Count[leftChar] !== undefined) {
        char_K_Count[leftChar]++;
        // Count the number of characters of K found in N by left.
        if (char_K_Count[leftChar] > 0) {
          count--;
        }
      }
      act_pos_left++;
    }
    act_pos_right++;
  }

  console.log('The smallest string containing all the characters of K is:', result, '\n');
  read_interface.close();
}

MinWindowSubstring().catch((error) => {
  console.error('Error:', error);
  read_interface.close();
});

