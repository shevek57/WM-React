import React, {Component} from 'react';
import MemoryTask from './MemoryTask.js';
import VerificationTask from './VerificationTask.js';



class Stimuli extends Component {
    // props: verifications (array), memoryItems (array same size as verifications), onDone (callback to get the list of answers)
    constructor(props) {
        super(props);
        this.state = {
            verificationTaskIsHidden: false,
            verifications: [...this.props.verifications],
            verificationAnswers: [],
            memoryTaskIsHidden: true,
            memoryItems: [...this.props.memoryItems]
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
                memoryItems: currState.memoryItems.slice(1),
                verificationAnswers: [...currState.verificationAnswers, answer]
            }
        })
    }

   // callback function from timeout for showing an item to be remembered
   // Because we GUARANTEE (somehow) that verifications = memoryItems, put the callback to parent here.
   // TODO: Rethink the above so this all smoothly works if there are no Verifications or MemoryTasks (i.e., in practice trials)
    handleMemoryTaskTimeout() {
        this.setState((currState, props) => {
            if (currState.verifications.length === 1) {
                props.onDone(currState.verificationAnswers); // send the answers we accumulated to the parent via callback
                return { // shut it all down
                    verificationTaskIsHidden: true,
                    memoryTaskIsHidden: true
                }
            } else { // Otherwise, we just showed a Memory item for a few seconds so now we need to hide it and show the next verification
                return {
                    verificationTaskIsHidden: false,
                    verifications: currState.verifications.slice(1),
                    memoryTaskIsHidden: true
                }
            }
        })
    }

 
    render() {
        return (
            <div className='Stimuli'>
                {!this.state.verificationTaskIsHidden &&
                    <VerificationTask
                        question={this.state.verifications[0]}
                        onResponse={this.handleVerificationResponse}
                    />}
                {!this.state.memoryTaskIsHidden &&
                    <MemoryTask
                        memoryItem={this.state.memoryItems[0]}
                        onTimeout={this.handleMemoryTaskTimeout}
                    />}
            </div>
        )
    }
}

export default Stimuli;