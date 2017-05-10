import srraf from 'srraf'
import loop from 'loop.js'

export default (config = {}, name) => {
  let position = 'static'
  let time = 0
  let prevtime = 0

  const emitter = loop()

  const scroller = ({ speed = 50, ...opts }) => srraf ? srraf.scroll.use(({ curr, prev }, event = { timeStamp: 0 }) => {
    time = event.timeStamp - prevtime
    prevtime = event.timeStamp

    const distance = curr - prev < 0 ? (curr - prev) * -1 : curr - prev
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
    } else if (!threshold) {
      handler('static')
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
