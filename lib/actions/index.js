import { push } from 'react-router-redux'
import Wad from '../../vendor/wad.js'

export const previewSound = (spec) => (dispatch, getState) => {
  const sound = new Wad(spec)
  const { sounds } = getState()
  if (sounds.length !== 0) {
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

export const stopSound = () => (dispatch, getState) => {
  const { sounds } = getState()

  if (sounds.length !== 0) {
    const soundArrayLength = sounds.length
    const sound = sounds[soundArrayLength - 1]

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

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: 'SET_USER',
    user,
  })
  dispatch(push(`/`))
}

export const setSounds = (sounds) => {
  return {
    type: 'SET_SOUNDS',
    sounds,
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

const saveUser = (user) => {
  localStorage.setItem('activeUser', user)
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
  const baseUrl = 'http://localhost:3000/api/v1/users'
  return (dispatch) => {
    fetch(`${baseUrl}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(setUser(json))
      })
      .catch(err => 'err')
  }
}

export const fetchUserData = () => {
  return (dispatch) => {

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
        console.log(user);
        dispatch(setUser(user))
        saveUser(user.token)
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
        saveUser(user.token)
      }
    })
  }
}

export const saveSound = (attributes, user_id) => {
  return (dispatch) => {
    fetch(`api/v1/sounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes,
        user_id
      })
    })
    .then(data => data.json())
    .then(sounds => { dispatch(setSounds(sounds))
    })
  }
}

export const fetchSounds = (attributes, user_id) => {
  return (dispatch) => {
    fetch(`api/v1/sounds`)
    .then(data => data.json())
    .then(sounds => { dispatch(setSounds(sounds))
    })
  }
}
