# PWA Starter App

Progressive Web Apps are websites that can be added to your device home screen, can run offline and do things like sending push notifications.

Learn more at [Google Developers](https://developers.google.com/web/progressive-web-apps/)

## How to Start

1. Configure your `public/manifest.json`. Specify your app name, theme color, include icons. [Learn more](https://developers.google.com/web/fundamentals/web-app-manifest/)
2. Change icons in `public/index.html` file
3. Your PWA is ready!

[Workbox](https://developers.google.com/web/tools/workbox/) will automatically generate a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) that will cache all files in your `public` and `assets` folders.


## Your Project

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- `public/manifest.json` contains info about your PWA: name, icons, theme color
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


## How to Install your PWA

1. Press "Add this app to your home screen" button
2. Done!

It has its own icon on your desktop, and launches in its own window.
It can also run offline!

#### Made by [Ruslan Egorov](https://glitch.com/@ruslanegorov)

\ ゜o゜)ノ

![Lighthouse 100](https://i.imgur.com/uSb5zpI.png)
