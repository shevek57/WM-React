import React, { Component } from 'react';
import './App.css';
import Stimuli from './Stimuli.js';
import RecallTask from './RecallTask.js';
import Constants from './Constants.js';
//import PostTester from './PostTester.js';
//import Introduction from './Introduction.js'


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
          const children = [<Stimuli
            verifications={['1 + 1 = 2', '2 + 2 = 5', '3 + 2 = 7', '5 + 2 = 5']}
            memoryItems={['H', 'K', 'T', 'Q']}
            onDone={this.handleDone}
          />,
          <RecallTask possibleItems={Constants.POSSIBLEITEMS}
          numberToRecall={4}
            onDone={this.handleDone}
          />];
          return children[this.state.activeFrame % children.length]})()}
      </div>
      // <Introduction onDone={this.handleDone} />
    );
  }
}

export default App;
