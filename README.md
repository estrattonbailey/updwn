# updwn
Detect up/down directional scrolling. **500 bytes gzipped.**

## Install
```bash
npm i updwn --save
```

# Usage
Handlers are only fired when the scroll direction changes and the scroll speed
exceeds a configurable threshold value.
```javascript
import updwn from 'updwn'

const scroll = updwn({ speed: 50 })

scroll.up(() => { /* up */ })
scroll.down(() => { /* down */ })

scroll.position // => 'up' or 'down'
```

Handlers can be destroyed by calling the function returned at the time of their
definition.
```javascript
const destroy = scroll.up(() => { /* up */ })

destroy()
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
