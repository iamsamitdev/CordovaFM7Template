routes = [

  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/course/',
    url: './pages/course.html',
  },
  {
    path: '/service/',
    url: './pages/service.html',
  },
  {
    path: '/contact/',
    url: './pages/contact.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
