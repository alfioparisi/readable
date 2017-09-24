import React, { Component } from 'react';
import uuidv1 from 'uuid';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ''
    };
  }

  render() {
    const { onClick } = this.props;
    const { textarea } = this.state;
    return (
      <form>
        <textarea
          placeholder="Write your comment here."
          value={textarea}
          onChange={evt => this.setState({
            textarea: evt.target.value
          })}
        />
        <input type="submit" value="Comment"
          onClick={evt => {
            evt.preventDefault();
            onClick(
              uuidv1(),
              textarea,
              Date.now()
            );
            this.setState({textarea: ''});
          }}
        />
      </form>
    );
  }
}

export default CommentForm;
