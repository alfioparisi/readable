import React, { Component } from 'react';
import uuidv1 from 'uuid';

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
              <option key={c.name} value={c.name}>
                {c.name}
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
            const author = currentUser ? currentUser.name : 'Anonymous';
            onClick(uuidv1(), category, title, textarea, author, Date.now());
            this.setState({title: '', textarea: ''});
          }}
        />
      </form>
    );
  }
}

export default PostingForm;
