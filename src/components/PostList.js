import React from 'react';
import Post from './Post';

/**
  @param {array} : the posts for a category, that are not deleted
  @param {function} : change the `viewingPost` state on `Category`
  @param {boolean} : whether we are in `Post` view or not
*/
const PostList = ({ posts, isViewingPost, viewingPost }) => {
  const notDeletedPosts = posts.filter(post => !post.deleted);
  if (!notDeletedPosts.length) return <p>No posts for this category.</p>;
  return (
    <ul>
      {notDeletedPosts && notDeletedPosts.map(post => (
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
};

export default PostList;
