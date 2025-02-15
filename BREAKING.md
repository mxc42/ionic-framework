# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the major version releases of Ionic Framework.

## Versions

- [Version 6.x](#version-6x)
- [Version 5.x](./BREAKING_ARCHIVE/v5.md)
- [Version 4.x](./BREAKING_ARCHIVE/v4.md)
- [Legacy](https://github.com/ionic-team/ionic-v3/blob/master/CHANGELOG.md)


## Version 6.x

- [Components](#components)
  * [Datetime](#datetime)
  * [Header](#header)
  * [Icons](#icons)
  * [Input](#input)
  * [Modal](#modal)
  * [Popover](#popover)
  * [Radio](#radio)
  * [Searchbar](#searchbar)
  * [Select](#select)
  * [Tab Bar](#tab-bar)
  * [Textarea](#textarea)
  * [Toast](#toast)
  * [Toolbar](#toolbar)
- [Config](#config)
  * [Transition Shadow](#transition-shadow)
- [Angular](#angular)
  * [Config](#config-1)
- [Vue](#vue)
  * [Config](#config-2)
  * [Tabs Config](#tabs-config)
  * [Tabs Router Outlet](#tabs-router-outlet)
  * [Overlay Events](#overlay-events)
  * [Utility Function Types](#utility-function-types)
- [React](#react)
  * [Config](#config-3)
- [Browser and Platform Support](#browser-and-platform-support)


### Components

#### Datetime

The `ion-datetime` component has undergone a complete rewrite and uses a new calendar style. As a result, some of the properties no longer apply and have been removed.

- `ion-datetime` now displays the calendar inline by default, allowing for more flexibility in presentation. As a result, the `placeholder` property has been removed. Additionally, the `text` and `placeholder` Shadow Parts have been removed.

- The `--padding-bottom`, `--padding-end`, `--padding-start`, `--padding-top`, and `--placeholder-color` CSS Variables have been removed since `ion-datetime` now displays inline by default.

- The `displayFormat` and `displayTimezone` properties have been removed since `ion-datetime` now displays inline with a calendar picker. To parse the UTC string provided in the payload of the `ionChange` event, we recommend using a 3rd-party date library like [date-fns](https://date-fns.org/). Here is an example of how you can take the UTC string from `ion-datetime` and format it to whatever style you prefer:

```typescript
import { format, parseISO } from 'date-fns';

/**
 * This is provided in the event
 * payload from the `ionChange` event.
 */
const dateFromIonDatetime = '2021-06-04T14:23:00-04:00';
const formattedString = format(parseISO(dateFromIonDatetime), 'MMM d, yyyy');

console.log(formattedString); // Jun 4, 2021
```

- The `pickerOptions` and `pickerFormat` properties have been removed since `ion-datetime` now uses a calendar style rather than a wheel picker style.

- The `monthNames`, `monthShortNames`, `dayNames`, and `dayShortNames` properties have been removed. `ion-datetime` can now automatically format these values according to your devices locale thanks to the [Intl.DateTimeFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). If you wish to force a specific locale, you can use the new `locale` property:

```html
<ion-datetime locale="fr-FR"></ion-datetime>
```

- The `open` method has been removed. To present the datetime in an overlay, you can pass it into an `ion-modal` or `ion-popover` component and call the `present` method on the overlay instance. Alternatively, you can use the `trigger` property on `ion-modal` or `ion-popover` to present the overlay on a button click:

```html
<ion-button id="open-modal">Open Datetime Modal</ion-button>
<ion-modal trigger="open-modal">
  <ion-datetime></ion-datetime>
</ion-modal>
```

#### Header

When using a collapsible large title, the last toolbar in the header with `collapse="condense"` no longer has a border. This does not affect the toolbar when the large title is collapsed.

To get the old style back, add the following CSS to your global stylesheet:

```css
ion-header.header-collapse-condense ion-toolbar:last-of-type {
  --border-width: 0 0 0.55px;
}
```

#### Icons

Ionic 6 now ships with Ionicons 6. Please be sure to review the [Ionicons 6.0.0 Changelog](https://github.com/ionic-team/ionicons/releases/tag/v6.0.0) and make any necessary changes.

#### Input

The `placeholder` property now has a type of `string | undefined` rather than `null | string | undefined`.

#### Modal

Converted `ion-modal` to use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

If you were targeting the internals of `ion-modal` in your CSS, you will need to target the `backdrop` or `content` [Shadow Parts](https://ionicframework.com/docs/theming/css-shadow-parts) instead, or use the provided CSS Variables.

Developers dynamically creating modals using `document.createElement('ion-modal')` will now need to call `modal.remove()` after the modal has been dismissed if they want the modal to be removed from the DOM.

#### Popover

Converted `ion-popover` to use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

If you were targeting the internals of `ion-popover` in your CSS, you will need to target the `backdrop`, `arrow`, or `content` [Shadow Parts](https://ionicframework.com/docs/theming/css-shadow-parts) instead, or use the provided CSS Variables.

Developers dynamically creating popovers using `document.createElement('ion-popover')` will now need to call `popover.remove()` after the popover has been dismissed if they want the popover to be removed from the DOM.

#### Radio

The `RadioChangeEventDetail` interface has been removed. Instead, listen for the `ionChange` event on `ion-radio-group` and use the `RadioGroupChangeEventDetail` interface.

#### Searchbar

The `showClearButton` property now defaults to `'always'` for improved usability with screen readers.

To get the old behavior, set `showClearButton` to `'focus'`.

#### Select

The `placeholder` property now has a type of `string | undefined` rather than `null | string | undefined`.

#### Tab Bar

The default iOS tab bar background color has been updated to better reflect the latest iOS styles. The new default value is:

```css
var(--ion-tab-bar-background, var(--ion-color-step-50, #f7f7f7));
```

#### Textarea

The `placeholder` property now has a type of `string | undefined` rather than `null | string | undefined`.

#### Toast

The `--white-space` CSS variable now defaults to `normal` instead of `pre-wrap`.

#### Toolbar

The default iOS toolbar background color has been updated to better reflect the latest iOS styles. The new default value is:

```css
var(--ion-toolbar-background, var(--ion-color-step-50, #f7f7f7));
```


### Config

#### Transition Shadow

The `experimentalTransitionShadow` config option has been removed. The transition shadow is now enabled when running in `ios` mode.


### Angular

#### Config

The `Config.set()` method has been removed. See https://ionicframework.com/docs/angular/config for examples on how to set config globally, per-component, and per-platform.

Additionally, the `setupConfig` function is no longer exported from `@ionic/angular`. Developers should use `IonicModule.forRoot` to set the config instead. See https://ionicframework.com/docs/angular/config for more information.

### React

#### Config

All Ionic React applications must now import `setupIonicReact` from `@ionic/react` and call it. If you are setting a custom config with `setupConfig`, pass your config directly to `setupIonicReact` instead:

**Old**
```javascript
import { setupConfig } from '@ionic/react';

setupConfig({
  mode: 'md'
})
```

**New**
```javascript
import { setupIonicReact } from '@ionic/react';

setupIonicReact({
  mode: 'md'
})
```

Note that all Ionic React applications must call `setupIonicReact` even if they are not setting custom configuration.

Additionally, the `setupConfig` function is no longer exported from `@ionic/react`.

### Vue

#### Config

The `setupConfig` function is no longer exported from `@ionic/vue`. Developers should pass their config into the `IonicVue` plugin. See https://ionicframework.com/docs/vue/config for more information.

#### Tabs Config

Support for child routes nested inside of tabs has been removed to better conform to Vue Router's best practices. Additional routes should be written as sibling routes with the parent tab as the path prefix:

**Old**
```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
        children: {
          {
            path: 'view',
            component: () => import('@/views/Tab1View.vue')
          }
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]
```

**New**
```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab1/view',
        component: () => import('@/views/Tab1View.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]
```

In the example above `tabs/tab1/view` has been rewritten has a sibling route to `tabs/tab1`. The `path` field now includes the `tab1` prefix.

#### Tabs Router Outlet

Developers must now provide an `ion-router-outlet` inside of `ion-tabs`. Previously one was generated automatically, but this made it difficult for developers to access the properties on the generated `ion-router-outlet`.

**Old**
```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    ...
  </ion-tab-bar>
</ion-tabs>

<script>
  import { IonTabs, IonTabBar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonTabs, IonTabBar }
  });
</script>
```

**New**
```html
<ion-tabs>
  <ion-router-outlet></ion-router-outlet>
  <ion-tab-bar slot="bottom">
    ...
  </ion-tab-bar>
</ion-tabs>

<script>
  import { IonTabs, IonTabBar, IonRouterOutlet } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonTabs, IonTabBar, IonRouterOutlet }
  });
</script>
```

#### Overlay Events

Overlay events `onWillPresent`, `onDidPresent`, `onWillDismiss`, and `onDidDismiss` have been removed in favor of `willPresent`, `didPresent`, `willDismiss`, and `didDismiss`.

This applies to the following components: `ion-action-sheet`, `ion-alert`, `ion-loading`, `ion-modal`, `ion-picker`, `ion-popover`, and `ion-toast`.

**Old**
```html
<ion-modal
  :is-open="modalOpenRef"
  @onWillPresent="onModalWillPresentHandler"
  @onDidPresent="onModalDidPresentHandler"
  @onWillDismiss="onModalWillDismissHandler"
  @onDidDismiss="onModalDidDismissHandler"
>
  ...
</ion-modal>
```

**New**
```html
<ion-modal
  :is-open="modalOpenRef"
  @willPresent="onModalWillPresentHandler"
  @didPresent="onModalDidPresentHandler"
  @willDismiss="onModalWillDismissHandler"
  @didDismiss="onModalDidDismissHandler"
>
  ...
</ion-modal>
```

#### Utility Function Types

- The `IonRouter` type for `useIonRouter` has been renamed to `UseIonRouterResult`.

- The `IonKeyboardRef` type for `useKeyboard` has been renamed to `UseKeyboardResult`.


### Browser and Platform Support

This section details the desktop browser, JavaScript framework, and mobile platform versions that are supported by Ionic Framework v6.

**Minimum Browser Versions**
| Desktop Browser | Supported Versions |
| --------------- | ----------------- |
| Chrome          | 60+               |
| Safari          | 13+               |
| Firefox         | 63+               |
| Edge            | 79+               |

**Minimum JavaScript Framework Versions**

| Framework | Supported Version     |
| --------- | --------------------- |
| Angular   | 12+                   |
| React     | 17+                   |
| Vue       | 3.0.6+                |

**Minimum Mobile Platform Versions**

| Platform | Supported Version                       |
| -------- | --------------------------------------- |
| iOS      | 13+                                     |
| Android  | 5.0+ with Chromium 60+ (See note below) |

Starting with Android 5.0, the webview was moved to a separate application that can be updated independently of Android. This means that most Android 5.0+ devices are going to be running a modern version of Chromium. However, there are a still a subset of Android devices whose manufacturer has locked the webview version and does not allow the webview to update. These webviews are typically stuck at the version that was available when the device initially shipped.

As a result, Ionic Framework only supports Android devices and emulators running Android 5.0+ with a webview of Chromium 60 or newer. For context, this is the version that Stencil can support with no polyfills: https://stenciljs.com/docs/browser-support
