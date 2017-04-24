import srraf from 'srraf'
import svel from 'svel'

export default (up, down, config = {}) => {
  let position = null

  const scroller = ({ speed = 50, ...opts }) => srraf ? srraf.scroll.use(({ curr, prev }, event) => {
    const { velocity, flush } = svel(curr, event, opts)
    const threshold = velocity > (speed !== undefined ? speed : 50)

    if (curr >= prev && position !== 'down' && threshold) {
      position = 'down'
      down && down()
      flush()
    } else if (curr <= prev && position !== 'up' && threshold) {
      position = 'up'
      up && up()
      flush()
    }
  }).update() : {}

  return Object.create(
    scroller(config),
    {
      position: {
        get() {
          return position
        },
      },
    }
  )
}
