import usersData from '../data/user.json';

// Get all posts with author information, sorted by most recent first
export const getAllPosts = () => {
  const allPosts = [];
  
  usersData.users.forEach(user => {
    user.posts.forEach(post => {
      allPosts.push({
        ...post,
        author: {
          id: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          karma: user.karma,
          joinedDate: user.joinedDate
        },
        createdAt: new Date(post.createdAt) // Convert to Date object for sorting
      });
    });
  });
  
  // Sort by most recent first
  return allPosts.sort((a, b) => b.createdAt - a.createdAt);
};

// Get posts by specific user
export const getUserPosts = (userId) => {
  const user = usersData.users.find(user => user.id === userId);
  if (!user) return [];
  
  return user.posts.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};

// Get single post by ID with author info
export const getPostById = (postId) => {
  for (const user of usersData.users) {
    const post = user.posts.find(p => p.id === postId);
    if (post) {
      return {
        ...post,
        author: {
          id: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          karma: user.karma
        }
      };
    }
  }
  return null;
};