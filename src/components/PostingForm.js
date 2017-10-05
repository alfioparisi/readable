import React, { Component } from 'react';
import uuidv1 from 'uuid';
import { connect } from 'react-redux';
import { addPostOnServer } from '../actions/posts';

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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input, value) {
    this.setState(prevState => ({
      title: input === 'title' ? value : prevState.title,
      textarea: input === 'textarea' ? value : prevState.textarea
    }));
  }

  render() {
    const { category, categories, currentUser, onChange, onClick } = this.props;
    const { title, textarea } = this.state;
    return (
      <form>
        <label>Post title :
          <input
            value={title}
            onChange={evt => this.handleChange('title', evt.target.value)}
          />
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
        <textarea
          placeholder="Write your post here."
          value={textarea}
          onChange={evt => this.handleChange('textarea', evt.target.value)}
        />
        <input type="submit" value="Post"
          onClick={evt => {
            evt.preventDefault();
            const author = currentUser || 'Anonymous';
            onClick(uuidv1(), category, title, textarea, author, Date.now());
            this.setState({title: '', textarea: ''});
          }}
        />
      </form>
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
