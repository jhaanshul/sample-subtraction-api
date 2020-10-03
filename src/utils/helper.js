const checkRequired = (required, given) => {
    const error = new Error(),
        missingParameters = [];
    error.statusCode = 400;
    if (required.constructor !== Array) {
        error.message = 'required should be an array';
        return error;
    }

    if (given.constructor === Array) {
        given.forEach((givenParameter) => {
            if (required.indexOf(givenParameter) === -1) {
                missingParameters.push(givenParameter);
            }
        });
    } else {
        required.forEach((requiredParameter) => {
            if (typeof given[requiredParameter] === 'undefined') {
                missingParameters.push(requiredParameter);
            }
        });
    }

    if (missingParameters && missingParameters.length) {
        console.log('missing parameters: ', missingParameters);
    }

    if (!missingParameters.length) {
        return true;
    } else if (missingParameters.length === 1) {
        error.message = `${missingParameters[0]} is a required field`;
        return error;
    }
    error.message = `${missingParameters.join(', ')} are required fields`;
    return error;
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

module.exports = {
    checkRequired, getRandomInt, shuffleArray
};