import React from 'react';

export function Introduction(props) {
    const userID = React.createRef();
    return (
        <div id="init">
            <h1>Memory Study</h1>

            <p className="instrp"> In this study, you will be asked to judge the correctness of simple mathematical statements (e.g., "(6 / 2) + 1 = 4")
            while remembering a series of letters.  Throughout the study you will receive feedback on your performance, such as the number of correctly
                verified statements and the number of letters correctly recalled.</p>


            <p className="instrp">There will be three practice sessions followed by the experiment session:</p>
            <ul><li>Practice 1: Letter recall practice</li>
                <li>Practice 2: Statement judgments practice</li>
                <li>Practice 3: Combined statement judgments and letter recall practice</li>
                <li>Experiment: Combined statement judgments and letter recall</li></ul>


            <p className="instrp"><u>IMPORTANT</u></p>
            <ul>
                <li>Please make sure your browser window is maximized so that you can see all instructions and materials.</li>
                <li>Do not use the Back button throughout the study</li>
                <li>Please do not switch to other browser windows or tabs during the study</li>
            </ul>

            <p className="instrp">If you have any questions, please e-mail Irvin Katz at: <a href="mailto:ikatz@ets.org">ikatz@ets.org</a>. </p>


            <p className="instrp">Please enter your assigned ID and click the "Start" button. Be sure to double-check your ID before you click "Start".  </p>

            <p className="instrp">ID: <input type="text" defaultValue="" id="userid" size="20" ref={userID} /></p>
            <p className="instrp"><button onClick={() => props.onDone(userID.current.value)}>Click to Start</button> </p>
        </div>

    )
}

export function ExperimentInstructions(props) {
    return (<div>				<h1>Experiment Session</h1>
        <ul>
            <li>Complete these trials in the same way you completed Practice Session 3. </li>
            <li>In this session, the number of statements and letters in a trial will vary between 4 and 9. There are 13 trials in total.</li>
            <li>Remember to work as quickly, but as accurately, as you can.</li>
        </ul>

        <p><button onClick={props.onDone}>Start Experiment</button></p></div>)
}

export function CompletionInstructions(prop) {
    return (<div>Completion Instructions</div>)
}

export function Feedback (props) {
    return (
        <div className="trialFeedback">
            <p>You responded to {props.verificationScore} statements correctly out of {props.numberOfVerifications}</p>
            <p>You recalled {props.recallScore} items correctly out of {props.numberOfItems}</p>
            <br />
            <p><button onClick={props.onDone}>Next trial</button></p>
        </div>
    )
}

 