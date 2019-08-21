import React, { Component } from 'react';

//This component renders only one if its children at a time.

class FrameSequencer extends Component {

    constructor(props) {
        super(props);
        this.state = { activeFrame: 0 };
        this.advanceFrame = this.advanceFrame.bind(this);
        this.wrapChild = this.wrapChild.bind(this);
    }


    wrapChild(child) {
        const functionToCheck = child.props.onDone;
        let newFunction;
        if (functionToCheck && {}.toString.call(functionToCheck) === '[object Function]') { // from https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
              newFunction = (...args) => {
                 functionToCheck(...args);
                 this.advanceFrame();
             }
        } else {
            newFunction = () => this.advanceFrame();
        }

        return React.cloneElement(child, {onDone: (...args) => newFunction(...args)})

    }

    advanceFrame() {
        if (!this.props.children.length) return;
        this.setState(currState => { return { activeFrame: (currState.activeFrame + 1)  }});
    }

    render() {
        const childrenArray = React.Children.toArray(this.props.children);
        if (!childrenArray.length) return;
        const childToRender = this.state.activeFrame % childrenArray.length;
        return this.wrapChild(this.props.children[childToRender]);
    }

}

export default FrameSequencer;
