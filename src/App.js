import React from 'react';
import './App.css';
import {Introduction, ExperimentInstructions, CompletionInstructions} from './instructions.js';
import Experiment from './Experiment.js';
import {DataStore} from './DataStore.js';
import FrameSequencer from './FrameSequencer.js';


function App() {

  return (
    <FrameSequencer>
      <Introduction />
      <ExperimentInstructions onDone={userID => DataStore.recordID(userID)} />
      <Experiment
        allVerifications={DataStore.verificationsForExperiment}
        allAnswers={DataStore.answersForExperiment}
        trialLengths={DataStore.trialLengthsForExperiment}
        onDone={scoreResults => DataStore.recordResults(scoreResults)}
      />
      <CompletionInstructions />
    </FrameSequencer>
  )
}

export default App;
