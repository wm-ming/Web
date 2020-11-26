function getStyle (dom, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(dom, null)[prop];
	} else {
		return dom.currentStyle[prop];
	}
}

var timer = null;
function startMove(dom, propObj, callback){
	clearInterval(dom.timer);
	var speed = null,
		cur = null;
	dom.timer = setInterval(function(){
		var stop = true;
		for(var prop in propObj){
			cur = parseInt(getStyle(dom, prop));
			speed = (propObj[prop] - cur) / 7;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			dom.style[prop] = cur + speed + 'px';
			if(cur != propObj[prop]){
				stop = false;
			}
		}

		if(stop){
			clearInterval(dom.timer);
			typeof callback == 'function' && callback();
		}  			
	}, 30);
}