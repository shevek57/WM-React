import React, {Component} from 'react';
import MemoryTask from './MemoryTask.js';
import VerificationTask from './VerificationTask.js';



class Trial extends Component {
    // props: verifications (array), memoryItems (array same size as verifications), onDone (callback to get the list of answers)
    constructor(props) {
        super(props);
        const verifications = [...this.props.verifications];
        const firstVerification = verifications.shift();
        this.state = {
            verificationTaskIsHidden: false,
            currentVerification: firstVerification,
            remainingVerifications: verifications,
            verificationAnswers: [],
            memoryTaskIsHidden: true,
            currentMemoryItem: '',
            remainingMemoryItems: [...this.props.memoryItems]
        };

        this.handleVerificationResponse = this.handleVerificationResponse.bind(this);
        this.handleMemoryTaskTimeout = this.handleMemoryTaskTimeout.bind(this);
    }

    // callback function from VerficiationTask
    //TODO: do some more tests to determine the action that's needed, allowing for no memory task needed.
    handleVerificationResponse(answer) {
        this.setState((currState) => {
            return {
                verificationTaskIsHidden: true,
                memoryTaskIsHidden: false,
                currentMemoryItem: currState.remainingMemoryItems.shift(),
                verificationAnswers: [...currState.verificationAnswers, answer]
            }
        })
    }

   // callback function from timeout for showing an item to be remembered
   // Because we GUARANTEE (somehow) that verifications = memoryItems, put the callback to parent here.
   // TODO: Rethink the above so this all smoothly works if there are no Verifications or MemoryTasks (i.e., in practice trials)
    handleMemoryTaskTimeout() {
        this.setState((currState, props) => {
            if (currState.remainingVerifications.length === 0) {
                props.onDone(currState.verificationAnswers); // send the answers we accumulated to the parent via callback
                return { // shut it all down
                    verificationTaskIsHidden: true,
                    memoryTaskIsHidden: true
                }
            } else { // Otherwise, we just showed a Memory item for a few seconds so now we need to hide it and show the next verification
                return {
                    verificationTaskIsHidden: false,
                    currentVerification: currState.remainingVerifications.shift(),
                    memoryTaskIsHidden: true
                }
            }
        })
    }

 
    render() {
        return (
            <div className='Trial'>
                {!this.state.verificationTaskIsHidden &&
                    <VerificationTask
                        question={this.state.currentVerification}
                        onResponse={this.handleVerificationResponse}
                    />}
                {!this.state.memoryTaskIsHidden &&
                    <MemoryTask
                        memoryItem={this.state.currentMemoryItem}
                        onTimeout={this.handleMemoryTaskTimeout}
                    />}
            </div>
        )
    }
}

export default Trial;
