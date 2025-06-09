export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn || !store.state.auth.user || !store.state.auth.user.role || store.state.auth.user.role.admin != 'yes') {
    return redirect('/login')
  }
}
