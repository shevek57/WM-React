
// Some utlity functions that might be useful in other apps

const Utils = {

    /**
    * Returns an array with arrays of the given size.
    *
    * @param origArray {Array} Array to split
    * @param chunkSize {Integer} Size of every group
    * 
    * adapted 10 Aug 2019 by irv_katz from:
    * https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
    * 
    */

    chunkArray: (origArray, chunk_size) => {
        const results = [];
        let myArray = [...origArray]; // avoid changing the original array

        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }

        return results
    },


    /**
     * Randomize the elements of an arrary.
     * 
     * Adapted 10 Aug 2019 by irv_katz from:
     *  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array (ES6 solution).
     */
    shuffle: (origArray) => {
        const array = [...origArray]; // avoid changing the original array
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
          [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }

        return array
      }
};

export default Utils;