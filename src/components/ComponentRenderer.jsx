import React, { useState, useEffect } from 'react';
import StorybookApi from '../utils/storybookApi';

/**
 * Component Renderer - Dynamically renders components from Uniform Web Storybook
 * This allows us to fetch and display actual components from your company's Storybook
 */
const ComponentRenderer = ({ 
  storyId, 
  storybookUrl = 'https://uniform-web.storybook.hudltools.com',
  apiKey = null,
  fallback = null 
}) => {
  const [api, setApi] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize API client
  useEffect(() => {
    if (storybookUrl) {
      const apiOptions = apiKey ? { headers: { 'Authorization': `Bearer ${apiKey}` } } : {};
      setApi(new StorybookApi(storybookUrl, apiOptions));
    }
  }, [storybookUrl, apiKey]);

  // Load component data
  useEffect(() => {
    const loadComponent = async () => {
      if (!api || !storyId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const storyData = await api.getStory(storyId);
        setComponentData(storyData);
      } catch (err) {
        setError(err.message);
        console.error(`Error loading story ${storyId}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [api, storyId]);

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{ marginBottom: '8px' }}>⏳</div>
        <div>Loading component from Storybook...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '2px dashed #ff6b6b',
        borderRadius: '8px',
        backgroundColor: '#ffe0e0',
        color: '#d63031'
      }}>
        <div style={{ marginBottom: '8px' }}>❌</div>
        <div>Error loading component: {error}</div>
        {fallback && <div style={{ marginTop: '12px' }}>{fallback}</div>}
      </div>
    );
  }

  if (!componentData) {
    return fallback || (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        color: '#666'
      }}>
        <div style={{ marginBottom: '8px' }}>📦</div>
        <div>No component data available</div>
      </div>
    );
  }

  // For now, we'll render a placeholder that shows the component info
  // In a real implementation, you'd render the actual component
  return (
    <div style={{ 
      padding: '20px',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      backgroundColor: '#f1f8e9'
    }}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold', color: '#2e7d32' }}>
        ✅ Component from Uniform Web Storybook
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Title:</strong> {componentData.title || 'Unknown'}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Component:</strong> {componentData.component || 'Unknown'}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Story:</strong> {componentData.name || 'Unknown'}
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong>ID:</strong> {storyId}
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        <em>This is a placeholder. In a real implementation, the actual component would be rendered here.</em>
      </div>
    </div>
  );
};

export default ComponentRenderer;
