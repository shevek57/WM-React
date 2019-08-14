import React, {Component} from 'react';
import VerificationTask from './VerificationTask.js';



class Stimuli_VerificationPractice extends Component {
    // props: verifications (array), onDone (callback to get the list of answers)
    constructor(props) {
        super(props);
        this.state = {
            verifications: [...this.props.verifications],
            verificationAnswers: [],
        };

        this.handleVerificationResponse = this.handleVerificationResponse.bind(this);
    }

    // callback function from VerficiationTask
    handleVerificationResponse(answer) {
        this.setState((currState) => {
            if (currState.verifications.length === 0) {
                props.onDone(currState.verificationAnswers); // send the answers we accumulated to the parent via callback
                return
            } else {
                return {
                    verifications: currState.verifications.slice(1),
                    verificationAnswers: [...currState.verificationAnswers, answer]
                }
            }
        })
    }

 
    render() {
        return (
            <div className='Stimuli'>
                        <VerificationTask
                            question={this.state.verifications[0]}
                            onResponse={this.handleVerificationResponse}
                        />
            </div>
        )
    }
}

export default Stimuli_VerificationPractice;
