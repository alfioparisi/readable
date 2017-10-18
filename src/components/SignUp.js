import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/users';
import classNames from 'classnames';

/**
  @param {function} : add a new user to localStorage and Redux
*/
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    // Hold the inputs.
    this.inputs = new Set();
    // Hold the invalidities messages for form validation.
    this.invalidities = {
      username: [],
      password: []
    };
    // Requirements for each input in the form.
    this.requirements = {
      username: [
        // At least 3 characters long.
        {
          isInvalid(value) {
            return value.trim().length < 3;
          },
          invalidityMsg: 'Should be at least 3 characters long.',
          invalid: true,
          valid: false
        },
        // No special characters.
        {
          isInvalid(value) {
            return value.match(/[^a-zA-Z0-9]/g);
          },
          invalidityMsg: 'No special characters.',
          invalid: true,
          valid: false
        }
      ],
      password: [
        // At least 6 characters long.
        {
          isInvalid(value) {
            return value.trim().length < 6;
          },
          invalidityMsg: 'Should be at least 6 characters long.',
          invalid: true,
          valid: false
        },
        // Lower case letters.
        {
          isInvalid(value) {
            return value.match(/(?=.*?[a-z])/) === null;
          },
          invalidityMsg: 'Should contain lower case letters.',
          invalid: true,
          valid: false
        },
        // Upper case letters.
        {
          isInvalid(value) {
            return value.match(/(?=.*?[A-Z])/) === null;
          },
          invalidityMsg: 'Should contain upper case letters.',
          invalid: true,
          valid: false
        },
        // Numbers.
        {
          isInvalid(value) {
            return value.match(/(?=.*?[0-9])/) === null;
          },
          invalidityMsg: 'Should contain numbers.',
          invalid: true,
          valid: false
        },
        // Special characters.
        {
          isInvalid(value) {
            return value.match(/(?=.*?[#?!@$%^&*-])/) === null;
          },
          invalidityMsg: 'Should contain special characters (#, ?, !, @, $ ,% ,^ ,& ,* ,-).',
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

  // If there are no invalidities dispatch the signup, else show the messages.
  checkValidity() {
    const { onClick } = this.props;
    const { username, password } = this.state;
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
    onClick(username, password, Date.now());
    window.alert(`Successfully looged in as ${username}.`);
    this.setState({username: '', password: ''});
  }

  handleChange(input, value) {
    this.setState(prevState => ({
      username: input === 'username' ? value : prevState.username,
      password: input === 'password' ? value : prevState.password
    }));
  }

  render() {
    const { username, password } = this.state;
    const { currentUser } = this.props;
    return (
      <section className="form-container">
        <header>
          <h3>Create a user</h3>
        </header>
        <form className="user-form">
          <label>Username :
            <input autoFocus
              ref={input => this.inputs.add(input)}
              placeholder="JonSnow"
              name='username'
              value={username}
              onChange={evt => this.checkInvalidity('username', evt.target.value)}
              required
            />
            <ul className="requirements">
              {this.requirements.username.map(req => (
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
          <label>Password :
            <input type="password"
              ref={input => this.inputs.add(input)}
              name='password'
              value={password}
              onChange={evt => this.checkInvalidity('password', evt.target.value)}
              required
            />
            <ul className="requirements">
              {this.requirements.password.map(req => (
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
        </form>
        <div className="btn-container">
          <button
            className={classNames({
              'btn': true,
              'signup-btn': true
            })}
            onClick={this.checkValidity}
            disabled={currentUser}
          >
            SignUp
          </button>
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (username, pass, dateCreated) => {
    dispatch(signUp(username, pass, dateCreated));
    ownProps.onClick(username, pass, dateCreated);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
