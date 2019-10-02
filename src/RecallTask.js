import React, {Component} from 'react';
import Constants from './Constants.js';
import Utils from './Utils.js';

class RecallTask extends Component {

    // props: possibleItems, numberToRecall, onDone(recalledItems)

    constructor(props) {
        super(props);

        this.state = {
            recalledItems: []
        };

        this.handleRecall = this.handleRecall.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createInputField = this.createInputField.bind(this);

    }


    handleRecall(item) {
        if (this.state.recalledItems.length === this.props.numberToRecall) {
            alert('Must recall exactly ' + this.props.numberToRecall + ' items.');
        } else {
            this.setState(currState => ({
                recalledItems: [...currState.recalledItems, item]
            }))
        }
    }

    handleDelete() {
        if (this.state.recalledItems.length === 0) return;
        this.setState(currState => ({
            recalledItems: currState.recalledItems.slice(0, currState.recalledItems.length - 1)
        }))
    }

    handleSubmit() {
        if (this.state.recalledItems.length !== this.props.numberToRecall) {
            alert('Must recall exactly ' + this.props.numberToRecall + ' items.');    
        } else {
            this.props.onDone(this.state.recalledItems)
        }
    }


    createInputField() {
        const itemChunks = Utils.chunkArray(this.props.possibleItems, Constants.RECALLBUTTON_ROW_LENGTH);

        return (<div>
            {itemChunks.map((chunk, index) => // keys added to avoid warning from React
                <div key={index}>
                    {chunk.map((item, index) => // keys added to avoid warning from React
                        <button className="recallButton" style={{width: '3em'}} key={index} onClick={() => this.handleRecall(item)}>{item}</button>
                    )}
                </div>
            )}
            <div>
                <button className="recallButton" style={{width: '4.5em'}} onClick={() => this.handleRecall('_')}>BLANK</button>
                <button className="recallButton" style={{width: '4.5em'}} onClick={this.handleDelete}>DELETE</button>
            </div>
        </div>
        )
    }

    render() {
        return (
            <div>
                <p>Click the letters in the order presented. Click "blank" to fill in forgotten letters.</p><br />
                {this.createInputField()}
                <p>Items Recalled: {this.state.recalledItems.join(' ')}</p>
                <p /><p />
                <button className="recallButton" style={{width: '9em'}} onClick={this.handleSubmit}>FINISHED</button>
            </div>
        )
    }
}

export default RecallTask;