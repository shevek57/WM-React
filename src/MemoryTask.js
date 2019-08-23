import React from 'react';
import PropTypes from 'prop-types';
import Constants from './Constants.js';

// setTimer and useEffect pattern from: https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks

const MemoryTask = ({memoryItem, onDone}) => {
    React.useEffect(() => {
        const timer = setTimeout(onDone, Constants.MEMORYTASK_MILLIS);
        return () => clearTimeout(timer);
    }, []);
    return <span>{memoryItem}</span>
}

MemoryTask.propTypes = {
    memoryItem: PropTypes.string,
    onDone: PropTypes.func
}


// class MemoryTask extends Component {
//     // props: memoryItem and onDone

//     componentDidMount() {
//         this.timer = setTimeout(this.props.onDone, Constants.MEMORYTASK_MILLIS);
//     }

//     componentWillUnmount() {
//         clearTimeout(this.timer)
//     }

//     render() {
//         return (
//             <span>{this.props.memoryItem}</span>
//         )
//     }
// }

export default MemoryTask;