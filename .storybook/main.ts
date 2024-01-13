import { StorybookConfig } from '@storybook/nextjs/*';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storycap',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  staticDirs: ['../public'],

  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="styles/globals.css" />
  `,

  webpackFinal: async (config) => {
    const { resolve } = config;
    if (!resolve) {
      return config;
    }
    resolve.alias = {
      ...resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return { ...config, resolve };
  },

  docs: {
    autodocs: true,
  },
};

export { config };
