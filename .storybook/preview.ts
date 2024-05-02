import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const parameters = {
  docs: {
    source: {
      // any non-empty string here will skip jsx rendering, see:
      // https://github.com/storybookjs/storybook/blob/next/code/renderers/react/src/docs/jsxDecorator.tsx#L165
      code: "hello world",
    },
  },
};

export default preview;
