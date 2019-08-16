// Temporary approach to a data store -- both for the things that should be displayed as well as logging data.  
import Utils from './Utils.js';

export const DataStore = {};

function divideVerifyStrings (vString) {
    const sentences = [];

    const answers = vString.split("#").map((answerAndSentence) => {
                                                let answer = '';
                                                let sentence = '';
                                                [answer, sentence] = answerAndSentence.split("\t");
                                                sentences.push(sentence);
                                                return answer
    });

    return [answers, sentences]
};


// eslint-disable-next-line
const stimuliForExperiment = "\
1	(2 × 6) - 7 = 5	#\
1	(1 × 5) + 2 = 7	#\
0	(6 / 2) - 2 = 3	#\
0	(2 / 2) + 6 = 6	#\
1	(2 × 4) - 5 = 3	#\
0	(5 / 1) + 5 = 8	#\
1	(2 × 2) - 3 = 1	#\
1	(4 / 2) - 1 = 1	#\
0	(4 × 4) - 8 = 9	#\
1	(6 / 3) + 6 = 8	#\
1	(6 / 1) - 4 = 2	#\
0	(2 × 9) - 4 = 12	#\
0	(4 / 4) + 9 = 11	#\
0	(2 × 2) + 9 = 12	#\
0	(3 × 6) - 8 = 8	#\
0	(3 × 3) + 6 = 17	#\
1	(4 × 4) + 1 = 17	#\
1	(5 / 1) - 3 = 2	#\
1	(2 × 8) - 4 = 12	#\
0	(8 / 4) - 1 = 2	#\
0	(1 × 4) - 3 = 2	#\
0	(8 / 2) + 6 = 12	#\
0	(4 / 1) - 3 = 2	#\
1	(3 × 3) - 8 = 1	#\
0	(4 / 2) + 3 = 4	#\
1	(9 / 3) - 2 = 1	#\
0	(9 / 1) - 5 = 2	#\
1	(1 × 9) + 2 = 11	#\
0	(2 × 4) + 7 = 13	#\
1	(1 × 7) - 1 = 6	#\
1	(9 / 1) - 7 = 2	#\
1	(8 / 8) + 5 = 6	#\
1	(9 / 9) + 3 = 4	#\
1	(3 / 1) + 6 = 9	#\
1	(2 × 7) - 4 = 10	#\
0	(2 × 7) - 5 = 11	#\
0	(6 / 1) + 8 = 16	#\
1	(3 × 6) - 2 = 16	#\
0	(2 / 1) - 1 = 2	#\
1	(8 / 4) + 5 = 7	#\
1	(7 / 7) + 8 = 9	#\
1	(1 × 3) + 11 = 14	#\
0	(2 × 5) - 3 = 9	#\
0	(2 × 6) + 2 = 13	#\
0	(1 × 7) + 9 = 15	#\
1	(3 × 4) + 3 = 15	#\
0	(1 × 9) - 7 = 1	#\
1	(8 / 2) - 1 = 3	#\
0	(1 × 6) - 2 = 3	#\
0	(2 × 3) - 1 = 3	#\
1	(3 / 3) + 9 = 10	#\
0	(3 × 4) - 4 = 6	#\
0	(6 / 3) + 5 = 6	#\
0	(9 / 3) + 8 = 13	#\
1	(2 × 3) + 6 = 12	#\
1	(2 × 5) + 8 = 18	#\
0	(5 / 5) + 5 = 7	#\
1	(2 / 1) + 2 = 4	#\
0	(8 / 8) + 7 = 10	#\
1	(6 / 2) - 1 = 2	#\
0	(1 / 1) + 5 = 7	#\
1	(4 / 2) + 5 = 7	#\
0	(9 / 9) + 5 = 8	#\
1	(8 / 1) - 4 = 4	#\
0	(2 × 7) + 3 = 15	#\
1	(6 / 1) - 3 = 3	#\
1	(7 / 1) - 6 = 1	#\
1	(2 × 8) + 1 = 17	#\
1	(3 × 6) - 9 = 9	#\
0	(4 × 4) - 1 = 14	#\
1	(3 × 4) - 9 = 3	#\
0	(3 × 3) + 4 = 11	#\
1	(1 × 3) + 8 = 11	#\
0	(5 / 1) - 1 = 2	#\
0	(6 / 3) + 2 = 5	#\
1	(2 × 6) + 7 = 19	#\
0	(8 / 2) - 3 = 2	#\
0	(2 × 5) - 7 = 4	#\
";

[DataStore.answersForExperiment, DataStore.verificationsForExperiment] = divideVerifyStrings(stimuliForExperiment);

DataStore.trialLengthsForExperiment = [4,5,7].concat(Utils.shuffle([6,4,7,6,4,6,7,5,9,5]));

DataStore.recordID = (id) => {};

DataStore.recordResults = (results) => {};