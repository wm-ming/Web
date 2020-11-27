import radColor from "../util/radColor"
import {getRandom} from "../util/radColor"

import $ from "jquery";

var divContainer = $("#divContainer");
var divCenter = $("#divCenter");
export default function (n, isPrime) {
    var span = $("<span>").text(n);
    if (isPrime) {
        var color = radColor();
        span.css("color", color);
        createCenterPrimeNumber(n, color);
    }
    divContainer.append(span);
    divCenter.text(n);
}
createCenterPrimeNumber(n, color) {
    var div = $("<div>").addClass("center").css("color", color).text(n);
    $("body").append(div);
    getComputedStyle(div[0].left);
    div.css("transform", `translate(${getRandom(-200, 200)}px, ${getRandom(-200, 200)}px)`).css("opacity", 0);
}

// var divContainer = document.getElementById('divContainer');
// var divCenter = document.getElementById('divCenter');

// export default function(n, isPrime){
// 	var span = document.createElement("span");
// 	if(isPrime){
// 		var color = radColor();
// 		span.style.color = color;
// 		createCenterPrimeNumber(n, color);
// 	}
// 	span.innerText = n;
// 	divContainer.appendChild(span);

// 	createCenterNumber(n);
// }

// function createCenterNumber(n){
// 	divCenter.innerText = n;
// }

// function createCenterPrimeNumber(n, color){
// 	var div = document.createElement("div");
// 	div.className = "center";
// 	div.style.color = color;
// 	div.innerText = n;
// 	document.body.appendChild(div);
// 	// 加入div后，强行让页面重新渲染
// 	getComputedStyle(div).left;
// 	// 只要读取某个元素的位置或尺寸信息，就会导致浏览器重新渲染reflow

// 	div.style.transform = `translate(${getRandom(-150, 150)}px, ${getRandom(-150, 150)}px)`;
// 	div.style.opacity = 0;
// }