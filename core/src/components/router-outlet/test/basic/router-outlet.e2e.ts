import { expect } from '@playwright/test';
import { test, configs } from '@utils/test/playwright';

configs({ modes: ['md'], directions: ['ltr'] }).forEach(({ title, config }) => {
  test.describe('router outlet: basic', () => {
    test(title('getRouteId() should return the segment parameters'), async ({ page }) => {
      await page.goto('/src/components/router-outlet/test/basic', config);

      await page.click('ion-button[href="#/two/segment"]');
      await page.waitForChanges();

      const routerOutlet = page.locator('ion-router-outlet');
      const routeId = await routerOutlet.evaluate((el: HTMLIonRouterOutletElement) => el.getRouteId());

      expect(routeId!.id).toEqual('PAGE-TWO');
      expect(routeId!.params).toEqual({ param: 'segment' });
    });

    test(title('getRouteId() should return the route parameters'), async ({ page }) => {
      await page.goto('/src/components/router-outlet/test/basic', config);

      await page.click('ion-button[href="#/page-3"]');
      await page.waitForChanges();

      const routerOutlet = page.locator('ion-router-outlet');
      const routeId = await routerOutlet.evaluate((el: HTMLIonRouterOutletElement) => el.getRouteId());

      expect(routeId!.id).toEqual('PAGE-THREE');
      expect(routeId!.params).toEqual({ param: 'route' });
    });

    test(
      title('it should be possible to activate the same component provided parameters are different'),
      async ({ page }) => {
        await page.goto('/src/components/router-outlet/test/basic', config);

        await page.click('ion-button[href="#/page-4.1/foo"]');
        await page.waitForChanges();

        await page.$eval('ion-item[href="#/page-4.1/foo"] ion-label', (el: any) => el.click());
        await page.waitForChanges();

        const routerOutlet = page.locator('ion-router-outlet');
        await expect(routerOutlet).toHaveText(/text = foo/);

        await page.click('ion-button[href="#/page-4.2/bar"]');
        await page.waitForChanges();

        await expect(routerOutlet).toHaveText(/text = bar/);
      }
    );
  });
});
