import React, {Component} from 'react';
import Constants from './Constants.js';

class MemoryTask extends Component {
    // props: memoryItem and onTimeout

    componentDidMount() {
        setTimeout(this.props.onTimeout, Constants.MEMORYTASK_MILLIS);
    }

    render() {
        return (
            <div><span>{this.props.memoryItem}</span></div>
        )
    }
}

export default MemoryTask;