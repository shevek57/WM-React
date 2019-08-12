import React, { Component } from 'react';

class RecallLetters extends Component {
    render() {
        return (
            <div className='container'>
                <span className='instructions'>
                Click the letters in the order presented. Click \"blank\" to fill in forgotten letters.
                </span>
                <ButtonArray />
                <RecallDisplay />
            </div>
        )
    }
}

export default RecallLetters;