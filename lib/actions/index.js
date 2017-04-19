import { push } from 'react-router-redux'
import Wad from '../../vendor/wad.js'

export const previewSound = (spec) => (dispatch, getState) => {
  const sound = new Wad(spec)
  const { sounds } = getState()
  if (sounds.previews.length !== 0) {
    dispatch(stopSound())
  }

  dispatch({
    type: 'PUSH_SOUND',
    sound,
  })

  return dispatch(playSound(sound))
}

export const playSound = (sound) => {
  sound.play()

  return {
    type: 'PLAY_SOUND',
    sound,
  }
}

export const userError = (error) => {
  return {
    type: 'USER_ERROR',
    error,
  }
}

export const setSelectedSound = (sound, id) => {
  return {
    type: 'SELECTED_SOUND',
    sound,
    id
  }
}

export const setSelectedComposition = (composition, id) => {
  return {
    type: 'SELECTED_COMPOSITION',
    composition,
    id
  }
}

export const setAllCompositions = (data) => {
  return {
    type: 'SET_ALL_COMPOSITIONS',
    data
  }
}

export const stopSound = () => (dispatch, getState) => {
  const { sounds } = getState()

  if (sounds.previews.length !== 0) {
    const soundArrayLength = sounds.previews.length
    const sound = sounds.previews[soundArrayLength - 1]

    sound.stop()

    return dispatch({
      type: 'POP_SOUND',
    })
  }
}

export const setSoundVolume = (value) => {
  return {
    type: 'SET_SOUND_VOLUME',
    value,
  }
}

export const stopAllSounds = () => (dispatch, getState) => {
  const { sounds } = getState()

  sounds.forEach(sound => {
    sound.stop()
  })

  dispatch({
    type: 'CLEAR_SOUNDS',
  })
}

export const setUser = (user) => (dispatch, getState) => {
  dispatch({
    type: 'SET_USER',
    user,
  })
  const { router } = getState()
  if (router.location.pathname === '/sign-up') {
    dispatch(push(`/`))
  }
}

export const setSounds = (sounds) => {
  console.log('sounds ', sounds);
  return {
    type: 'SET_SOUNDS',
    sounds,
  }
}

export const setComps = (comp) => {
  return {
    type: 'SET_COMPS',
    comp,
  }
}

export const setUserData = (userData) => {
  return {
    type: 'SET_USER_DATA',
    userData
  }
}

export const editSound = (sound, id) => {
  return {
    type: 'EDIT_SOUND',
    sound,
    id
  }
}

export const editComps = (comp, id) => {
  return {
    type: 'EDIT_COMPS',
    comp,
    id
  }
}

export const removeUser = () => {
  return { type: 'LOGOUT' }
}

export const logoutUser = () => {
  localStorage.removeItem('activeUser');
  return (dispatch) => {
    dispatch(removeUser())
    dispatch(push(`/`))
  }
}

export const saveUser = (user) => {
  localStorage.setItem('activeUser', JSON.stringify(user))
}

export const fetchUserSounds = (userID, token, dispatch) => {
    fetch(`/api/v1/userSounds/${userID}?token=${token}`)
    .then(data => data.json())
    .then(sounds => {
      dispatch(setUserData({sounds}))
    })
}

export const fetchUserCompositions = (userID, token, dispatch) => {
    fetch(`/api/v1/userCompositions/${userID}?token=${token}`)
    .then(data => data.json())
    .then(compositions => {
      dispatch(setUserData({compositions}))
    })
}

const handleError = (error, dispatch) => {
  let msg;
  let type;
  switch(error) {
    case 'users_username_unique':
      type = 'DUPLICATE'
      msg = 'Username already exists. Sign in or try again.'
      break;
    case 'users_email_unique':
      type ='DUPLICATE'
      msg = 'Email already exists. Sign in or try again.'
      break;
    case 'user_not_found':
      type = 'NOT_FOUND'
      msg = 'Email and/or password did not match. Try again or register a new account'
      break;
    default:
      msg = 'Please try again or register a new account'
  }
  dispatch(userError({ type, msg }))
}

export const fetchUser = () => {
  const baseUrl = ' /api/v1/users'
  return (dispatch) => {
    fetch(`${baseUrl}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(setUser(json))
      })
      .catch(err => 'err')
  }
}

export const fetchAllCompositions = () => {
  return (dispatch) => {
    fetch('/api/v1/compositions')
      .then(response => response.json())
      .then((data) => {
        dispatch(setAllCompositions(data))
      })
      .catch(err => 'err')
  }
}

export const fetchUserData = (userID, token) => {
  return (dispatch) => {
    fetchUserSounds(userID, token, dispatch)
    fetchUserCompositions(userID, token, dispatch)
  }
}

export const postNewUser = (userCreds) => {
  return (dispatch) => {
    fetch('api/v1/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCreds)
    })
    .then(res => res.json())
    .then(user => {
      if(user.error) {
        handleError(user.error, dispatch)
      } else {
        dispatch(setUser(user))
        saveUser(user)
      }
    })
  }
}

export const loginUser = (creds) => {
  return (dispatch) => {
    fetch(`api/v1/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: creds.email, password: creds.password })
    })
    .then(data => data.json())
    .then(user => {
      if(user.error) {
        handleError('user_not_found', dispatch)
      } else {
        dispatch(setUser(user))
        dispatch(fetchUserData(user.id, user.token))
        saveUser(user)
      }
    })
  }
}

export const saveSound = (attributes, user_id, method, id) => {
  return (dispatch) => {
    fetch(`api/v1/sounds${id ? '/' + id : ''}`, {
      method: `${method}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes,
        user_id
      })
    })
    .then(data => data.json())
    .then(sounds => {
      dispatch(setSounds(sounds))
    })
  }
}

export const loadSound = (id) => {
  return (dispatch) => {
    fetch(`api/v1/sounds/${id}`)
    .then(data => data.json())
    .then(sound => {
      dispatch(editSound(JSON.parse(sound[0].attributes), id))
    })
  }
}

export const saveComp = (attributes, user_id, method, id) => {
  return (dispatch) => {
    fetch(`api/v1/compositions${id ? '/' + id : ''}`, {
      method: `${method}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes,
        user_id
      })
    })
    .then(data => data.json())
    .then(comps => {
      dispatch(setComps(comps))
    })
  }
}

export const loadComp = (id) => {
  return (dispatch) => {
    fetch(`api/v1/compositions/${id}`)
    .then(data => data.json())
    .then(comp => {
      dispatch(editComps(JSON.parse(comp[0].attributes), id))
    })
  }
}

export const goToSignUpPage = () => (dispatch) => {
  dispatch(push('/sign-up'))
}

export const setUserFromStorage = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
    dispatch(fetchUserData(user.id, user.token))
  }
}

export const openUserSound = (sound, id) => {
  return (dispatch) => {
    dispatch((setSelectedSound(sound, id)))
    dispatch(push('/newsound'))
  }
}

export const openUserComposition = (composition, id) => {
  return (dispatch) => {
    dispatch((setSelectedComposition(composition, id)))
    dispatch(push('/sequencer'))
  }
}

export const deleteSound = (id) => {
  return (dispatch) => {
    fetch(`/api/v1/sounds/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(sounds => dispatch(setUserData({sounds})))
  }
}

export const deleteComposition = (id) => {
  return (dispatch) => {
    fetch(`/api/v1/compositions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(compositions => dispatch(setUserData({compositions})))
  }
}
