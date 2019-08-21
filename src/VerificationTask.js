import React from 'react';
import PropTypes from 'prop-types';
import Constants from './Constants.js';


const VerificationTask = ({ question, onDone }) => {
    React.useEffect(() => {
        const timer = setTimeout((() => onDone(Constants.TIMEOUT_VALUE)), Constants.VERIFICATION_MILLIS);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <p>Read this statement out loud before responding:</p>
            <p></p>
            <span>{question}</span><p></p>
            <div>
                <button onClick={() => onDone(Constants.LEFTBUTTON_VALUE)}>{Constants.LEFTBUTTON_TITLE}</button>
                <button onClick={() => onDone(Constants.RIGHTBUTTON_VALUE)}>{Constants.RIGHTBUTTON_TITLE}</button>
            </div>
        </div>
    )
}

VerificationTask.propTypes = {
    question: PropTypes.string,
    onDone: PropTypes.func
}

// class VerificationTask extends Component {
//     // props: question, onDone(answer)

//     constructor(props) {
//         super(props);

//         this.handleClick = this.handleClick.bind(this);
//     }

//     componentDidMount() {
//         this.timer = setTimeout((() => this.props.onDone(Constants.TIMEOUT_VALUE)), Constants.VERIFICATION_MILLIS);
//     }

//     componentWillUnmount() {
//         clearTimeout(this.timer)
//     }

//     handleClick = (event) => {
//         // call onResponse with the parameter that's the value of the thing clicked
//         this.props.onDone(event.target.value);
//     }

//     render() {
//         return (
//             <div>
//                 <p>Read this statement out loud before responding:</p>
//                 <p></p>
//                 <span>{this.props.question}</span><p></p>
//                 <div>
//                     <button onClick={this.handleClick} value={Constants.LEFTBUTTON_VALUE}>{Constants.LEFTBUTTON_TITLE}</button>
//                     <button onClick={this.handleClick} value={Constants.RIGHTBUTTON_VALUE}>{Constants.RIGHTBUTTON_TITLE}</button>
//                 </div>
//             </div>
//         )
//     }
// }

export default VerificationTask;