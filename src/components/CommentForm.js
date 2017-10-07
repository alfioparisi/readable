import React, { Component } from 'react';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';
import { addCommentOnServer } from '../actions/comments';

/**
  @param {string} : the id of the parent post
  @param {string} : the logged in user, if any
  @param {function} : add a comment on server and on Redux
*/
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: '',
      invalidities: []
    };
    this.addInvalidity = this.addInvalidity.bind(this);
    this.getInvalidities = this.getInvalidities.bind(this);
    this.checkInvalidity = this.checkInvalidity.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  addInvalidity(invalidityMsg) {
    const { invalidities } = this.state;
    invalidities.push(invalidityMsg);
  }

  getInvalidities() {
    const { invalidities } = this.state;
    return invalidities.join('\n');
  }

  checkInvalidity(content) {
    // Not empty.
    if (!content.trim().length) {
      this.addInvalidity(`Can't be empty.`);
    }
    // No special characters.
    if (content.trim().match(/[^a-zA-Z0-9]/g)) {
      this.addInvalidity('No special characters.')
    }
    this.setState({textarea: content});
  }

  checkValidity() {
    const { parentId, currentUser, onClick } = this.props;
    const { textarea, invalidities } = this.state;
    invalidities.length = 0;
    this.checkInvalidity(this.input.value);
    if (invalidities.length) this.input.setCustomValidity(this.getInvalidities());
    else {
      this.input.setCustomValidity('');
      const author = currentUser || 'Anonymous';
      onClick(uuidv1(), parentId, textarea, author, Date.now());
      this.setState({textarea: ''});
    }
  }

  render() {
    const { textarea } = this.state;
    return (
      <form>
        <textarea ref={input => this.input = input}
          placeholder="Write your comment here."
          value={textarea}
          onChange={evt => this.checkInvalidity(evt.target.value)}
        />
        <input type="submit" value="Comment"
          onClick={evt => {
            this.checkValidity();
          }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (id, parentId, body, author, timeCreated) => {
    dispatch(addCommentOnServer(id, parentId, body, author, timeCreated));
    ownProps.onClick();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
