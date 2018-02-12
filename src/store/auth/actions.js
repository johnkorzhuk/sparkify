// ACTIONS
export const LOGIN = "auth/LOGIN"
export const LOGOUT = "auth/LOGOUT"
export const LOADING = "auth/LOADING"
export const ERROR = "auth/ERROR"

// ACTION CREATORS
export const loginAction = ({
  email,
  displayName,
  photoURL,
  uid,
  emailVerified,
}) => {
  return {
    type: LOGIN,
    payload: {
      email,
      displayName,
      photoURL,
      uid,
      emailVerified,
    },
  }
}

export const logoutAction = () => ({
  type: LOGOUT,
  payload: null,
})

export const loadingAction = () => ({
  type: LOADING,
  payload: null,
})

export const authErrorAction = message => ({
  type: ERROR,
  payload: {
    message,
  },
})

// redux-thunk dependant
// BOUND ACTION CREATORS
export const login = (auth, provider, formData) => async dispatch => {
  dispatch(loadingAction())

  try {
    if (provider) {
      const data = await auth.signInWithPopup(provider)
      dispatch(loginAction(data.user))
    } else if (formData) {
      const data = await auth.signInWithEmailAndPassword(
        formData.email,
        formData.password,
      )
      dispatch(loginAction(data))
    }
  } catch (error) {
    // TODO: give user more useful info
    dispatch(authErrorAction("Oh no! Something went wrong."))
    throw error
  }
}

export const signup = (
  auth,
  provider,
  store,
  { email, password, username },
) => async dispatch => {
  const setUserData = async (uid, data) => {
    return store
      .collection("users")
      .doc(uid)
      .set(data)
  }

  dispatch(loadingAction())

  try {
    if (provider) {
      const data = await auth.signInWithPopup(provider)
      dispatch(loginAction(data.user))
      await setUserData(data.user.uid, {
        joined: new Date(Date.now()),
        email: data.user.email,
        username,
      })
    } else {
      const data = await auth.createUserWithEmailAndPassword(email, password)
      dispatch(loginAction(data))
      await setUserData(data.uid, {
        joined: new Date(Date.now()),
        email: data.email,
        username,
      })
    }
  } catch (error) {
    console.log(error)
    // TODO: give user more useful info
    dispatch(authErrorAction("Oh no! Something went wrong."))
    throw error
  }
}

export const logout = auth => async dispatch => {
  try {
    await auth.signOut()
    return dispatch(logoutAction())
  } catch (error) {
    dispatch(authErrorAction("Oh no! Something went wrong."))
    throw error
  }
}

export const startListeningToAuthChanges = auth => dispatch => {
  return auth.onAuthStateChanged(async user => {
    if (user) {
      dispatch(loginAction(user))
    } else {
      dispatch(logoutAction())
    }
  })
}
