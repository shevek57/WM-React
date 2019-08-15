import React, {Component} from 'react';
import Trial from './Trial.js';
import Constants from './Constants.js';
import Utils from './Utils.js';

// TODO: Refactor onDone in all Components.  Make better names that are more descriptive 
// of what parameters they expect.

class Experiment extends Component {
// props: allVerifications, allAnswers, trialLengths, onDone(scoreResults)
    constructor(props) {
        super(props);
        this.state = {
            remainingVerifications: [...this.props.allVerifications],
            remainingAnswers: [...this.props.allAnswers],
            remainingTrialLengths: [...this.props.trialLengths],
            scoreResults: [] 
                // array of JSON objects of verifyScore, recallScore, trialLength (TODO: ScoreResult object?)
        };
        
        this.recordResultsAndAdvance = this.recordResultsAndAdvance.bind(this);
    }

    recordResultsAndAdvance(verifyScore, recallScore) {
        const scoreResult = { //TODO: Don't like how scoreResult's structure tethers Experiment to anyone using scoreResult.  
                              // Could make a ScoreResult object that's held in a separate file. At least then there would be a central place for its definition 
                              // and VSC would be able to do automated refactoring if it changes (right?). 
            verifyScore: verifyScore,
            recallScore: recallScore,
            trialLength: this.state.remainingTrialLengths[0]
            };
        if (this.state.remainingTrialLengths.length === 1) { // end if there will be no more Trials
            this.onDone([...this.state.scoreResults, scoreResult])
        } else {
        this.setState(currState => { // if more Trials needed, slice off the last used verifications, answers, and trial length
            const lastTrialLength = currState.remainingTrialLengths[0];
            return {
                remainingVerifications: currState.remainingVerifications.slice(lastTrialLength),
                remainingAnswers: currState.remainingAnswers.slice(lastTrialLength),
                remainingTrialLengths: currState.remainingTrialLengths.slice(1),
                scoreResults: [...currState.scoreResults, scoreResult]
            }
        });
        }
    }
    
    get_N_randomizedItems(numberOfItems) {
        return Utils.shuffle(Constants.POSSIBLEITEMS).slice(0, numberOfItems)
    }
    
    render() {
        return (
            <div className="experiment">
                <Trial 
                  verifications={this.state.remainingVerifications.slice(0, this.state.remainingTrialLengths[0])}
                  verificationAnswers={this.state.remainingAnswers.slice(0, this.state.remainingTrialLengths[0])}
                  memoryItems={this.get_N_randomizedItems(this.state.remainingTrialLengths[0])}
                  onDone={this.recordResultsAndAdvance}
                />
            </div>
            )
    }

}

export default Experiment;
