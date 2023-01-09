import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('loading: a11y', () => {
  test('should set aria-labelledby with a message', async ({ page }) => {
    await page.goto('/src/components/loading/test/a11y');

    const ionLoadingDidPresent = await page.spyOnEvent('ionLoadingDidPresent');

    await page.click('#open-message-loading');

    await ionLoadingDidPresent.next();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
