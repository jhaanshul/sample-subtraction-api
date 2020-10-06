const helper = require('../utils/helper');

const randNumberPair = (digits) => {
    try {
        let s ='',t='';
        for(let i =0 ;i < digits; i+=1){
            s += '1'
            t += '9'
        }
        const m = parseInt(t, 10);
        const n = parseInt(s, 10);
        const x = helper.getRandomInt(m, n);
        const y = helper.getRandomInt(m, n);
        const res = x < y ?  {min: x, max: y} : {min: y, max: x};
        return res;
    } catch (err){
        throw err;
    }
};

const isBorrowingPossible = (max, min) => {
    let isPossible = false;
    while(max && min){
        if((max % 10) < (min % 10)) {
            isPossible = true;
            break;
        }
        max = Math.floor(max/10);
        min = Math.floor(min/10);
    }
    return isPossible;
};

const parse = (args) => {
    try {
        let { numberOfQuestions, minuedDigits, subtrahendDigits, isBorrow } = (args);
        numberOfQuestions = parseInt(numberOfQuestions);
        minuedDigits = parseInt(minuedDigits);
        subtrahendDigits = parseInt(subtrahendDigits);
        isBorrow = parseInt(isBorrow);
        return {numberOfQuestions, minuedDigits, subtrahendDigits, isBorrow}
    } catch (err) {
        throw err;
    }
} 

const generateQuestions = (args) => {
    try{
        const assetRequiredFields = helper.checkRequired(['numberOfQuestions', 'minuedDigits', 'subtrahendDigits', 'isBorrow'], args);
        if (assetRequiredFields instanceof Error) {
            error = assetRequiredFields;
            throw error;
        };

        let { numberOfQuestions, minuedDigits, subtrahendDigits, isBorrow } = parse(args);
        // assuming the answer should be non negative as specified
        if (subtrahendDigits > minuedDigits) {
            throw new Error(JSON.stringify({
                message: "subtrahend Digits are more than minued digits",
                statusCode: 400
            }))
        }
        const finalRes = [];
        for(let index = 0; index < numberOfQuestions; index +=1 ) {
            let {min, max} = randNumberPair(subtrahendDigits);
            while(isBorrow && !isBorrowingPossible(max, min)){
                const res = randNumberPair(subtrahendDigits);
                min = res.min;
                max = res.max;
            };
            while(!isBorrow && isBorrowingPossible(max, min)) {
                const res = randNumberPair(subtrahendDigits);
                min = res.min;
                max = res.max;
            }
            if(minuedDigits > subtrahendDigits){
                const digitDifference = minuedDigits - subtrahendDigits;
                let res = randNumberPair(digitDifference);
                max = res.max * Math.pow(10, subtrahendDigits) + max;
            }
            let options = [];
            // push the right answer
            options.push(max - min);
            // pushing some random answers
            for(let i = 0; i < 3; i += 1) {
                const correctAns = max - min;
                const digits = correctAns.toString().length;
                // adding a random number to the correct answer at random face value
                let randno = helper.getRandomInt(1,10) * Math.pow(10, helper.getRandomInt(0,digits));
                let modifiedAns = correctAns + randno;
                while(options.includes(modifiedAns)){
                    if(digits===1){
                        randno = helper.getRandomInt(0,7);
                    } else {
                        randno = Math.pow(10, helper.getRandomInt(0,digits));
                    }
                    modifiedAns = correctAns + randno;
                }
                options.push(modifiedAns);
            }
            // shuffling the answers to avoid the ans being at first index always
            options = helper.shuffleArray(options)
            finalRes.push({
                Question: index + 1,
                minuend: max,
                subtrahend: min,
                correctAnswer: max - min,
                options
            });

        };
        return finalRes;
    } catch (err) {
        throw err;
    }
}

module.exports = {generateQuestions, parse, isBorrowingPossible, randNumberPair}