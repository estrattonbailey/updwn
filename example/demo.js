(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../package/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
  var view = document.getElementById('view');

  var ud = (0, _index2.default)({
    speed: 100
  });
  var ud2 = (0, _index2.default)({
    speed: 400
  });

  ud.on('up', function () {
    return view.innerHTML = 'up';
  });
  ud.on('down', function () {
    return view.innerHTML = 'down';
  });

  ud2.on('up', function () {
    return console.log('up');
  });
  ud2.on('down', function () {
    return console.log('down');
  });
});

},{"../package/index.js":2}],2:[function(require,module,exports){
'use strict';var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a},_srraf=require('srraf'),_srraf2=_interopRequireDefault(_srraf),_svel2=require('svel'),_svel3=_interopRequireDefault(_svel2),_loop=require('loop.js'),_loop2=_interopRequireDefault(_loop);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectWithoutProperties(a,b){var d={};for(var c in a)0<=b.indexOf(c)||Object.prototype.hasOwnProperty.call(a,c)&&(d[c]=a[c]);return d}exports.default=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=null,c=(0,_loop2.default)();return _extends({},function d(e){var f=e.speed,g=f===void 0?50:f,h=_objectWithoutProperties(e,['speed']);return _srraf2.default?_srraf2.default.scroll.use(function(j,k){var l=j.curr,m=j.prev,n=(0,_svel3.default)(l,k,h),o=n.velocity,p=n.flush,q=o>(g===void 0?50:g),r=function(s){b=s,c.emit(s),p&&p()};l>=m&&'down'!==b&&q?r('down'):l<=m&&'up'!==b&&q?r('up'):'static'!==b&&!q&&r('static')}).update():{}}(a),c,{get position(){return b}})};

},{"loop.js":3,"srraf":4,"svel":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var listeners = {};

  var on = function on(e) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!cb) return;
    listeners[e] = listeners[e] || { queue: [] };
    listeners[e].queue.push(cb);
  };

  var emit = function emit(e) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var items = listeners[e] ? listeners[e].queue : false;
    items && items.forEach(function (i) {
      return i(data);
    });
  };

  return _extends({}, o, {
    emit: emit,
    on: on
  });
};
},{}],4:[function(require,module,exports){
'use strict';var _createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var scrollInstance=null,resizeInstance=null,Listener=function(){function a(b){_classCallCheck(this,a),this.type=b,this.pool=0,this.queue=[],this.curr=this.position(),this.prev=this.position(),this.ticking=!1,window.addEventListener(b,this.requestFrame.bind(this))}return _createClass(a,[{key:'position',value:function position(){return'scroll'===this.type?window.scrollY||window.pageYOffset:window.innerWidth}},{key:'requestFrame',value:function requestFrame(b){this.e=b,this.curr=this.position(),this.ticking||(window.requestAnimationFrame(this.run.bind(this)),this.ticking=!0)}},{key:'run',value:function run(){var b=this;this.queue.forEach(function(c){return c[1]({curr:b.curr,prev:b.prev},b.e)}),this.prev=this.curr,this.ticking=!1}},{key:'use',value:function use(b){var c=this,d=c.pool++;return c.queue.push([d,b]),{destroy:function destroy(){return c.queue.forEach(function(f,g){f[0]===d&&c.queue.splice(g,1)}),this},update:function update(){return b({curr:c.curr,prev:c.prev},c.e),this}}}},{key:'update',value:function update(){this.run()}}]),a}();exports.default='undefined'==typeof window?null:{get scroll(){return scrollInstance||(scrollInstance=new Listener('scroll')),scrollInstance},get resize(){return resizeInstance||(resizeInstance=new Listener('resize')),resizeInstance},use:function use(a){var _scroll=this.scroll,b=_scroll.curr,c=_scroll.prev,_resize=this.resize,d=_resize.curr,f=_resize.prev,g={currY:b,prevY:c,currX:d,prevX:f},h=this.scroll.use(function(_ref,m){var k=_ref.curr,l=_ref.prev;g.currY=k,g.prevY=l,a(g,m)}),j=this.resize.use(function(_ref2,m){var k=_ref2.curr,l=_ref2.prev;g.currX=k,g.prevX=l,a(g,m)});return{destroy:function destroy(){return h.destroy(),j.destroy(),this},update:function update(){return h.update(),j.update(),this}}}};
},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var time=0,prevtime=0,distance=0,prevscroll=null,pool=[],timeout=null,flush=function(){time=0,prevtime=0,distance=0,prevscroll=0,pool=[]};exports.default=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{timeStamp:0},c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},d=0;if(!b.timeStamp||0===b.timeStamp)return 0;time=b.timeStamp-prevtime,distance=Math.abs(a-prevscroll||0),prevscroll=a,prevtime=b.timeStamp,pool.push(distance/(time*(1/(c.interval||100)))),pool.length>(c.pool||10)&&pool.shift(),timeout=setTimeout(flush,c.reset||50),timeout&&clearTimeout(timeout);for(var e=0;e<pool.length;e++)return d=pool[e]+d,{velocity:d/(e+1),flush:flush};return{velocity:0,flush:flush}};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIi4uL3BhY2thZ2UvaW5kZXguanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy9sb29wLmpzL2Rpc3QvaW5kZXguanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy9zcnJhZi9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9ub2RlX21vZHVsZXMvc3ZlbC9kaXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCxNQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQWI7O0FBRUEsTUFBTSxLQUFLLHFCQUFNO0FBQ2YsV0FBTztBQURRLEdBQU4sQ0FBWDtBQUdBLE1BQU0sTUFBTSxxQkFBTTtBQUNoQixXQUFPO0FBRFMsR0FBTixDQUFaOztBQUlBLEtBQUcsRUFBSCxDQUFNLElBQU4sRUFBWTtBQUFBLFdBQU0sS0FBSyxTQUFMLEdBQWlCLElBQXZCO0FBQUEsR0FBWjtBQUNBLEtBQUcsRUFBSCxDQUFNLE1BQU4sRUFBYztBQUFBLFdBQU0sS0FBSyxTQUFMLEdBQWlCLE1BQXZCO0FBQUEsR0FBZDs7QUFFQSxNQUFJLEVBQUosQ0FBTyxJQUFQLEVBQWE7QUFBQSxXQUFNLFFBQVEsR0FBUixDQUFZLElBQVosQ0FBTjtBQUFBLEdBQWI7QUFDQSxNQUFJLEVBQUosQ0FBTyxNQUFQLEVBQWU7QUFBQSxXQUFLLFFBQVEsR0FBUixDQUFZLE1BQVosQ0FBTDtBQUFBLEdBQWY7QUFDRCxDQWZEOzs7a3BCQ0VlLFVBQWlCLElBQWhCLEVBQWdCLDJEQUMxQixFQUFXLElBRGUsQ0FFeEIsRUFBVSxvQkFGYyxDQXVCOUIsbUJBbkJpQixRQUFYLEVBQVcsWUFBRyxLQUFILENBQUcsQ0FBSCxZQUFXLEVBQVgsR0FBa0IsQ0FBbEIsNkNBQTZCLGlCQUFRLGdCQUFNLE1BQU4sQ0FBYSxHQUFiLENBQWlCLFdBQWlCLENBQWpCLENBQTJCLElBQXhCLEVBQXdCLEdBQXhCLElBQXdCLENBQWxCLENBQWtCLEdBQWxCLElBQWtCLEdBQ3BFLG1CQUFLLENBQUwsQ0FBVyxDQUFYLENBQWtCLENBQWxCLENBRG9FLENBQ3hGLENBRHdGLEdBQ3hGLFFBRHdGLENBQzlFLENBRDhFLEdBQzlFLEtBRDhFLENBRTFGLEVBQVksR0FBWSxXQUE4QixFQUE5QixDQUFzQixDQUFsQyxDQUY4RSxDQUkxRixFQUFVLFdBQU8sQ0FDckIsRUFBVyxDQURVLENBRXJCLEVBQVEsSUFBUixDQUFhLENBQWIsQ0FGcUIsQ0FHckIsR0FBUyxHQUNWLENBUitGLENBVTVGLEdBQVEsQ0FBUixFQUE2QixNQUFiLElBQWhCLEVBQXVDLENBVnFELENBVzlGLEVBQVEsTUFBUixDQVg4RixDQVlyRixHQUFRLENBQVIsRUFBNkIsSUFBYixJQUFoQixFQUFxQyxDQVpnRCxDQWE5RixFQUFRLElBQVIsQ0FiOEYsQ0FjeEUsUUFBYixNQUF5QixDQUFDLENBZDJELEVBZTlGLEVBQVEsUUFBUixDQUVILENBakJxRCxFQWlCbkQsTUFqQm1ELEVBQVIsR0FBN0IsQ0FvQlosQ0FBUyxDQUFULENBREwsQ0FFSyxDQUZMLEVBR0UsR0FBSSxTQUFKLEVBQWUsQ0FDYixNQUFPLEVBQ1IsQ0FMSCxFQU9ELEM7OztBQ2xDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTs7QUNBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgdXBkd24gZnJvbSAnLi4vcGFja2FnZS9pbmRleC5qcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGUgPT4ge1xuICBjb25zdCB2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXcnKVxuXG4gIGNvbnN0IHVkID0gdXBkd24oe1xuICAgIHNwZWVkOiAxMDBcbiAgfSlcbiAgY29uc3QgdWQyID0gdXBkd24oe1xuICAgIHNwZWVkOiA0MDBcbiAgfSlcblxuICB1ZC5vbigndXAnLCAoKSA9PiB2aWV3LmlubmVySFRNTCA9ICd1cCcpXG4gIHVkLm9uKCdkb3duJywgKCkgPT4gdmlldy5pbm5lckhUTUwgPSAnZG93bicpXG5cbiAgdWQyLm9uKCd1cCcsICgpID0+IGNvbnNvbGUubG9nKCd1cCcpKVxuICB1ZDIub24oJ2Rvd24nLCAoKSA9PmNvbnNvbGUubG9nKCdkb3duJykpIFxufSlcbiIsImltcG9ydCBzcnJhZiBmcm9tICdzcnJhZidcbmltcG9ydCBzdmVsIGZyb20gJ3N2ZWwnXG5pbXBvcnQgbG9vcCBmcm9tICdsb29wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnID0ge30pID0+IHtcbiAgbGV0IHBvc2l0aW9uID0gbnVsbFxuICBjb25zdCBlbWl0dGVyID0gbG9vcCgpXG5cbiAgY29uc3Qgc2Nyb2xsZXIgPSAoeyBzcGVlZCA9IDUwLCAuLi5vcHRzIH0pID0+IHNycmFmID8gc3JyYWYuc2Nyb2xsLnVzZSgoeyBjdXJyLCBwcmV2IH0sIGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyB2ZWxvY2l0eSwgZmx1c2ggfSA9IHN2ZWwoY3VyciwgZXZlbnQsIG9wdHMpXG4gICAgY29uc3QgdGhyZXNob2xkID0gdmVsb2NpdHkgPiAoc3BlZWQgIT09IHVuZGVmaW5lZCA/IHNwZWVkIDogNTApXG5cbiAgICBjb25zdCBoYW5kbGVyID0gcG9zID0+IHtcbiAgICAgIHBvc2l0aW9uID0gcG9zXG4gICAgICBlbWl0dGVyLmVtaXQocG9zKVxuICAgICAgZmx1c2ggJiYgZmx1c2goKVxuICAgIH1cblxuICAgIGlmIChjdXJyID49IHByZXYgJiYgcG9zaXRpb24gIT09ICdkb3duJyAmJiB0aHJlc2hvbGQpIHtcbiAgICAgIGhhbmRsZXIoJ2Rvd24nKVxuICAgIH0gZWxzZSBpZiAoY3VyciA8PSBwcmV2ICYmIHBvc2l0aW9uICE9PSAndXAnICYmIHRocmVzaG9sZCkge1xuICAgICAgaGFuZGxlcigndXAnKVxuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gIT09ICdzdGF0aWMnICYmICF0aHJlc2hvbGQpIHtcbiAgICAgIGhhbmRsZXIoJ3N0YXRpYycpXG4gICAgfVxuICB9KS51cGRhdGUoKSA6IHt9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zY3JvbGxlcihjb25maWcpLFxuICAgIC4uLmVtaXR0ZXIsXG4gICAgZ2V0IHBvc2l0aW9uKCkge1xuICAgICAgcmV0dXJuIHBvc2l0aW9uXG4gICAgfSxcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG8gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB7fTtcblxuICB2YXIgb24gPSBmdW5jdGlvbiBvbihlKSB7XG4gICAgdmFyIGNiID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG4gICAgaWYgKCFjYikgcmV0dXJuO1xuICAgIGxpc3RlbmVyc1tlXSA9IGxpc3RlbmVyc1tlXSB8fCB7IHF1ZXVlOiBbXSB9O1xuICAgIGxpc3RlbmVyc1tlXS5xdWV1ZS5wdXNoKGNiKTtcbiAgfTtcblxuICB2YXIgZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZSkge1xuICAgIHZhciBkYXRhID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG4gICAgdmFyIGl0ZW1zID0gbGlzdGVuZXJzW2VdID8gbGlzdGVuZXJzW2VdLnF1ZXVlIDogZmFsc2U7XG4gICAgaXRlbXMgJiYgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIGkoZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBvLCB7XG4gICAgZW1pdDogZW1pdCxcbiAgICBvbjogb25cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0Jzt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShiLGMpe2Zvcih2YXIgZixkPTA7ZDxjLmxlbmd0aDtkKyspZj1jW2RdLGYuZW51bWVyYWJsZT1mLmVudW1lcmFibGV8fCExLGYuY29uZmlndXJhYmxlPSEwLCd2YWx1ZSdpbiBmJiYoZi53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIsZi5rZXksZil9cmV0dXJuIGZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gYyYmYShiLnByb3RvdHlwZSxjKSxkJiZhKGIsZCksYn19KCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsJ19fZXNNb2R1bGUnLHt2YWx1ZTohMH0pO2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBzY3JvbGxJbnN0YW5jZT1udWxsLHJlc2l6ZUluc3RhbmNlPW51bGwsTGlzdGVuZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGIpe19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMudHlwZT1iLHRoaXMucG9vbD0wLHRoaXMucXVldWU9W10sdGhpcy5jdXJyPXRoaXMucG9zaXRpb24oKSx0aGlzLnByZXY9dGhpcy5wb3NpdGlvbigpLHRoaXMudGlja2luZz0hMSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihiLHRoaXMucmVxdWVzdEZyYW1lLmJpbmQodGhpcykpfXJldHVybiBfY3JlYXRlQ2xhc3MoYSxbe2tleToncG9zaXRpb24nLHZhbHVlOmZ1bmN0aW9uIHBvc2l0aW9uKCl7cmV0dXJuJ3Njcm9sbCc9PT10aGlzLnR5cGU/d2luZG93LnNjcm9sbFl8fHdpbmRvdy5wYWdlWU9mZnNldDp3aW5kb3cuaW5uZXJXaWR0aH19LHtrZXk6J3JlcXVlc3RGcmFtZScsdmFsdWU6ZnVuY3Rpb24gcmVxdWVzdEZyYW1lKGIpe3RoaXMuZT1iLHRoaXMuY3Vycj10aGlzLnBvc2l0aW9uKCksdGhpcy50aWNraW5nfHwod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bi5iaW5kKHRoaXMpKSx0aGlzLnRpY2tpbmc9ITApfX0se2tleToncnVuJyx2YWx1ZTpmdW5jdGlvbiBydW4oKXt2YXIgYj10aGlzO3RoaXMucXVldWUuZm9yRWFjaChmdW5jdGlvbihjKXtyZXR1cm4gY1sxXSh7Y3VycjpiLmN1cnIscHJldjpiLnByZXZ9LGIuZSl9KSx0aGlzLnByZXY9dGhpcy5jdXJyLHRoaXMudGlja2luZz0hMX19LHtrZXk6J3VzZScsdmFsdWU6ZnVuY3Rpb24gdXNlKGIpe3ZhciBjPXRoaXMsZD1jLnBvb2wrKztyZXR1cm4gYy5xdWV1ZS5wdXNoKFtkLGJdKSx7ZGVzdHJveTpmdW5jdGlvbiBkZXN0cm95KCl7cmV0dXJuIGMucXVldWUuZm9yRWFjaChmdW5jdGlvbihmLGcpe2ZbMF09PT1kJiZjLnF1ZXVlLnNwbGljZShnLDEpfSksdGhpc30sdXBkYXRlOmZ1bmN0aW9uIHVwZGF0ZSgpe3JldHVybiBiKHtjdXJyOmMuY3VycixwcmV2OmMucHJldn0sYy5lKSx0aGlzfX19fSx7a2V5Oid1cGRhdGUnLHZhbHVlOmZ1bmN0aW9uIHVwZGF0ZSgpe3RoaXMucnVuKCl9fV0pLGF9KCk7ZXhwb3J0cy5kZWZhdWx0PSd1bmRlZmluZWQnPT10eXBlb2Ygd2luZG93P251bGw6e2dldCBzY3JvbGwoKXtyZXR1cm4gc2Nyb2xsSW5zdGFuY2V8fChzY3JvbGxJbnN0YW5jZT1uZXcgTGlzdGVuZXIoJ3Njcm9sbCcpKSxzY3JvbGxJbnN0YW5jZX0sZ2V0IHJlc2l6ZSgpe3JldHVybiByZXNpemVJbnN0YW5jZXx8KHJlc2l6ZUluc3RhbmNlPW5ldyBMaXN0ZW5lcigncmVzaXplJykpLHJlc2l6ZUluc3RhbmNlfSx1c2U6ZnVuY3Rpb24gdXNlKGEpe3ZhciBfc2Nyb2xsPXRoaXMuc2Nyb2xsLGI9X3Njcm9sbC5jdXJyLGM9X3Njcm9sbC5wcmV2LF9yZXNpemU9dGhpcy5yZXNpemUsZD1fcmVzaXplLmN1cnIsZj1fcmVzaXplLnByZXYsZz17Y3Vyclk6YixwcmV2WTpjLGN1cnJYOmQscHJldlg6Zn0saD10aGlzLnNjcm9sbC51c2UoZnVuY3Rpb24oX3JlZixtKXt2YXIgaz1fcmVmLmN1cnIsbD1fcmVmLnByZXY7Zy5jdXJyWT1rLGcucHJldlk9bCxhKGcsbSl9KSxqPXRoaXMucmVzaXplLnVzZShmdW5jdGlvbihfcmVmMixtKXt2YXIgaz1fcmVmMi5jdXJyLGw9X3JlZjIucHJldjtnLmN1cnJYPWssZy5wcmV2WD1sLGEoZyxtKX0pO3JldHVybntkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtyZXR1cm4gaC5kZXN0cm95KCksai5kZXN0cm95KCksdGhpc30sdXBkYXRlOmZ1bmN0aW9uIHVwZGF0ZSgpe3JldHVybiBoLnVwZGF0ZSgpLGoudXBkYXRlKCksdGhpc319fX07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHRpbWU9MCxwcmV2dGltZT0wLGRpc3RhbmNlPTAscHJldnNjcm9sbD1udWxsLHBvb2w9W10sdGltZW91dD1udWxsLGZsdXNoPWZ1bmN0aW9uKCl7dGltZT0wLHByZXZ0aW1lPTAsZGlzdGFuY2U9MCxwcmV2c2Nyb2xsPTAscG9vbD1bXX07ZXhwb3J0cy5kZWZhdWx0PWZ1bmN0aW9uKGEpe3ZhciBiPTE8YXJndW1lbnRzLmxlbmd0aCYmYXJndW1lbnRzWzFdIT09dm9pZCAwP2FyZ3VtZW50c1sxXTp7dGltZVN0YW1wOjB9LGM9Mjxhcmd1bWVudHMubGVuZ3RoJiZhcmd1bWVudHNbMl0hPT12b2lkIDA/YXJndW1lbnRzWzJdOnt9LGQ9MDtpZighYi50aW1lU3RhbXB8fDA9PT1iLnRpbWVTdGFtcClyZXR1cm4gMDt0aW1lPWIudGltZVN0YW1wLXByZXZ0aW1lLGRpc3RhbmNlPU1hdGguYWJzKGEtcHJldnNjcm9sbHx8MCkscHJldnNjcm9sbD1hLHByZXZ0aW1lPWIudGltZVN0YW1wLHBvb2wucHVzaChkaXN0YW5jZS8odGltZSooMS8oYy5pbnRlcnZhbHx8MTAwKSkpKSxwb29sLmxlbmd0aD4oYy5wb29sfHwxMCkmJnBvb2wuc2hpZnQoKSx0aW1lb3V0PXNldFRpbWVvdXQoZmx1c2gsYy5yZXNldHx8NTApLHRpbWVvdXQmJmNsZWFyVGltZW91dCh0aW1lb3V0KTtmb3IodmFyIGU9MDtlPHBvb2wubGVuZ3RoO2UrKylyZXR1cm4gZD1wb29sW2VdK2Qse3ZlbG9jaXR5OmQvKGUrMSksZmx1c2g6Zmx1c2h9O3JldHVybnt2ZWxvY2l0eTowLGZsdXNoOmZsdXNofX07Il19
