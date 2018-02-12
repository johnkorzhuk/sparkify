export const selectAuthenticatedState = state => {
  return state.auth.user.uid && state.auth.user.email
}
