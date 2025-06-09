// plugins/after-each.js:
export default async ({ app }) => {

  app.router.beforeEach(function(to, from, next) {

    if(to.name == 'login' || to.name == 'register') {
      if (window.user && window.user._id) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }

  });

}
