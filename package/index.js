import srraf from 'srraf'
import svel from 'svel'
import loop from 'loop.js'

let position = null
const emitter = loop()

const merge = (target, ...args) => args.reduce((target, arg) => {
  Object.keys(arg).forEach(k => { target[k] = arg[k] })
  return target
}, target)

const scroller = ({ speed = 50 }) => srraf ? srraf.scroll.use(({ curr, prev }, event) => {
  const fast = svel(curr, event) > speed || 50

  if (curr >= prev && position !== 'down' && fast) {
    position = 'down'
    emitter.emit(position)
  } else if (curr <= prev && position !== 'up' && fast) {
    position = 'up'
    emitter.emit(position)
  } else if (position !== 'static' && !fast) {
    position = 'static'
    emitter.emit('static')
  }
}).update() : {}

export default (opts = {}) => Object.create(merge(scroller(opts), emitter), {
  position: {
    get() {
      return position
    },
  },
})

