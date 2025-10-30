import StorybookBrowser from './StorybookBrowser';

export default {
  title: 'Experiments/StorybookBrowser',
  component: StorybookBrowser,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    storybookUrl: {
      control: 'text',
      description: 'URL of the external Storybook to connect to',
    },
    apiKey: {
      control: 'text',
      description: 'API key for authentication (if required)',
    },
    onStorySelect: {
      action: 'storySelected',
      description: 'Callback when a story is selected',
    },
  },
};

export const Default = {
  args: {
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
  },
};

export const WithCustomUrl = {
  args: {
    storybookUrl: 'https://storybook.yourcompany.com',
  },
};

export const WithApiKey = {
  args: {
    storybookUrl: 'https://secure-storybook.yourcompany.com',
    apiKey: 'your-api-key-here',
  },
};

export const WithLocalStorybook = {
  args: {
    storybookUrl: 'http://localhost:6006',
  },
};
