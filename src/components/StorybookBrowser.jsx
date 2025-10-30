import React, { useState, useEffect } from 'react';
import StorybookApi from '../utils/storybookApi';

/**
 * Advanced component for browsing and interacting with external Storybook
 * This demonstrates more sophisticated integration patterns
 */
const StorybookBrowser = ({ 
  storybookUrl = 'https://uniform-web.storybook.hudltools.com',
  apiKey = null,
  onStorySelect = null 
}) => {
  const [api, setApi] = useState(null);
  const [stories, setStories] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  // Initialize API client
  useEffect(() => {
    if (storybookUrl && storybookUrl !== 'https://uniform-web.storybook.hudltools.com') {
      const apiOptions = apiKey ? { headers: { 'Authorization': `Bearer ${apiKey}` } } : {};
      setApi(new StorybookApi(storybookUrl, apiOptions));
    }
  }, [storybookUrl, apiKey]);

  // Load stories and metadata
  const loadData = async () => {
    if (!api) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [storiesData, metadataData] = await Promise.all([
        api.getStories(),
        api.getMetadata().catch(() => null) // Metadata is optional
      ]);
      
      setStories(Object.entries(storiesData.stories || {}));
      setMetadata(metadataData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [api]);

  // Filter stories based on search query
  const filteredStories = stories.filter(([_, story]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      story.title.toLowerCase().includes(query) ||
      story.name.toLowerCase().includes(query) ||
      story.component?.toLowerCase().includes(query)
    );
  });

  const handleStoryClick = (storyId, story) => {
    setSelectedStory({ id: storyId, ...story });
    if (onStorySelect) {
      onStorySelect({ id: storyId, ...story });
    }
  };

  const openStoryInNewTab = (storyId) => {
    if (api) {
      window.open(api.getStoryUrl(storyId), '_blank');
    }
  };

  if (!api) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please configure a valid Storybook URL to get started.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Storybook Browser</h2>
        {metadata && (
          <p style={{ color: '#666', fontSize: '14px' }}>
            Connected to: {metadata.title || 'Storybook'} v{metadata.version || 'Unknown'}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '300px', 
            padding: '8px', 
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={loadData}
          disabled={loading}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ffcccc',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Stories ({filteredStories.length})</h3>
          <div style={{ 
            maxHeight: '500px', 
            overflowY: 'auto', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            padding: '10px'
          }}>
            {filteredStories.map(([storyId, story]) => (
              <div 
                key={storyId} 
                style={{ 
                  marginBottom: '10px', 
                  padding: '10px', 
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: selectedStory?.id === storyId ? '#f0f8ff' : 'white',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => handleStoryClick(storyId, story)}
                onDoubleClick={() => openStoryInNewTab(storyId)}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {story.title}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  Component: {story.component || 'Unknown'}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Story: {story.name}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  Double-click to open in new tab
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedStory && (
          <div style={{ flex: 1 }}>
            <h3>Selected Story</h3>
            <div style={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4>{selectedStory.title}</h4>
              <p><strong>Component:</strong> {selectedStory.component || 'Unknown'}</p>
              <p><strong>Story:</strong> {selectedStory.name}</p>
              <p><strong>ID:</strong> {selectedStory.id}</p>
              
              <div style={{ marginTop: '15px' }}>
                <button
                  onClick={() => openStoryInNewTab(selectedStory.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Open Story
                </button>
                <button
                  onClick={() => window.open(api.getMainUrl(), '_blank')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Open Storybook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorybookBrowser;
