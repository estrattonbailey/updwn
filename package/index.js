import srraf from 'srraf'
import loop from 'loop.js'

export default (config = {}) => {
  let position = null
  let time = 0
  let prevtime = 0

  const emitter = loop()

  const scroller = ({ speed = 50, ...opts }) => srraf ? srraf.scroll.use(({ curr, prev }, event = { timeStamp: 0 }) => {
    time = event.timeStamp - prevtime
    prevtime = event.timeStamp

    const distance = Math.abs(curr - prev)
    const velocity = ((distance / time) || 0) * (config.interval || 100)
    const threshold = velocity > speed

    const handler = pos => {
      position = pos
      emitter.emit(pos)
    }

    if (curr >= prev && position !== 'down' && threshold) {
      handler('down')
    } else if (curr <= prev && position !== 'up' && threshold) {
      handler('up')
    }
  }).update() : {}

  return {
    ...scroller(config),
    ...emitter,
    get position() {
      return position
    },
  }
}
