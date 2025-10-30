import React, { useState, useEffect } from 'react';

/**
 * Component to demonstrate connecting to external Storybook APIs
 * This shows how you might fetch and display stories from your company's Storybook
 */
const StorybookConnector = ({ storybookUrl = 'https://uniform-web.storybook.hudltools.com' }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch stories from the Storybook API
      const response = await fetch(`${storybookUrl}/stories.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stories: ${response.status}`);
      }
      
      const data = await response.json();
      setStories(data.stories || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we have a valid URL
    if (storybookUrl && storybookUrl !== 'https://uniform-web.storybook.hudltools.com') {
      fetchStories();
    }
  }, [storybookUrl]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Storybook Connector</h2>
      <p>This component demonstrates how to connect to your company's Storybook library.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="storybook-url">Storybook URL: </label>
        <input
          id="storybook-url"
          type="url"
          value={storybookUrl}
          onChange={(e) => setStorybookUrl(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
        <button 
          onClick={fetchStories}
          disabled={loading}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          {loading ? 'Loading...' : 'Fetch Stories'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {stories.length > 0 && (
        <div>
          <h3>Available Stories ({stories.length})</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {Object.entries(stories).map(([storyId, story]) => (
              <div key={storyId} style={{ marginBottom: '10px', padding: '5px', borderBottom: '1px solid #eee' }}>
                <strong>{story.title}</strong>
                <br />
                <small>Component: {story.component}</small>
                <br />
                <small>Story: {story.name}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>Setup Instructions:</h4>
        <ol>
          <li>Replace the default URL with your company's Storybook URL</li>
          <li>If authentication is required, you may need to add headers or tokens</li>
          <li>Check if your company's Storybook has CORS enabled for your domain</li>
          <li>Consider using Storybook Composition (refs) for a more integrated experience</li>
        </ol>
      </div>
    </div>
  );
};

export default StorybookConnector;
