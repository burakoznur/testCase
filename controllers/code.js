var getNewWord = function(req, res){
    let word = req.query.word || req.body.word || '';

    if(word == ''){
        res.status(400);
        return res.json({
            message: errorCodesController.getErrorMessages("missingParameters")
        });
    }

    res.status(200);
    res.json({
        message: 'OK',
        newWord: createNewWord(word)
    });
};

var createNewWord = function(word){
    if(word.includes(' ')){
        return word.replace(/\s/g, '');
    }

    word = word.split('');
    let firstControlBit = word.length - 1;
    let secondControlBit = word.length - 1;
    while(firstControlBit > 0 && word[firstControlBit - 1] >= word[firstControlBit]){
        firstControlBit--;
    }
    if(firstControlBit <= 0){
        return 'No answer!';
    }
    while(word[secondControlBit] <= word[firstControlBit - 1]){
        secondControlBit--;
    }

    let tempChar = word[firstControlBit - 1];
    word[firstControlBit - 1] = word[secondControlBit];
    word[secondControlBit] = tempChar;
    
    secondControlBit = word.length - 1;
    while(firstControlBit < secondControlBit) {
        let tempChar = word[firstControlBit];
        word[firstControlBit] = word[secondControlBit];
        word[secondControlBit] = tempChar;
        firstControlBit++;
        secondControlBit--;
    }
    return word.join('');
};

module.exports.getNewWord = getNewWord;