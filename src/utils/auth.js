import usersData from '../data/user.json';

// In src/utils/auth.js
export const authenticateUser = (username, password) => {
  console.log('Auth function called with:', username, password); // Debug log
  
  const user = usersData.users.find(
    user => user.username === username && user.password === password
  );
  
  console.log('Found user:', user); // Debug log
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};