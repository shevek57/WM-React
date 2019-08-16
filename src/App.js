import React, { Component } from 'react';
import './App.css';
import {Introduction, ExperimentInstructions, CompletionInstructions} from './instructions.js';
import Experiment from './Experiment.js';
import {DataStore} from './DataStore.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeFrame: 0
    }

    this.verificationsForExperiment = DataStore.verificationsForExperiment;
    this.answersForExperiment = DataStore.answersForExperiment;
    this.trialLengthsForExperiment = DataStore.trialLengthsForExperiment;

    this.advanceFrame = this.advanceFrame.bind(this);
  }

  advanceFrame() {
       this.setState(currState => {return {activeFrame: currState.activeFrame + 1}});
  }

  render() {
    return (
      <div className="App">
        {(() => {
          const children = [
            <Introduction onDone={this.advanceFrame} />,
            <ExperimentInstructions
              onDone={(userID) => {
                DataStore.recordID(userID);
                this.advanceFrame()
              }}
            />,
            <Experiment
              allVerifications={DataStore.verificationsForExperiment}
              allAnswers={DataStore.answersForExperiment}
              trialLengths={DataStore.trialLengthsForExperiment}
              onDone={(scoreResults) => {
                DataStore.recordResults(scoreResults);
                this.advanceFrame()
              }}
              />,
              <CompletionInstructions />
        ];
          return children[this.state.activeFrame % children.length]})()}
      </div>
    );
  }
}

export default App;
