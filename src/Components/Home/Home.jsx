import { useState, useEffect } from 'react';
import Header from '../Pages/Header/header.jsx';
import { getAllPosts } from '../../utils/post.js';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const allPosts = getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <Header />
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="home">
      <Header />
      
      <div className="home-container">
        <div className="home-header">
          <h1>Recent Posts</h1>
          <p className="post-count">{posts.length} posts found</p>
        </div>

        <div className="posts-grid">
          {posts.length === 0 ? (
            <div className="no-posts">
              <h2>No posts yet</h2>
              <p>Be the first to create a post!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Post Card Component
const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = now - postDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="post-card">
      {/* Post Header with Author Info */}
      <div className="post-header">
        <div className="author-info">
          <img 
            src={post.author.profilePicture} 
            alt={post.author.username}
            className="author-avatar"
          />
          <div className="author-details">
            <span className="username">u/{post.author.username}</span>
            <span className="karma">{post.author.karma} karma</span>
            <span className="post-time">{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>
        <div className="subreddit-tag">
          r/{post.subreddit}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>
        
        {post.image && (
          <div className="post-image-container">
            <img 
              src={post.image} 
              alt={post.title}
              className="post-image"
            />
          </div>
        )}
      </div>

      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="post-stats">
        <div className="stat">
          <span className="stat-icon">⬆️</span>
          <span className="stat-count">{post.upvotes}</span>
        </div>
        <div className="stat">
          <span className="stat-icon">⬇️</span>
          <span className="stat-count">{post.downvotes}</span>
        </div>
        <div className="stat">
          <span className="stat-icon">💬</span>
          <span className="stat-count">{post.comments}</span>
        </div>
        <div className="stat">
          <span className="stat-icon">📅</span>
          <span className="stat-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};