import React, { Component } from 'react';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';
import { addPostOnServer } from '../actions/posts';
import classNames from 'classnames';

/**
  @param {string} : the current category
  @param {array} : the available categories
  @param {string} : the logged in user, if any
  @param {function} : change the current category on the `Category` Component
  @param {function} : add a post on server and on Redux
*/
class PostingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      textarea: ''
    };
    // Hold the inputs.
    this.inputs = new Set();
    // Hold the invalidities messages for form validation.
    this.invalidities = {
      title: [],
      textarea: []
    };
    // Requirements for each input in the form.
    this.requirements = {
      title: [
        // Can't be empty.
        {
          isInvalid(value) {
            return value.trim().length === 0;
          },
          invalidityMsg: `Can't be empty.`,
          invalid: true,
          valid: false
        }
      ],
      textarea: [
        // Can't be empty.
        {
          isInvalid(value) {
            return value.trim().length === 0;
          },
          invalidityMsg: `Can't be empty.`,
          invalid: true,
          valid: false
        }
      ]
    };
    this.addInvalidity = this.addInvalidity.bind(this);
    this.getInvalidities = this.getInvalidities.bind(this);
    this.checkInvalidity = this.checkInvalidity.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Push a new invalidity message into `this.invalidities`.
  addInvalidity(input, invalidityMsg) {
    this.invalidities[input].push(invalidityMsg);
  }

  // Take `this.invalidities` and return a list of messages.
  getInvalidities(input) {
    return this.invalidities[input].join('\n');
  }

  // For each requirement, if it's invalid add a new message and set up the classes.
  checkInvalidity(input, value) {
    this.requirements[input].forEach(requirement => {
      if (requirement.isInvalid(value)) {
        this.addInvalidity(input, requirement.invalidityMsg);
        requirement.valid = false;
        requirement.invalid = true;
      } else {
        requirement.invalid = false;
        requirement.valid = true;
      }
    });
    this.handleChange(input, value);
  }

  // If there are no invalidities dispatch the post, else show the messages.
  checkValidity() {
    const { category, currentUser, onClick } = this.props;
    const { title, textarea } = this.state;
    let error = false;
    this.inputs.forEach(input => {
      if (!input) return;
      this.invalidities[input.name].length = 0;
      this.checkInvalidity(input.name, input.value);
      if (this.invalidities[input.name].length) {
        input.setCustomValidity(this.getInvalidities(input.name));
        error = true;
      } else {
        input.setCustomValidity('');
      }
    });
    if (error) return;
    const author = currentUser || 'Anonymous';
    onClick(uuidv1(), category, title, textarea, author, Date.now());
    this.setState({title: '', textarea: ''});
  }

  handleChange(input, value) {
    this.setState(prevState => ({
      title: input === 'title' ? value : prevState.title,
      textarea: input === 'textarea' ? value : prevState.textarea
    }));
  }

  render() {
    const { category, categories, onChange } = this.props;
    const { title, textarea } = this.state;
    return (
      <div>
        <form>
          <label>Post title :
            <input
              ref={input => this.inputs.add(input)}
              name='title'
              value={title}
              onChange={evt => this.checkInvalidity('title', evt.target.value)}
              required
            />
            <ul>
              {this.requirements.title.map(req => (
                <li key={req.invalidityMsg}
                  className={classNames({
                    'invalid': req.invalid,
                    'valid': req.valid
                  })}
                >
                  {req.invalidityMsg}
                </li>
              ))}
            </ul>
          </label>
          <label>Category :
            <select value={category} onChange={evt => onChange(evt.target.value)}>
              {categories && categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <div>
            <textarea
              ref={input => this.inputs.add(input)}
              name='textarea'
              placeholder="Write your post here."
              value={textarea}
              onChange={evt => this.checkInvalidity('textarea', evt.target.value)}
              required
            />
            <ul>
              {this.requirements.textarea.map(req => (
                <li key={req.invalidityMsg}
                  className={classNames({
                    'invalid': req.invalid,
                    'valid': req.valid
                  })}
                >
                  {req.invalidityMsg}
                </li>
              ))}
            </ul>
          </div>
        </form>
        <button onClick={this.checkValidity}
          className={classNames({
            'post-btn': true,
            'confirm-post': true
          })}
        >
          <span className="confirm-post-text">Post</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (id, category, title, body, author, timeCreated) => {
    dispatch(addPostOnServer(id, category, title, body, author, timeCreated));
    ownProps.onClick();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostingForm);
