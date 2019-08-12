
import Utils from './Utils.js';

class Model {

    constructor() {
        var verificationindex = 0; // pointer to current "next" verification question
        var verifications = []; //array of {question: '', answer: ''}
        var possibleLetters = []; // array of Strings
    }

    
    setVerifications (newVerifications) {
        verifications = newVerifications;
    }

    setPossibleLetters(letters) {
        possibleLetters = letters;
    }

    // returns an array of the randomized possible letters.  Returns empty array if numberOfErrors is not a useful number.
    // TODO: a better response to numberOfLetters being too big would be to allow for repeats.
    getRandomLetters(numberOfLetters) {
        if (numberOfLetters <= 0 || numberOfLetters > this.possibleLetters.length) return []
        const letters = [...this.possibleLetters];
        Utils.shuffle(letters);

        return letters.slice(0,numberOfLetters);
    }

    
    // returns an array of the next N verifications.  Restarts at the beginning if we go over the existing number available.
    // TODO check that I don't have any off-by-one errors.  Also, what if numberOfVerifications is gt verifications.length?
    getNextVerifications(numberOfVerifications) {
        const result = [];
        if (this.verifications.length == 0 || numberOfVerifications < 1) return result
        if (this.verificationindex + numberOfVerifications < this.verifications.length) {
             result = this.verifications.slice(this.verificationindex, this.verificationindex + numberOfVerifications);
             this.verificationindex += numberOfVerifications;
        } else {
            result = this.verifications.slice(this.verificationindex,this.verifications.length);
            this.verificationindex += this.verifications.length - numberOfVerifications;
            result.push(...this.verifications.slice(0, this.verificationindex));
        }
        return result
    }



    getVerificationsAndLetters(numberOfPairs) {
        return {question: '',
                answer: '',
                letter: ''}
    }

}


export default Model;