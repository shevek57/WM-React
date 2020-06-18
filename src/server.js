import Mongoose from 'mongoose';
import Express from 'express';
import bodyParser from 'bodyParser';


const options = {
    useNewUrlParser: true,
    dbName: 'WM-Store'
    };
    
const url = 'mongodb+srv';

Mongoose.connect(url, options);

const resultSchema = new Mongoose.schema({
                            userID: 'string',
                            timeStamp: 'dateTime',
                            sentenceScore: 'number',
                            totalItemScore: 'number',
                            proportionItemScore: 'number',
                            checkTrialScore: 'number',
                            totalTrials: 'number'
                            });
const Result = Mongoose.model('Result', resultSchema);








// inside the post target, create a Result
// var currentResult = new Result(<from the request.body>);

currentResult.save(function (err) {
  if (err) return handleError(err);
  // saved!
});