import { useState, useEffect } from 'react';
import axios from 'axios';

function Testing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>My Instagram Posts</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={post.imageUrl} alt="Instagram post" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testing;
