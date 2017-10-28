import React from 'react';
import Post from './Post';

/**
  @param {array} : the posts for a category, that are not deleted
  @param {function} : change the `viewingPost` state on `Category`
  @param {boolean} : whether we are in `Post` view or not
*/
const PostList = ({ posts, isViewingPost, viewingPost }) => (
  <ul>
    {posts && posts.filter(post => !post.deleted).map(post => (
      <li key={post.id}>
        <Post
          post={post}
          showComments={false}
          isViewingPost={isViewingPost}
          viewingPost={viewingPost}
        />
      </li>
    ))}
  </ul>
);

export default PostList;
