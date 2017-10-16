import React, { Component } from 'react';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';
import { addCommentOnServer } from '../actions/comments';
import classNames from 'classnames';

/**
  @param {string} : the id of the parent post
  @param {string} : the logged in user, if any
  @param {function} : add a comment on server and on Redux
*/
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ''
    };
    // Hold the invalidities messages for form validation.
    this.invalidities = [];
    // Requirements for each input in the form.
    this.requirements = [
      // Can't be empty.
      {
        isInvalid(value) {
          return value.trim().length === 0;
        },
        invalidityMsg: `Can't be empty.`,
        invalid: true,
        valid: false
      }
    ];
    this.addInvalidity = this.addInvalidity.bind(this);
    this.getInvalidities = this.getInvalidities.bind(this);
    this.checkInvalidity = this.checkInvalidity.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  // Push a new invalidity message into `this.invalidities`.
  addInvalidity(invalidityMsg) {
    this.invalidities.push(invalidityMsg);
  }

  // Take `this.invalidities` and return a list of messages.
  getInvalidities() {
    return this.invalidities.join('\n');
  }

  // For each requirement, if it's invalid add a new message and set up the classes.
  checkInvalidity(value) {
    this.requirements.forEach(requirement => {
      if (requirement.isInvalid(value)) {
        this.addInvalidity(requirement.invalidityMsg);
        requirement.valid = false;
        requirement.invalid = true;
      } else {
        requirement.invalid = false;
        requirement.valid = true;
      }
    });
    this.setState({textarea: value});
  }

  // If there are no invalidities dispatch the comment, else show the messages.
  checkValidity() {
    const { parentId, currentUser, onClick } = this.props;
    const { textarea } = this.state;
    this.invalidities.length = 0;
    this.checkInvalidity(this.input.value);
    if (this.invalidities.length) this.input.setCustomValidity(this.getInvalidities());
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
      <div className="comment-form">
        <form>
          <div>
            <textarea ref={input => this.input = input}
              placeholder="Write your comment here."
              value={textarea}
              onChange={evt => this.checkInvalidity(evt.target.value)}
              required
            />
            <ul>
              {this.requirements.map(requirement => (
                <li key={requirement.invalidityMsg}
                  className={classNames({
                    'invalid': requirement.invalid,
                    'valid': requirement.valid
                  })}
                >
                  {requirement.invalidityMsg}
                </li>
              ))}
            </ul>
          </div>
        </form>
        <button className="confirm-comment" onClick={this.checkValidity}>
          Comment
        </button>
      </div>
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
