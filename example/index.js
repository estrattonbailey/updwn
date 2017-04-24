import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn({
    speed: 100
  })

  ud.on('up', () => view.innerHTML = 'up')
  ud.on('down', () => view.innerHTML = 'down')
})
