import MockDashboard from './MockDashboard';

export default {
  title: 'Pages/MockDashboard',
  component: MockDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    storybookUrl: {
      control: 'text',
      description: 'URL of the Uniform Web Storybook to connect to',
    },
    apiKey: {
      control: 'text',
      description: 'API key for authentication (if required)',
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
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
  },
};

export const WithApiKey = {
  args: {
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
    apiKey: 'your-api-key-here',
  },
};
