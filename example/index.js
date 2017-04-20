import updwn from '../package/index.js'

window.test = updwn()

window.test.on('up', () => console.log('up'))
window.test.on('down', () => console.log('down'))

window.test2 = updwn()

window.test2.on('up', () => console.log('up'))
window.test2.on('down', () => console.log('down'))
