# updwn
Tiny up/down scroll detection. [Demo](http://estrattonbailey.com/updwn/). **~1.8kb with dependencies.**

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Install
```bash
npm i updwn --save
```

## Usage 
Defined up and down scroll handlers, and pass an optional config object. Basic usage with default values:
```javascript
import updwn from 'updwn'

const updown = updwn({ speed: 50 })

updown.on('up', () => console.log('Scrolling up!'))
updown.on('down', () => console.log('Scrolling down!'))

updown.position() // returns 'up', 'down'

// Inherits these methods from underlying srraf instance
updown.update() // check position
updown.destroy() // stop listening
```

## API
Updwn only takes an optional `config` object.

### `config`
The only property added by this library is `speed`. Any further properties that are assigned to this object will be passed to the underlying Svel instance. See the [Svel README](https://github.com/estrattonbailey/svel) for more info.
- `speed` - (default: 50) - translates to the distance (px) travelled over the last 100ms

## Dependencies
- [srraf:](https://github.com/estrattonbailey/srraf) Better scroll and resize listeners using requestAnimationFrame. by [@estrattonbailey](https://github.com/estrattonbailey)
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
