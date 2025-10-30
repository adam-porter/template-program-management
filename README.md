# Storybook Experiments

This project demonstrates different ways to connect to and interact with your company's Storybook library.

## Features

### 1. Storybook Composition
- Connect to external Storybook instances using Storybook's built-in composition feature
- Configured in `.storybook/main.js` with the `refs` option
- Provides seamless integration with your local Storybook

### 2. API Integration
- `StorybookApi` utility class for programmatic access to Storybook data
- Fetch stories, metadata, and individual story data
- Support for authentication and custom headers

### 3. Interactive Components
- **StorybookConnector**: Basic component for testing connections
- **StorybookBrowser**: Advanced component with search, filtering, and story selection

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your company's Storybook URL:
   - Update the `refs` section in `.storybook/main.js`
   - Or use the interactive components with custom URLs

3. Start the development server:
   ```bash
   npm run storybook
   ```

## Usage

### Storybook Composition
The composition is configured in `.storybook/main.js`. Update the URL and authentication as needed:

```javascript
refs: {
  'company-storybook': {
    title: 'Company Storybook',
    url: 'https://your-company-storybook.com',
    // Optional authentication
    auth: {
      type: 'bearer',
      token: process.env.STORYBOOK_TOKEN
    }
  },
}
```

### API Integration
Use the `StorybookApi` class to interact with external Storybooks:

```javascript
import StorybookApi from './utils/storybookApi';

const api = new StorybookApi('https://your-company-storybook.com');
const stories = await api.getStories();
const metadata = await api.getMetadata();
```

### Interactive Components
Use the provided components in your own stories or applications:

```jsx
import StorybookBrowser from './components/StorybookBrowser';

<StorybookBrowser 
  storybookUrl="https://your-company-storybook.com"
  apiKey="your-api-key"
  onStorySelect={(story) => console.log('Selected:', story)}
/>
```

## Authentication

If your company's Storybook requires authentication, you can:

1. **For Composition**: Add auth configuration in the `refs` section
2. **For API**: Pass headers or tokens to the `StorybookApi` constructor
3. **For Components**: Use the `apiKey` prop or modify the API options

## CORS Considerations

If you encounter CORS issues:

1. Ensure your company's Storybook has CORS enabled for your domain
2. Consider using a proxy server for development
3. Use Storybook Composition instead of direct API calls when possible

## Examples

- `StorybookConnector.stories.js` - Basic connection testing
- `StorybookBrowser.stories.js` - Advanced browsing interface

## Next Steps

1. Replace placeholder URLs with your actual company Storybook URL
2. Configure authentication if required
3. Customize the components for your specific needs
4. Consider building addons for more advanced integrations
