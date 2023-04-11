const words = require('an-array-of-spanish-words');
const fs = require('fs');

exports.getSatorSquare = (req, res) => {

    const rawData = fs.readFileSync('fiveLettersWords.json');
    const data = JSON.parse(rawData).data;
    //get all palyndrome words from data
    const palyndromeWords = data.filter(word => word === word.split("").reverse().join(""));
    let satorSquares = []
    //try to create a sator square with all the palyndrome words
    for(let i = 0; i < palyndromeWords.length; i++) {
        const satorSquare = ['','','','',''];
        //Find the middle word, this must be a palindrome
        satorSquare[2] = palyndromeWords[i];
        
        //Find the first and last word. The first word has to be a word that, when flipped, is still a valid word in order to place it in the last position. In addition, the middle letter of this word has to be the same as the first letter of the central word.
        let possibleWords = data.filter(word => word[2] === satorSquare[2][0] && data.includes(word.split("").reverse().join("")));
        if(possibleWords.length > 0) {
            satorSquare[0] = possibleWords[0];
            satorSquare[4] = possibleWords[0].split("").reverse().join("");
        } else {
            continue;
        }

        //Find the second and fourth word. This has to be a reversible word, the central letter must be equal to the second letter of the central word and, in addition, its first and last letters must be equal to the second and fourth letters of the first word, respectively.
        possibleWords = data.filter(word => word[2] === satorSquare[2][1] && data.includes(word.split("").reverse().join("")) && word[0] === satorSquare[0][1] && word[4] === satorSquare[0][3]);
        if(possibleWords.length > 0) {
            satorSquare[1] = possibleWords[0];
            satorSquare[3] = possibleWords[0].split("").reverse().join("");
        } else {
            continue;
        }
        satorSquares.push(satorSquare)
    }

    return res.status(200).json({
        satorSquares
    })
}