(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var time=0,prevtime=0,distance=0,prevscroll=null,pool=[],timeout=null,flush=function(){time=0,prevtime=0,distance=0,prevscroll=0,pool=[]};exports.default=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{timeStamp:0},c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},d=0;if(!b.timeStamp||0===b.timeStamp)return 0;time=b.timeStamp-prevtime,distance=Math.abs(a-prevscroll||0),prevscroll=a,prevtime=b.timeStamp,pool.push(distance/(time*(1/(c.interval||100)))),pool.length>(c.pool||10)&&pool.shift(),timeout=setTimeout(flush,c.reset||50),timeout&&clearTimeout(timeout);for(var e=0;e<pool.length;e++)return d=pool[e]+d,{velocity:d/(e+1),flush:flush};return{velocity:0,flush:flush}};
},{}],2:[function(require,module,exports){
'use strict';

var _index = require('../package/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
  var view = document.getElementById('view');

  var ud = (0, _index2.default)(function () {
    view.innerHTML = 'up';
  }, function () {
    view.innerHTML = 'down';
  }, {
    speed: 100
  });
});

},{"../package/index.js":3}],3:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _srraf=require('srraf'),_srraf2=_interopRequireDefault(_srraf),_svel2=require('svel'),_svel3=_interopRequireDefault(_svel2);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectWithoutProperties(a,b){var d={};for(var c in a)0<=b.indexOf(c)||Object.prototype.hasOwnProperty.call(a,c)&&(d[c]=a[c]);return d}exports.default=function(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},d=null;return Object.create(function e(f){var g=f.speed,h=g===void 0?50:g,j=_objectWithoutProperties(f,['speed']);return _srraf2.default?_srraf2.default.scroll.use(function(k,l){var m=k.curr,n=k.prev,o=(0,_svel3.default)(m,l,j),p=o.velocity,q=o.flush,r=p>(h===void 0?50:h);m>=n&&'down'!==d&&r?(d='down',b&&b(),q()):m<=n&&'up'!==d&&r&&(d='up',a&&a(),q())}).update():{}}(c),{position:{get:function get(){return d}}})};

},{"srraf":4,"svel":1}],4:[function(require,module,exports){
'use strict';var _createClass=function(){function a(b,c){for(var f,d=0;d<c.length;d++)f=c[d],f.enumerable=f.enumerable||!1,f.configurable=!0,'value'in f&&(f.writable=!0),Object.defineProperty(b,f.key,f)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var scrollInstance=null,resizeInstance=null,Listener=function(){function a(b){_classCallCheck(this,a),this.type=b,this.pool=0,this.queue=[],this.curr=this.position(),this.prev=this.position(),this.ticking=!1,window.addEventListener(b,this.requestFrame.bind(this))}return _createClass(a,[{key:'position',value:function position(){return'scroll'===this.type?window.scrollY||window.pageYOffset:window.innerWidth}},{key:'requestFrame',value:function requestFrame(b){this.e=b,this.curr=this.position(),this.ticking||(window.requestAnimationFrame(this.run.bind(this)),this.ticking=!0)}},{key:'run',value:function run(){var b=this;this.queue.forEach(function(c){return c[1]({curr:b.curr,prev:b.prev},b.e)}),this.prev=this.curr,this.ticking=!1}},{key:'use',value:function use(b){var c=this,d=c.pool++;return c.queue.push([d,b]),{destroy:function destroy(){return c.queue.forEach(function(f,g){f[0]===d&&c.queue.splice(g,1)}),this},update:function update(){return b({curr:c.curr,prev:c.prev},c.e),this}}}},{key:'update',value:function update(){this.run()}}]),a}();exports.default='undefined'==typeof window?null:{get scroll(){return scrollInstance||(scrollInstance=new Listener('scroll')),scrollInstance},get resize(){return resizeInstance||(resizeInstance=new Listener('resize')),resizeInstance},use:function use(a){var _scroll=this.scroll,b=_scroll.curr,c=_scroll.prev,_resize=this.resize,d=_resize.curr,f=_resize.prev,g={currY:b,prevY:c,currX:d,prevX:f},h=this.scroll.use(function(_ref,m){var k=_ref.curr,l=_ref.prev;g.currY=k,g.prevY=l,a(g,m)}),j=this.resize.use(function(_ref2,m){var k=_ref2.curr,l=_ref2.prev;g.currX=k,g.prevX=l,a(g,m)});return{destroy:function destroy(){return h.destroy(),j.destroy(),this},update:function update(){return h.update(),j.update(),this}}}};
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9zdmVsL3BhY2thZ2UvZGlzdC9pbmRleC5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9pbmRleC5qcyIsIi4uL3BhY2thZ2Uvbm9kZV9tb2R1bGVzL3NycmFmL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQ0FBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxhQUFLO0FBQ2pELE1BQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjs7QUFFQSxNQUFNLEtBQUsscUJBQU0sWUFBTTtBQUNyQixTQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxHQUZVLEVBRVIsWUFBTTtBQUNQLFNBQUssU0FBTCxHQUFpQixNQUFqQjtBQUNELEdBSlUsRUFJUjtBQUNELFdBQU87QUFETixHQUpRLENBQVg7QUFPRCxDQVZEOzs7b0VDRkEsZ0ksd09BR2UsU0FBQyxDQUFELENBQUssQ0FBTCxDQUEyQixJQUFoQixFQUFnQiwyREFDcEMsRUFBVyxJQUR5QixDQWtCeEMsTUFBTyxRQUFPLE1BQVAsQ0FmVSxRQUFYLEVBQVcsWUFBRyxLQUFILENBQUcsQ0FBSCxZQUFXLEVBQVgsR0FBa0IsQ0FBbEIsNkNBQTZCLGlCQUFRLGdCQUFNLE1BQU4sQ0FBYSxHQUFiLENBQWlCLFdBQWlCLENBQWpCLENBQTJCLElBQXhCLEVBQXdCLEdBQXhCLElBQXdCLENBQWxCLENBQWtCLEdBQWxCLElBQWtCLEdBQ3BFLG1CQUFLLENBQUwsQ0FBVyxDQUFYLENBQWtCLENBQWxCLENBRG9FLENBQ3hGLENBRHdGLEdBQ3hGLFFBRHdGLENBQzlFLENBRDhFLEdBQzlFLEtBRDhFLENBRTFGLEVBQVksR0FBWSxXQUE4QixFQUE5QixDQUFzQixDQUFsQyxDQUY4RSxDQUk1RixHQUFRLENBQVIsRUFBNkIsTUFBYixJQUFoQixFQUF1QyxDQUpxRCxFQUs5RixFQUFXLE1BTG1GLENBTTlGLEdBQVEsR0FOc0YsQ0FPOUYsR0FQOEYsRUFRckYsR0FBUSxDQUFSLEVBQTZCLElBQWIsSUFBaEIsRUFBcUMsQ0FSZ0QsR0FTOUYsRUFBVyxJQVRtRixDQVU5RixHQUFNLEdBVndGLENBVzlGLEdBWDhGLENBYWpHLENBYnFELEVBYW5ELE1BYm1ELEVBQVIsR0FBN0IsQ0FnQmYsQ0FBUyxDQUFULENBREssQ0FFTCxDQUNFLFNBQVUsQ0FDUixHQURRLGVBQ0YsQ0FDSixNQUFPLEVBQ1IsQ0FITyxDQURaLENBRkssQ0FVUixDOzs7QUMvQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHRpbWU9MCxwcmV2dGltZT0wLGRpc3RhbmNlPTAscHJldnNjcm9sbD1udWxsLHBvb2w9W10sdGltZW91dD1udWxsLGZsdXNoPWZ1bmN0aW9uKCl7dGltZT0wLHByZXZ0aW1lPTAsZGlzdGFuY2U9MCxwcmV2c2Nyb2xsPTAscG9vbD1bXX07ZXhwb3J0cy5kZWZhdWx0PWZ1bmN0aW9uKGEpe3ZhciBiPTE8YXJndW1lbnRzLmxlbmd0aCYmYXJndW1lbnRzWzFdIT09dm9pZCAwP2FyZ3VtZW50c1sxXTp7dGltZVN0YW1wOjB9LGM9Mjxhcmd1bWVudHMubGVuZ3RoJiZhcmd1bWVudHNbMl0hPT12b2lkIDA/YXJndW1lbnRzWzJdOnt9LGQ9MDtpZighYi50aW1lU3RhbXB8fDA9PT1iLnRpbWVTdGFtcClyZXR1cm4gMDt0aW1lPWIudGltZVN0YW1wLXByZXZ0aW1lLGRpc3RhbmNlPU1hdGguYWJzKGEtcHJldnNjcm9sbHx8MCkscHJldnNjcm9sbD1hLHByZXZ0aW1lPWIudGltZVN0YW1wLHBvb2wucHVzaChkaXN0YW5jZS8odGltZSooMS8oYy5pbnRlcnZhbHx8MTAwKSkpKSxwb29sLmxlbmd0aD4oYy5wb29sfHwxMCkmJnBvb2wuc2hpZnQoKSx0aW1lb3V0PXNldFRpbWVvdXQoZmx1c2gsYy5yZXNldHx8NTApLHRpbWVvdXQmJmNsZWFyVGltZW91dCh0aW1lb3V0KTtmb3IodmFyIGU9MDtlPHBvb2wubGVuZ3RoO2UrKylyZXR1cm4gZD1wb29sW2VdK2Qse3ZlbG9jaXR5OmQvKGUrMSksZmx1c2g6Zmx1c2h9O3JldHVybnt2ZWxvY2l0eTowLGZsdXNoOmZsdXNofX07IiwiaW1wb3J0IHVwZHduIGZyb20gJy4uL3BhY2thZ2UvaW5kZXguanMnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcbiAgY29uc3QgdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3JylcblxuICBjb25zdCB1ZCA9IHVwZHduKCgpID0+IHtcbiAgICB2aWV3LmlubmVySFRNTCA9ICd1cCdcbiAgfSwgKCkgPT4ge1xuICAgIHZpZXcuaW5uZXJIVE1MID0gJ2Rvd24nXG4gIH0sIHtcbiAgICBzcGVlZDogMTAwXG4gIH0pXG59KVxuIiwiaW1wb3J0IHNycmFmIGZyb20gJ3NycmFmJ1xuaW1wb3J0IHN2ZWwgZnJvbSAnc3ZlbCdcblxuZXhwb3J0IGRlZmF1bHQgKHVwLCBkb3duLCBjb25maWcgPSB7fSkgPT4ge1xuICBsZXQgcG9zaXRpb24gPSBudWxsXG5cbiAgY29uc3Qgc2Nyb2xsZXIgPSAoeyBzcGVlZCA9IDUwLCAuLi5vcHRzIH0pID0+IHNycmFmID8gc3JyYWYuc2Nyb2xsLnVzZSgoeyBjdXJyLCBwcmV2IH0sIGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyB2ZWxvY2l0eSwgZmx1c2ggfSA9IHN2ZWwoY3VyciwgZXZlbnQsIG9wdHMpXG4gICAgY29uc3QgdGhyZXNob2xkID0gdmVsb2NpdHkgPiAoc3BlZWQgIT09IHVuZGVmaW5lZCA/IHNwZWVkIDogNTApXG5cbiAgICBpZiAoY3VyciA+PSBwcmV2ICYmIHBvc2l0aW9uICE9PSAnZG93bicgJiYgdGhyZXNob2xkKSB7XG4gICAgICBwb3NpdGlvbiA9ICdkb3duJ1xuICAgICAgZG93biAmJiBkb3duKClcbiAgICAgIGZsdXNoKClcbiAgICB9IGVsc2UgaWYgKGN1cnIgPD0gcHJldiAmJiBwb3NpdGlvbiAhPT0gJ3VwJyAmJiB0aHJlc2hvbGQpIHtcbiAgICAgIHBvc2l0aW9uID0gJ3VwJ1xuICAgICAgdXAgJiYgdXAoKVxuICAgICAgZmx1c2goKVxuICAgIH1cbiAgfSkudXBkYXRlKCkgOiB7fVxuXG4gIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgIHNjcm9sbGVyKGNvbmZpZyksXG4gICAge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBwb3NpdGlvblxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9XG4gIClcbn1cbiIsIid1c2Ugc3RyaWN0Jzt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShiLGMpe2Zvcih2YXIgZixkPTA7ZDxjLmxlbmd0aDtkKyspZj1jW2RdLGYuZW51bWVyYWJsZT1mLmVudW1lcmFibGV8fCExLGYuY29uZmlndXJhYmxlPSEwLCd2YWx1ZSdpbiBmJiYoZi53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIsZi5rZXksZil9cmV0dXJuIGZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gYyYmYShiLnByb3RvdHlwZSxjKSxkJiZhKGIsZCksYn19KCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsJ19fZXNNb2R1bGUnLHt2YWx1ZTohMH0pO2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBzY3JvbGxJbnN0YW5jZT1udWxsLHJlc2l6ZUluc3RhbmNlPW51bGwsTGlzdGVuZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGIpe19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMudHlwZT1iLHRoaXMucG9vbD0wLHRoaXMucXVldWU9W10sdGhpcy5jdXJyPXRoaXMucG9zaXRpb24oKSx0aGlzLnByZXY9dGhpcy5wb3NpdGlvbigpLHRoaXMudGlja2luZz0hMSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihiLHRoaXMucmVxdWVzdEZyYW1lLmJpbmQodGhpcykpfXJldHVybiBfY3JlYXRlQ2xhc3MoYSxbe2tleToncG9zaXRpb24nLHZhbHVlOmZ1bmN0aW9uIHBvc2l0aW9uKCl7cmV0dXJuJ3Njcm9sbCc9PT10aGlzLnR5cGU/d2luZG93LnNjcm9sbFl8fHdpbmRvdy5wYWdlWU9mZnNldDp3aW5kb3cuaW5uZXJXaWR0aH19LHtrZXk6J3JlcXVlc3RGcmFtZScsdmFsdWU6ZnVuY3Rpb24gcmVxdWVzdEZyYW1lKGIpe3RoaXMuZT1iLHRoaXMuY3Vycj10aGlzLnBvc2l0aW9uKCksdGhpcy50aWNraW5nfHwod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bi5iaW5kKHRoaXMpKSx0aGlzLnRpY2tpbmc9ITApfX0se2tleToncnVuJyx2YWx1ZTpmdW5jdGlvbiBydW4oKXt2YXIgYj10aGlzO3RoaXMucXVldWUuZm9yRWFjaChmdW5jdGlvbihjKXtyZXR1cm4gY1sxXSh7Y3VycjpiLmN1cnIscHJldjpiLnByZXZ9LGIuZSl9KSx0aGlzLnByZXY9dGhpcy5jdXJyLHRoaXMudGlja2luZz0hMX19LHtrZXk6J3VzZScsdmFsdWU6ZnVuY3Rpb24gdXNlKGIpe3ZhciBjPXRoaXMsZD1jLnBvb2wrKztyZXR1cm4gYy5xdWV1ZS5wdXNoKFtkLGJdKSx7ZGVzdHJveTpmdW5jdGlvbiBkZXN0cm95KCl7cmV0dXJuIGMucXVldWUuZm9yRWFjaChmdW5jdGlvbihmLGcpe2ZbMF09PT1kJiZjLnF1ZXVlLnNwbGljZShnLDEpfSksdGhpc30sdXBkYXRlOmZ1bmN0aW9uIHVwZGF0ZSgpe3JldHVybiBiKHtjdXJyOmMuY3VycixwcmV2OmMucHJldn0sYy5lKSx0aGlzfX19fSx7a2V5Oid1cGRhdGUnLHZhbHVlOmZ1bmN0aW9uIHVwZGF0ZSgpe3RoaXMucnVuKCl9fV0pLGF9KCk7ZXhwb3J0cy5kZWZhdWx0PSd1bmRlZmluZWQnPT10eXBlb2Ygd2luZG93P251bGw6e2dldCBzY3JvbGwoKXtyZXR1cm4gc2Nyb2xsSW5zdGFuY2V8fChzY3JvbGxJbnN0YW5jZT1uZXcgTGlzdGVuZXIoJ3Njcm9sbCcpKSxzY3JvbGxJbnN0YW5jZX0sZ2V0IHJlc2l6ZSgpe3JldHVybiByZXNpemVJbnN0YW5jZXx8KHJlc2l6ZUluc3RhbmNlPW5ldyBMaXN0ZW5lcigncmVzaXplJykpLHJlc2l6ZUluc3RhbmNlfSx1c2U6ZnVuY3Rpb24gdXNlKGEpe3ZhciBfc2Nyb2xsPXRoaXMuc2Nyb2xsLGI9X3Njcm9sbC5jdXJyLGM9X3Njcm9sbC5wcmV2LF9yZXNpemU9dGhpcy5yZXNpemUsZD1fcmVzaXplLmN1cnIsZj1fcmVzaXplLnByZXYsZz17Y3Vyclk6YixwcmV2WTpjLGN1cnJYOmQscHJldlg6Zn0saD10aGlzLnNjcm9sbC51c2UoZnVuY3Rpb24oX3JlZixtKXt2YXIgaz1fcmVmLmN1cnIsbD1fcmVmLnByZXY7Zy5jdXJyWT1rLGcucHJldlk9bCxhKGcsbSl9KSxqPXRoaXMucmVzaXplLnVzZShmdW5jdGlvbihfcmVmMixtKXt2YXIgaz1fcmVmMi5jdXJyLGw9X3JlZjIucHJldjtnLmN1cnJYPWssZy5wcmV2WD1sLGEoZyxtKX0pO3JldHVybntkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtyZXR1cm4gaC5kZXN0cm95KCksai5kZXN0cm95KCksdGhpc30sdXBkYXRlOmZ1bmN0aW9uIHVwZGF0ZSgpe3JldHVybiBoLnVwZGF0ZSgpLGoudXBkYXRlKCksdGhpc319fX07Il19
