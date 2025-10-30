import StorybookConnector from './StorybookConnector';

export default {
  title: 'Experiments/StorybookConnector',
  component: StorybookConnector,
  parameters: {
    layout: 'fullscreen',
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

export const WithLocalStorybook = {
  args: {
    storybookUrl: 'http://localhost:6006',
  },
};
