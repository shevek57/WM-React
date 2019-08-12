import React, {Component} from 'react';
import './styles.css'; // contains className styles for Constants.ACTIVESTATE (shown) and Constants.INACTIVESTATE (hidden)
import MemoryTask from './MemoryTask.js';
import VerificationTask from './VerificationTask.js';
import Constants from './Constants.js';



class Trial extends Component {
    // props: verifications (array), memoryItems (array same size as verifications), onDone (callback to get the list of answers)
    constructor(props) {
        super(props);
        const verifications = [...this.props.verifications];
        const firstVerification = verifications.shift();
        this.state = {
            verificationTaskState: Constants.ACTIVESTATE,
            currentVerification: firstVerification,
            remainingVerifications: verifications,
            verificationAnswers: [],
            memoryTaskState: Constants.INACTIVESTATE,
            currentMemoryItem: '',
            remainingMemoryItems: [...this.props.memoryItems]
        };

        this.handleVerificationResponse = this.handleVerificationResponse.bind(this);
        this.handleMemoryTaskTimeout = this.handleMemoryTaskTimeout.bind(this);
    }

    // callback function from VerficiationTask
    handleVerificationResponse(answer) {
        this.setState((currState) => {
            return {
                verificationTaskState: Constants.INACTIVESTATE,
                memoryTaskState: Constants.ACTIVESTATE,
                currentMemoryItem: currState.remainingMemoryItems.shift(),
                verificationAnswers: currState.verificationAnswers.push(answer)
            }
        })
    }

   // callback function from timeout for showing an item to be remembered
   // Because we GUARANTEE (somehow) that verifications = memoryItems, put the callback to parent here.
   // TODO: Rethink the above so this all smoothly works if there are no Verifications or MemoryTasks (i.e., in practice trials)
    handleMemoryTaskTimeout() {
        // Callback happens whenever MemoryTask updates, so make sure we don't do anything if no update needed.
      //  if (this.state.memoryTaskState === Constants.INACTIVESTATE) return;
        this.setState((currState, props) => {
            if (currState.remainingVerifications.length === 0) {
                props.onDone(currState.verificationAnswers); // send the answers we accumulated to the parent via callback
                return { // shut it all down
                    verificationTaskState: Constants.INACTIVESTATE,
                    memoryTaskState: Constants.INACTIVESTATE
                }
            } else { // Otherwise, we just showed a Memory item for a few seconds so now we need to hide it and show the next verification
                return {
                    verificationTaskState: Constants.ACTIVESTATE,
                    currentVerification: currState.remainingVerifications.shift(),
                    memoryTaskState: Constants.INACTIVESTATE
                }
            }
        })
    }

 
    render() {
        return (
            <div className='Trial'>
                <VerificationTask
                    className={this.state.verificationTaskState}
                    question={this.state.currentVerification}
                    onResponse={this.handleVerificationResponse}
                />
                <MemoryTask
                    className={this.state.memoryTaskState}
                    memoryItem={this.state.currentMemoryItem}
                    onTimeout={this.handleMemoryTaskTimeout}
                />
            </div>
        )
    }
}

export default Trial;
