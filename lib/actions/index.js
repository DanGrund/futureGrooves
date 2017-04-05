export const increase = (count) => {
  return {
    type: 'INCREASE',
    count
  }
}

export const decrease = (count) => {
  return {
    type: 'DECREASE',
    count
  }
}

export const store = (name) => {
  return {
    type: 'STORE',
    name
  }
}
