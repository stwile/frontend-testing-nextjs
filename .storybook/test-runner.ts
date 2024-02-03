import { checkA11y, configureAxe, injectAxe } from 'axe-playwright';
import { getStoryContext } from '@storybook/test-runner';
import { Page } from 'playwright';

type Context = {
  id: string;
  title: string;
  name: string;
};

export default {
  async preVisit(page: Page, context: Context) {
    if (context.name.startsWith('SP')) {
      page.setViewportSize({ width: 375, height: 667 });
    } else {
      page.setViewportSize({ width: 1280, height: 800 });
    }
    await injectAxe(page);
  },
  async postVisit(page: Page, context: Context) {
    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });
    await checkA11y(page, '#root', {
      includedImpacts: ['critical', 'serious'],
      detailedReport: false,
      detailedReportOptions: { html: true },
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};
