import React, { Component } from 'react';

//This component renders only one if its children at a time. It progresses to the next child (wrapping back to first) when
//the active child calls the callback function in its "onDone" property.

class FrameSequencer extends Component {

    constructor(props) {
        super(props);
        this.state = { activeFrame: 0 };
        this.isOkToAdvance = false;
        this.advanceFrame = this.advanceFrame.bind(this);
        this.wrapChild = this.wrapChild.bind(this);
    }

    // Note the name of the variable.  It is not "isMounted" deliberately.  The idea here is whether it is
    // ok to advance the frame.  Right now, the only case where it isn't is when the component is not mounted.
    // However, there might be other cases in the future.
    componentDidMount() {
        this.isOkToAdvance = true
    }

    componentWillUnmount() {
        this.isOkToAdvance = false
    }


    wrapChild(child) {
        const functionToCheck = child.props.onDone;
        let newFunction;
        if (functionToCheck && {}.toString.call(functionToCheck) === '[object Function]') { // from https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
            newFunction = (...args) => {
                functionToCheck(...args);
                this.advanceFrame()
            }
        } else {
            newFunction = () => this.advanceFrame()
        }

        return React.cloneElement(child, { onDone: (...args) => newFunction(...args) })

    }

    advanceFrame() {
        this.isOkToAdvance && this.setState(currState => { return { activeFrame: (currState.activeFrame + 1)  }})
    }

    render() {
        const childrenArray = React.Children.toArray(this.props.children);
        if (!childrenArray.length) return;
        const childToRender = this.state.activeFrame % childrenArray.length;
        return this.wrapChild(this.props.children[childToRender])
    }

}

export default FrameSequencer;
