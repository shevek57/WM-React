import React, { Component } from 'react';
import './App.css';
import Constants from './Constants.js';
import {Introduction, ExperimentInstructions, CompletionInstructions} from './instructions.js';
import Experiment from './Experiment.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeFrame: 0
    }

    this.handleDone = this.handleDone.bind(this);
  }

  handleDone(answers) {
       this.setState(currState => {return {activeFrame: currState.activeFrame + 1}});
       alert(answers.toString());
  }

  render() {
    return (
      <div className="App">
        {(() => {
          const children = [
            <Introduction onDone={this.advanceFrame} />,
            <ExperimentInstructions
              onDone={(userID) => {
                this.recordID(userID);
                this.advanceFrame()
              }}
            />,
            <Experiment
              allVerifications={this.verificationsForExperiment}
              allAnswers={this.answersForExperiment}
              trialLengths={this.trialLengthsForExperiment}
              onDone={(scoreResults) => {
                this.recordResults(scoreResults);
                this.advanceFrame()
              }}
              />,
              <CompletionInstructions onDone={this.allDone} />
        ];
          return children[this.state.activeFrame % children.length]})()}
      </div>
    );
  }
}

export default App;
