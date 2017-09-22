import React from 'react';
import uuidv1 from 'uuid';

const PostingForm = ({ category, categories, currentUser, onChange, onClick }) => {
  let title;
  let textarea;
  return (
    <form>
      <label>Post title :
        <input ref={inputTitle => title = inputTitle} />
      </label>
      <label>Category :
        <select value={category} onChange={this.handleChange}>
          {categories && categories.map(c => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <textarea placeholder="Write your post here." ref={inputTextarea => textarea = inputTextarea} />
      <input type="submit" value="Post"
        onClick={evt => {
          evt.preventDefault();
          const author = currentUser ? currentUser.name : 'Anonymous';
          onClick(
            uuidv1(),
            category,
            title.value.trim(),
            textarea.value.trim(),
            author,
            Date.now()
          );
          textarea.value = '';
        }}
      />
    </form>
  );
};

export default PostingForm;
