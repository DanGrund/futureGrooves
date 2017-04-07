import Wad from 'web-audio-daw'

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

