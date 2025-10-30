/**
 * Utility functions for interacting with Storybook APIs
 * This provides a clean interface for fetching stories, components, and metadata
 */

class StorybookApi {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
  }

  /**
   * Fetch all stories from the Storybook
   * @returns {Promise<Object>} Stories data
   */
  async getStories() {
    try {
      const response = await fetch(`${this.baseUrl}/stories.json`, {
        headers: this.options.headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch stories:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific story's data
   * @param {string} storyId - The story ID
   * @returns {Promise<Object>} Story data
   */
  async getStory(storyId) {
    try {
      const response = await fetch(`${this.baseUrl}/stories/${storyId}.json`, {
        headers: this.options.headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch story ${storyId}:`, error);
      throw error;
    }
  }

  /**
   * Get the Storybook's metadata
   * @returns {Promise<Object>} Metadata including version, addons, etc.
   */
  async getMetadata() {
    try {
      const response = await fetch(`${this.baseUrl}/metadata.json`, {
        headers: this.options.headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      throw error;
    }
  }

  /**
   * Get the iframe URL for a specific story
   * @param {string} storyId - The story ID
   * @returns {string} Full URL to the story
   */
  getStoryUrl(storyId) {
    return `${this.baseUrl}/iframe.html?id=${storyId}`;
  }

  /**
   * Get the main Storybook URL
   * @returns {string} Main Storybook URL
   */
  getMainUrl() {
    return this.baseUrl;
  }

  /**
   * Search for stories by component name or title
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching stories
   */
  async searchStories(query) {
    try {
      const stories = await this.getStories();
      const searchTerm = query.toLowerCase();
      
      return Object.entries(stories.stories || {})
        .filter(([_, story]) => 
          story.title.toLowerCase().includes(searchTerm) ||
          story.name.toLowerCase().includes(searchTerm) ||
          story.component?.toLowerCase().includes(searchTerm)
        )
        .map(([id, story]) => ({ id, ...story }));
    } catch (error) {
      console.error('Failed to search stories:', error);
      throw error;
    }
  }
}

export default StorybookApi;
