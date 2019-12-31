import React from 'react';
import './App.css';
import {Introduction, ExperimentInstructions, CompletionInstructions} from './instructions.js';
import Experiment from './Experiment.js';
import DataStore from './DataStore.js';
import FrameSequencer from './FrameSequencer.js';
import Constants from './Constants';


function App() {

  return (
    <div className="main">
    <FrameSequencer>
      <Introduction onDone={userID => DataStore.recordID(userID)} />
      <ExperimentInstructions />
      <Experiment
        allVerifications={DataStore.verificationsForExperiment}
        allAnswers={DataStore.answersForExperiment}
        trialLengths={DataStore.trialLengthsForExperiment}
        onDone={unSummarizedScoreResults => DataStore.recordResults(summarizeResults(unSummarizedScoreResults))}
      />
      <CompletionInstructions />
    </FrameSequencer>
    </div>
  )
}

// TODO: The structure of the results object is here, in Experiment.js, and in the nodejs server.
// Too many places!!
function isCheckTrial({trialLength}) {
  return trialLength === Constants.CHECK_TRIAL_LENGTH
}

function summarizeResults(unSummarizedScoreResults) {
  return unSummarizedScoreResults.reduce((totals, current) => {
    if (isCheckTrial(current)) {
      return {...totals, checkTrialScore: current.verifyScore}
    } else {
      return {
        verifyScore: totals.verifyScore + current.verifyScore,
        recallScore: totals.recallScore + current.recallScore,
        proportionItemScore: totals.proportionItemScore + ((1.0 * current.verifyScore) / current.trialLength),
        trialLength: totals.trialLength + current.trialLength
      }
    }
  }, {verifyScore: 0, recallScore: 0, proportionItemScore: 0.0, trialLength: 0})
}

export default App;
