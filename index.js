import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn(() => {
    view.innerHTML = 'up'
  }, () => {
    view.innerHTML = 'down'
  }, {
    speed: 100
  })
})
