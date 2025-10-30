/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // Storybook Composition - Connect to your company's Storybook
  refs: {
    'uniform-web': {
      title: 'Uniform Web Storybook',
      url: 'https://uniform-web.storybook.hudltools.com',
      // Optional: Add authentication if needed
      // auth: {
      //   type: 'bearer',
      //   token: process.env.STORYBOOK_TOKEN
      // }
    },
  },
};
export default config;
