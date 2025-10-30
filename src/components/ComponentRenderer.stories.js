import ComponentRenderer from './ComponentRenderer';

export default {
  title: 'Components/ComponentRenderer',
  component: ComponentRenderer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    storyId: {
      control: 'text',
      description: 'ID of the story to render from Uniform Web Storybook',
    },
    storybookUrl: {
      control: 'text',
      description: 'URL of the Uniform Web Storybook',
    },
    apiKey: {
      control: 'text',
      description: 'API key for authentication (if required)',
    },
  },
};

export const Default = {
  args: {
    storyId: 'example-button--primary',
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
  },
};

export const WithCustomStory = {
  args: {
    storyId: 'example-card--default',
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
  },
};

export const WithFallback = {
  args: {
    storyId: 'non-existent-story',
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
    fallback: 'Custom fallback component',
  },
};

export const WithApiKey = {
  args: {
    storyId: 'example-button--primary',
    storybookUrl: 'https://uniform-web.storybook.hudltools.com',
    apiKey: 'your-api-key-here',
  },
};
