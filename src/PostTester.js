import React, {Component} from 'react';

class PostTester extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', response: 'nothing yet'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        fetch('https://ets-cls.org/ikatz/wm/wm_test.php', {
            method: 'POST',
            body: JSON.stringify({
                    request: 'saveLog',
                    log: 'TestLOG',
                    sid: 'testSID',
                    stage: 'testSTAGE',
                    userID: 'testUSERID'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({response: 'looking at rsponse'});
            return response.json()
        }).then(response => this.setState({response: response}));
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <p><span>{this.state.response}</span></p>
          </form>
        );
      }
    }

    export default PostTester;