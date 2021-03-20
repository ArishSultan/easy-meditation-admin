export default async function({ route, $auth, redirect }) {
  if ($auth.hasScope(2) && route.path !== '/auth/invalid-account') {
    redirect('/auth/invalid-account')
  }
}
