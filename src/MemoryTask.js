import React, {Component} from 'react';
import Constants from './Constants.js';

class MemoryTask extends Component {
    // props: memoryItem and onDone

    componentDidMount() {
        this.timer = setTimeout(this.props.onDone, Constants.MEMORYTASK_MILLIS);
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <span>{this.props.memoryItem}</span>
        )
    }
}

export default MemoryTask;