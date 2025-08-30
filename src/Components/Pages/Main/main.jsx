import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.css";

export default function Main({ currentUser, onLogout }) {
  // currentUser.profilePicture contains the profile image URL
  // currentUser.posts contains array of user's posts

  return (
    <div className="main-container">
      <Header onLogout={onLogout} />

      <div className="main-content">
        {/* User Profile Section */}
        <div className="user-profile">
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="profile-image-large"
          />
          <div className="user-info">
            <h1>u/{currentUser.username}</h1>
            <p>Karma: {currentUser.karma}</p>
            <p>
              Member since:{" "}
              {new Date(currentUser.joinedDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="user-posts">
          <h2>Your Posts ({currentUser.posts?.length || 0})</h2>

          {currentUser.posts && currentUser.posts.length > 0 ? (
            <div className="posts-container">
              {currentUser.posts.map((post) => (
                <div key={post.id} className="post-card">
                  {/* Post Image if exists */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="post-image"
                    />
                  )}

                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-text">{post.content}</p>

                    <div className="post-meta">
                      <span className="subreddit">r/{post.subreddit}</span>
                      <span className="upvotes">↑ {post.upvotes}</span>
                      <span className="comments">💬 {post.comments}</span>
                      <span className="date">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-posts">You haven't created any posts yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
