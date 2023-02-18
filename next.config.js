// const withImages = require('next-images');

// const redirects = {
//   async redirects() {
//     return [
//       {
//         source: '/dashboards',
//         destination: '/dashboards/tasks',
//         permanent: true
//       }
//     ];
//   },
// };

// module.exports = withImages(redirects, {
//   images: {
//     domains: ['assets.adidas.com'],
//   },
// });
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}