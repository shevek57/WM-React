import React, { Component } from 'react';
import './App.css';
//import DisplayQuestion from './DisplayQuestion';
import Stimuli from './Stimuli.js';
import RecallTask from './RecallTask.js';
import PostTester from './PostTester.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeFrame: 0
    }

    this.handleDone = this.handleDone.bind(this);
  }

  handleDone(answers) {
    alert(answers.toString());
    this.setState(currState => {return {activeFrame: currState.activeFrame + 1}});
  }

  render() {
    return (
      // <div className="App">
      //   {(() => {
      //     const children = [<Stimuli
      //       verifications={['1 + 1 = 2', '2 + 2 = 5', '3 + 2 = 7', '5 + 2 = 5']}
      //       memoryItems={['5', '8', '2', '3']}
      //       onDone={this.handleDone}
      //     />,
      //     <RecallTask possibleItems={['1', '2', '3', '4', '5', '6', '7', '8', '10']}
      //       onDone={this.handleDone}
      //     />];
      //     return children[this.state.activeFrame % children.length]})()}
      // </div>
      <PostTester />
    );
  }
}

export default App;
