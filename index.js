import srraf from 'srraf'

export default function updwn ({ speed = 20, interval = 100 }) {
  let position = null
  let time = 0
  let prevtime = 0

  const ups = []
  const downs = []

  srraf(({ y, prevY }, e) => {
    time = e.timeStamp - prevtime
    prevtime = e.timeStamp

    const distance = Math.abs(y - prevY)
    const velocity = ((distance / time) || 0) * interval
    const delta = velocity > speed

    if (y >= prevY && position !== 'down' && delta) {
      position = 'down'
      for (let i = 0; i < downs.length; i++) {
        downs[i]()
      }
    } else if (y <= prevY && position !== 'up' && delta) {
      position = 'up'
      for (let i = 0; i < ups.length; i++) {
        ups[i]()
      }
    }
  })

  return {
    up (fn) {
      ups.indexOf(fn) < 0 && ups.push(fn)
      return () => ups.splice(ups.indexOf(fn), 1)
    },
    down (fn) {
      downs.indexOf(fn) < 0 && downs.push(fn)
      return () => downs.splice(downs.indexOf(fn), 1)
    },
    get position() {
      return position
    }
  }
}
