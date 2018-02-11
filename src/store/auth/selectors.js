export const selectAuthenticatedState = state => {
  return state.auth.uid && state.auth.email
}
