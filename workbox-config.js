module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.*'],
  swDest: 'swdist/sw.js',
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('^https://*.*/'),
      handler: 'staleWhileRevalidate',
    }
  ],
};
