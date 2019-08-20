import React, {Component} from 'react';
import MemoryTask from './MemoryTask.js';



class Stimuli_MemoryPractice extends Component {
    // props: memoryItems (array), onDone (callback to get the list of answers)
    constructor(props) {
        super(props);
        this.state = {
            memoryItems: [...this.props.memoryItems]
        };

        this.handleMemoryTaskTimeout = this.handleMemoryTaskTimeout.bind(this);
    }

   // callback function from timeout for showing an item to be remembered
   // Because we GUARANTEE (somehow) that verifications = memoryItems, put the callback to parent here.
   // TODO: Rethink the above so this all smoothly works if there are no Verifications or MemoryTasks (i.e., in practice trials)
    handleMemoryTaskTimeout() {
        this.setState((currState, props) => {
            if (currState.memoryItems.length === 0) {
                props.onDone(''); // send the answers we accumulated to the parent via callback
                return { 
                }
            } else { // Otherwise, we just showed a Memory item for a few seconds so now we need to hide it and show the next verification
                return {
                    memoryItems: currState.memoryItems.slice(1),
                }
            }
        })
    }

 
    render() {
        return (
            <div className='Stimuli'>
                <MemoryTask
                            memoryItem={this.state.memoryItems[0]}
                            onDone={this.handleMemoryTaskTimeout}
                        />
            </div>
        )
    }
}

export default Stimuli_MemoryPractice;
