import Tuna from '../../vendor/tuna.js'
window.Tuna = Tuna;
import Wad from '../../vendor/wad.js'

export const previewSound = (options) => (dispatch, getState) => {
  dispatch(stopSound())

  const sound = new Wad(options)


  dispatch({
    type: 'PUSH_SOUND',
    sound,
  })

  dispatch(playSound(sound))
}

export const createSound = (options) => {
  const sound = new Wad(options)

  return {
    type: 'CREATE_SOUND',
    sound,
  }
}

export const playSound = (sound) => {
  sound.play()

  return {
    type: 'PLAY_SOUND',
    sound,
  }
}

export const stopSound = () => (dispatch, getState) => {
  const { sounds } = getState()
  console.log(sounds)

  if (sounds.length !== 0) {
    const soundArrayLength = sounds.length
    const sound = sounds[soundArrayLength - 1]

    sound.stop()

    dispatch({
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

export const setUser = (payload) => {
  return {
    type: 'SET_USER',
    payload,
  }
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
