import React, { Component } from 'react';

class DisplayQuestion extends Component {
    render() {
        return (
            <div style={styles.container}>
                <span>Display a good question
                </span>
            </div>
        );
    }
}

let styles = {
    container: {
      backgroundColor: 'red',
      fontFamily: 'Courier'
    }
  };


export default DisplayQuestion;
