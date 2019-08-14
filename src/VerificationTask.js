import React, {Component} from 'react';
import Constants from './Constants.js';

class VerificationTask extends Component {
    // props: question, onResponse(answer)
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        setTimeout((() => this.props.onResponse(Constants.TIMEOUT_VALUE)), Constants.VERIFICATION_MILLIS);
    }

    handleClick = (event) => {
        // call onResponse with the parameter that's the value of the thing clicked
        this.props.onResponse(event.target.value);
    }

    render() {
        return (
            <div>
                <span>{this.props.question}</span>
                <div>
                    <button onClick={this.handleClick} value={Constants.LEFTBUTTON_VALUE}>{Constants.LEFTBUTTON_TITLE}</button>
                    <button onClick={this.handleClick} value={Constants.RIGHTBUTTON_VALUE}>{Constants.RIGHTBUTTON_TITLE}</button>
                </div>
            </div>
        )
    }
}

export default VerificationTask;