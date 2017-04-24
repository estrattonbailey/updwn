# updwn
Tiny up/down scroll detection. [Demo](http://estrattonbailey.com/updwn/). ~419b gzipped (1.7kb with dependencies).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Install
```bash
npm i updwn --save
```

## Usage 
Defined up and down scroll handlers, and pass an optional config object. Basic usage with default values:
```javascript
import updwn from 'updwn'

const up = () => {
  console.log('Scrolling up!')
})
const down = () => {
  console.log('Scrolling down!')
})

const updown = updwn(up, down, { speed: 50 })

updown.position() // up, down, or static
updown.destroy() // stop listening
```

## API
Updwn takes three arguments: `up`, `down` and a `config` object.

### `up` and `down`
These should be functions, and receive no arguments. They are fired each time the scroll direction changes, provided the scroll speed is faster than the defined `config.speed` property.

### `config`
The only property added by this library is `speed`. Any further properties that are assigned to this object will be passed to the underlying Svel instance. See the [Svel README](https://github.com/estrattonbailey/svel) for more info.
- `speed` - (default: 50) - translates to the distance (px) travelled over the last 100ms

## Dependencies
- [srraf:](https://github.com/estrattonbailey/srraf) Better scroll and resize listeners using requestAnimationFrame. by [@estrattonbailey](https://github.com/estrattonbailey)
- [svel:](https://github.com/estrattonbailey/svel) Calculate velocity over an interval for scroll or resize events. by [@estrattonbailey](https://github.com/estrattonbailey)

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
