import React, {Component} from 'react';
import Model from './Model.js'; // link to various functions for getting info

/*
    I've been thinking about how much Trial should try to do.  Should it include the recall task and the feedback? Should
    it have state, keeping track of who needs to be visible? Does it keep track of score?

    even if Trial is a component that only deals with verification and letter display, it still needs to relate the 
    score back to the parent component.  BTW, if there's a parent component, then we would get the verifications and
    letters from that.  

    Maybe Trial (misnamed? I can't think of the correct term) should only deal with creating the VerificationTasks and
    MemoryTasks (note -- not RecallTask) and hooking up the state information so that they flow from one to the other.  The
    callback from VerificationTask should move the active frame to be the next item in the list (likely a MemoryTask) and
    also send the answer given to the parent, who does the scoring.

    You know, rather than making a bunch of VerificationTasks and MemoryTasks, maybe just make one and we change state to go
    from one to the next.  At first, VerificationTask is activte (so visible) and MemoryTask is inactive. Starts off with the
    first verification question there. When an answer comes back, send it to the parent via the callback, make the 
    VerificationTask inactive, make change the state to the current letter and make the MemoryTask active.  When that
    times out, update the state to the next verification question and switch the active frame back.  Need to put the css
    here so that can see that 'active' and 'inactive' classNames make the Task hidden or not.
*/

class Trial extends Component {
    constructor(props) {
        super(props);

        // initialize state

        this.handleVerificationResponse = this.handleVerificationResponse.bind(this);
        this.handleMemoryTimeout = this.handleMemoryTimeout.bind(this);
    }

    handleVerificationResponse () {
        // callback function from VerficiationTask
    }

    handleMemoryTimeout () {
        // callback function from timeout for showing a letter
    }

    //TODO: separate getting verification info and letter info.  I did it this way rather than getting separately then
    // interweaving the two components
    generateVerifyRecallPairs (numberOfPairs) {
        Model.getVerificationsAndLetters(numberOfPairs).reduce((result, verificationAndLetter) => 
                                                                    result.push(<VerificationTask 
                                                                            question={verificationAndLetter.question} 
                                                                            answer={verificationAndLetter.answer} 
                                                                            onResponse={this.handleVerificationResponse}
                                                                            />, 
                                                                            <MemoryTask letter={verificationAndLetter.letter} 
                                                                                        OnTimeOut={this.handleMemoryTimeout} />)
                                                            );  
    }

    render() {
        return generateVerifyRecallPairs(this.props.trialLength) // needs to be in {}?
    }
}

export default Trial;
