import updwn from '../package/index.js'

document.addEventListener('DOMContentLoaded', e => {
  const view = document.getElementById('view')

  const ud = updwn({
    speed: 100
  })
  const ud2 = updwn({
    speed: 400
  })

  ud.on('up', () => view.innerHTML = 'up')
  ud.on('down', () => view.innerHTML = 'down')

  ud2.on('up', () => console.log('up'))
  ud2.on('down', () =>console.log('down')) 
})
