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


    handleRecall(e) {
        const item = e.target.value; //setState is asynchronous. because the event (e) is a temporary object, it might not be
                                    //around by the time that the function in setState gets called.  Thus, need to pull the value now.
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
                        <button key={index} value={item} onClick={this.handleRecall}>{item}</button>
                    )}
                </div>
            )}
            <div>
                <button value="_"  onClick={this.handleRecall}>BLANK</button>
                <button onClick={this.handleDelete}>DELETE</button>
            </div>
        </div>
        )
    }

    render() {
        return (
            <div>
                <p>Click the letters in the order presented. Click "blank" to fill in forgotten letters.</p><br />
                {this.createInputField()}
                <span>Items Recalled: {this.state.recalledItems.join(' ')}</span>
                <p /><p />
                <button onClick={this.handleSubmit}>FINISHED</button>
            </div>
        )
    }
}

export default RecallTask;