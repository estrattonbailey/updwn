import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn({
    speed: 100
  }, 'one')
  const ud2 = updwn({
    speed: 400
  }, 'two')

  // window.ud = ud
  window.ud2 = ud2

  // ud.on('up', () => view.innerHTML = 'up')
  // ud.on('down', () => view.innerHTML = 'down')

  ud.on('up', () => console.log('ud up'))
  ud.on('down', () => console.log('ud down'))

  ud2.on('up', () => console.log('ud2 up'))
  ud2.on('down', () =>console.log('ud2 down')) 
})
