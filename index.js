// 先完成游戏配置
//   宽高、行列数、是否结束、内容
// 获取每一小块宽高以及块数
// 创建一个数组存放小块
// 构造小块
//   除了基本配置还需要判断当前块是否可见以及位置是否正确
// 初始化游戏
//   初始化游戏环境
//   初始化拼图数组
//   打乱拼图顺序
//   点击事件
// 	   先找到不可见的块的位置
//     如果点击块与隐藏块相邻，则交换位置
//     之后判断游戏是否结束
//       遍历小块，把位置不正确的小块放入数组，若数组长度为0，游戏结束
// 		 需要显示完整图片（去边线，显示所有块）
var gameConfig = {
	width: 800,
	height: 800,
	rows: 3,
	cols: 3,
	isOver: false,
	url: "3.jpg",
	dom: document.getElementById('game'),	
};
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
gameConfig.pieceNum = gameConfig.rows * gameConfig.cols;

var blocks = [];

function init () {
	initGameDom();
	initBlockArray();
	shuttle();
	regEvent();
	function initGameDom () {
		gameConfig.dom.style.width = gameConfig.width + 'px';
		gameConfig.dom.style.height = gameConfig.height + 'px';
		gameConfig.dom.style.border = "2px solid #ccc";
		gameConfig.dom.style.position = "relative";
	}
	function initBlockArray () {
		for (var i=0; i<gameConfig.rows; i++) { 
			for (var j=0; j<gameConfig.cols; j++) {
				var isVisible = true;
				if (i == gameConfig.rows - 1 && j == gameConfig.cols - 1) {
					isVisible = false;
				}
				var b = new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible);
				blocks.push(b);
			}
		}
	}
	function shuttle () {
		for (var i=0; i<blocks.length-1; i++) {
			var index = getRandom(0, blocks.length-2);
			exchange(blocks[i], blocks[index]);
		}
	}
	function getRandom (min, max) {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	}
	function exchange (a, b) {
		var temp = a.top;
		a.top = b.top;
		b.top = temp;

		var temp = a.left;
		a.left = b.left;
		b.left = temp;

		a.show();
		b.show();
	}
	function regEvent () {
		var unVisibleBlock = blocks.find (function (b) {
			return !b.isVisible;
		});
		blocks.forEach (function (b) {
			b.dom.onclick = function () {
				if (gameConfig.isOver) {
					return ;
				}
				if (b.top == unVisibleBlock.top && (isEqual(Math.abs(b.left-unVisibleBlock.left), gameConfig.pieceWidth)) ||
					b.left == unVisibleBlock.left && (isEqual(Math.abs(b.top-unVisibleBlock.top),gameConfig.pieceHeight))) {
					exchange(b, unVisibleBlock);
					isWin();
				}
			}
		})
	}
	function isWin () {
		var wrongs = blocks.filter (function (b) {
			return !b.isCorrect();
		});
		if (wrongs.length == 0) {
			gameConfig.isOver = true;
			blocks.forEach (function (d) {
				d.dom.style.border = "none";
				d.dom.style.display = 'block';
			})
		}
	}
}
function Block (left, top, isVisible) {
	this.left = left;
	this.top = top;
	this.correctLeft = this.left;
	this.correctTop = this.top;
	this.isVisible = isVisible;
	this.dom = document.createElement('div');
	this.dom.style.width = gameConfig.pieceWidth + 'px';
	this.dom.style.height = gameConfig.pieceHeight + 'px';
	this.dom.style.background = `url("${gameConfig.url}") -${this.correctLeft}px -${this.correctTop}px`;
	this.dom.style.border = "1px solid #fff";
	this.dom.style.boxSizing = "border-box";
	this.dom.style.position = "absolute";
	this.dom.style.cursor = "pointer";

	if(!isVisible) {
		this.dom.style.display = "none";
	}
	gameConfig.dom.appendChild(this.dom);

	this.show = function () {
		this.dom.style.left = this.left + 'px';
		this.dom.style.top = this.top + 'px';
	}
	this.isCorrect = function () {
		return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
	}
	this.show();
}
function isEqual(a, b){
	return parseInt(a) == parseInt(b);
}
init();