# updwn
Tiny up/down scroll detection. **2kb gzipped** with dependencies.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Install
```bash
npm i updwn --save
```

## Usage 
```javascript
import updwn from 'updwn'

const updown = updwn({ speed: 50 })

updown.on('up', () => {
  console.log('Scrolling up!')
})
updown.on('down', () => {
  console.log('Scrolling up!')
})

updown.position() // up, down, or static
updown.destroy() // stop listening
```

## Dependencies
- [srraf:](https://github.com/estrattonbailey/srraf) Better scroll and resize listeners using requestAnimationFrame. by [@estrattonbailey](https://github.com/estrattonbailey)
- [svel:](https://github.com/estrattonbailey/svel) Calculate velocity over an interval for scroll or resize events. by [@estrattonbailey](https://github.com/estrattonbailey)
- [loop.js:](https://github.com/estrattonbailey/loop.js) Bare-bones pub/sub style event emitter. by [@estrattonbailey](https://github.com/estrattonbailey)

## Example
TODO: To run the example, clone this repo, then:
```bash
# move into example dir
cd updwn/example
# install deps
npm i
# compile JS
npm run js:build # or js:watch
# serve index.html and update with changes
live-server 
```

MIT License
