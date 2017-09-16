import React from 'react';
import Post from './Post';

const Category = () => (
  <main>
    <header>
      <h2>Category Name</h2>
    </header>
    <ul>
      <li><Post
        category={'category'}
        title={'some post'}
        body={'hello i am a nice body, cant you see?'}
        author={'Anonymous'}
        timestamp={{timeCreated: '01/01/01'}}
        voteScore={-3}
      /></li>
      <li>Post2</li>
      <li>Post3</li>
      <li>Post4</li>
    </ul>
    <footer>
      <p>Write a new post. (this footer is gonna be fixed and always on top)</p>
    </footer>
  </main>
);

export default Category;
