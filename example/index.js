import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn({
    speed: 200
  })

  ud.on('up', () => view.innerHTML = 'up')
  ud.on('down', () => view.innerHTML = 'down')

  console.log(`
import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn({
    speed: 200
  })

  ud.on('up', () => view.innerHTML = 'up')
  ud.on('down', () => view.innerHTML = 'down')
})
  `)
})
