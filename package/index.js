import srraf from 'srraf'
import svel from 'svel'
import loop from 'loop.js'

export default (config = {}) => {
  let position = null
  const emitter = loop()

  const scroller = ({ speed = 50, ...opts }) => srraf ? srraf.scroll.use(({ curr, prev }, event) => {
    const { velocity, flush } = svel(curr, event, opts)
    const threshold = velocity > (speed !== undefined ? speed : 50)

    const handler = pos => {
      position = pos
      emitter.emit(pos)
      flush && flush()
    }

    if (curr >= prev && position !== 'down' && threshold) {
      handler('down')
    } else if (curr <= prev && position !== 'up' && threshold) {
      handler('up')
    } else if (position !== 'static' && !threshold) {
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
