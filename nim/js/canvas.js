var _regions = [];
var _blocks = [];
var _animationInterval;
var _aniX, _aniY, _startAniX, _startAniY, _aniAcc = 0, _aniL, _aniC, _stopAniX, _stopAniY;
var _vertical = true;
var _holeL, _holeC;
var _selL, _selC;
var blockArray = [];
var iniX, iniY;
var _moviments = 0;
var resultMatrix;
var openList =[];
var closeList = [];
var lock = false;

function updateSize()
{
	var c = document.getElementById('mainCanvas');
	c.width = window.screen.width * 0.4;
	c.height = window.screen.height * 0.4;
	$("#mainCanvas").css("display", "block");
	// $("#mainCanvas").css("background-color", "transparent");
	$("#mainCanvas").css("background-color", "white");
}

function createRegions()
{
	var c = document.getElementById('mainCanvas');
	var r1 = new Region();
	var r2 = new Region();
	var r3 = new Region();
	var r4 = new Region();
	var r5 = new Region();
	var r6 = new Region();
	var r7 = new Region();
	var r8 = new Region();
	var r9 = new Region();
	var w = c.width*0.15;
	var h = w;
	var padding = 2;
	//R1					//R2					//R3
	r1.setX(0); 			r2.setX(w+padding); 	r3.setX(2*(w+padding));
	r1.setY(0);				r2.setY(0);				r3.setY(0);
	r1.setWidth(w);			r2.setWidth(w);			r3.setWidth(w);
	r1.setHeight(h);		r2.setHeight(h);		r3.setHeight(h);

	//R4					//R5					//R6
	r4.setX(0); 			r5.setX(w+padding);		r6.setX(2*(w+padding));
	r4.setY(h+padding);		r5.setY(h+padding);		r6.setY(h+padding);
	r4.setWidth(w);			r5.setWidth(w);			r6.setWidth(w);
	r4.setHeight(h);		r5.setHeight(h);		r6.setHeight(h);

	//R7					//R8					//R9
	r7.setX(0); 			r8.setX(w+padding); 	r9.setX(2*(w+padding));
	r7.setY(2*(w+padding));	r8.setY(2*(w+padding));	r9.setY(2*(w+padding));
	r7.setWidth(w);			r8.setWidth(w);			r9.setWidth(w);
	r7.setHeight(h);		r8.setHeight(h);		r9.setHeight(h);

	_regions = new Array(3);
	for(var i = 0; i < 3; i++)
	{
		_regions[i] = new Array(3);
	}
	_regions[0][0] = r1;	_regions[0][1] = r2;	_regions[0][2] = r3;
	_regions[1][0] = r4;	_regions[1][1] = r5;	_regions[1][2] = r6;
	_regions[2][0] = r7;	_regions[2][1] = r8;	_regions[2][2] = r9;
}

function createBlocks()
{
	_blocks = new Array(3);
	for(var i = 0; i < 3; i++)
	{
		_blocks[i] = new Array(3);
	}
	var cont = 0;
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			cont++;
			_blocks[i][j] = cont;
		}
	}
	_blocks[2][2] = "";
}

function drawBlock(i, j)
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	var color = "#f5f5f5";
	if(i == _aniL && j == _aniC)return;
	// switch(_blocks[i][j])
	// {
	// 	case 1:
	// 		color = "green";
	// 	break;
	// 	case 2:
	// 		color = "red";
	// 	break;
	// 	case 3:
	// 		color = "#FFFF99";
	// 	break;
	// 	case 4:
	// 		color = "blue";
	// 	break;
	// 	case 5:
	// 		color = "purple";
	// 	break;
	// 	case 6:
	// 		color = "pink";
	// 	break;
	// 	case 7:
	// 		color = "orange";
	// 	break;
	// 	case 8:
	// 		color = "cyan";
	// 	break;
	// 	default:
	// 		color = "white";
	// 		break;
	// }
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(_regions[i][j].getX() + iniX,_regions[i][j].getY()+iniY,_regions[i][j].getWidth(),_regions[i][j].getHeight());
	ctx.fill();
	ctx.closePath();
	//
	ctx.beginPath();
	var fontsize = c.width*0.07;
	ctx.font = fontsize+"px Arial";
	var textSize = ctx.measureText (_blocks[i][j]);
	var width = textSize.width;
	ctx.fillStyle = "black";
	ctx.fillText(_blocks[i][j], _regions[i][j].getX()+iniX + _regions[i][j].getWidth()/2 - width/2 + 2, _regions[i][j].getY()+iniY + 74);
	ctx.closePath();
	//
	// here
	// ctx.beginPath();
	// ctx.font = fontsize+"px Arial";
	// var textSize = ctx.measureText (_blocks[i][j]);
	// var width = textSize.width;
	// ctx.fillText(_blocks[i][j], _regions[i][j].getX()+iniX + _regions[i][j].getWidth()/2 - width/2, _regions[i][j].getY()+iniY + 72);
	// ctx.closePath();
}

function drawRegions()
{
	clearScreen();
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	// ctx.strokeStyle ="red"; here

	iniX = c.width/2 - _regions[0][0].getWidth(0)/2 - _regions[0][0].getWidth();
	iniY = 50;
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{

			drawBlock(i, j, iniX, iniY);
			ctx.rect(_regions[i][j].getX() + iniX,_regions[i][j].getY()+iniY,_regions[i][j].getWidth(),_regions[i][j].getHeight());
			// ctx.strokeStyle ="#e3e3e3";
			// ctx.strokeStyle ="black"; here
			// ctx.stroke(); here
		}
	}
}

function swapBlocks(origL, origC, destL, destC)//dest como sendo o espaco em branco
{
	if(_blocks[destL][destC] == "")
	{
		_blocks[destL][destC] = _blocks[origL][origC];
		_blocks[origL][origC] = "";
		_moviments++;
		refreshMovimentsLabel();
	}
	drawRegions();
	if(checkBlocks() && !lock)
	{
		alert("Parabéns !");
		console.log("Parabéns")
	}
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function createNewBlockArray()
{
	blockArray = [1, 2, 3, 4, 5, 6, 7, 8, ''];
}

function sortBlocks(times)
{
	setTimeout(function()
	{
		lock = true;
		shuffleBlocks();
		drawRegions();
		if(--times)sortBlocks(times);
		else
		{
			_moviments = 0;
			refreshMovimentsLabel();
			lock = false;
		}
	}, 50)
}

function drawTransitionBlock()
{
	var i = _aniL;
	var j = _aniC;
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	var color = "#f5f5f5";
	// switch(_blocks[i][j])
	// {
	// 	case 1:
	// 		color = "green";
	// 	break;
	// 	case 2:
	// 		color = "red";
	// 	break;
	// 	case 3:
	// 		color = "#FFFF99";
	// 	break;
	// 	case 4:
	// 		color = "blue";
	// 	break;
	// 	case 5:
	// 		color = "purple";
	// 	break;
	// 	case 6:
	// 		color = "pink";
	// 	break;
	// 	case 7:
	// 		color = "orange";
	// 	break;
	// 	case 8:
	// 		color = "cyan";
	// 	break;
	// 	default:
	// 		color = "white";
	// 		break;
	// }
	var posx = _startAniX, posy = _startAniY;
	if(_vertical)
	{
		posy = _aniY*_aniAcc + _startAniY;
		if((posy > _stopAniY && _aniY > 0 )|| (posy < _stopAniY && _aniY < 0))
		{
			_aniAcc = 0;
			var origL = _aniL, destL = _holeL;
			var origC = _aniC, destC = _holeC;
			_aniL = _aniC = _holeL = _holeC = -1;
			clearInterval(_animationInterval);
			swapBlocks(origL, origC, destL, destC);
			return;
		}
	}
	else
	{
		posx = _aniX*_aniAcc +_startAniX;
		if((posx > _stopAniX && _aniX > 0 )|| (posx < _stopAniX && _aniX < 0))
		{
			_aniAcc = 0;
			var origL = _aniL, destL = _holeL;
			var origC = _aniC, destC = _holeC;
			_aniL = _aniC = _holeL = _holeC = -1;
			clearInterval(_animationInterval);
			swapBlocks(origL, origC, destL, destC);
			return;
		}
	}
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(posx + iniX,posy+iniY,_regions[i][j].getWidth(),_regions[i][j].getHeight());
	ctx.fill();
	ctx.closePath();
	//
	ctx.beginPath();
	var fontsize = 48;
	ctx.font = fontsize+"px Arial";
	var textSize = ctx.measureText (_blocks[i][j]);
	var width = textSize.width;
	ctx.fillStyle = "black";
	// ctx.fillStyle = "white";
	ctx.fillText(_blocks[i][j], posx+iniX + _regions[i][j].getWidth()/2 - width/2 + 2, posy+iniY + 72);
	ctx.closePath();
	//

	// here
	// ctx.beginPath();
	// var fontsize = 48;
	// ctx.font = fontsize+"px Arial";
	// var textSize = ctx.measureText (_blocks[i][j]);
	// var width = textSize.width;
	// ctx.fillStyle = "black";
	// // ctx.fillStyle = "white"; here
	// ctx.fillText(_blocks[i][j], posx+iniX + _regions[i][j].getWidth()/2 - width/2, posy+iniY + 70);
	// ctx.closePath();
}

function animate()
{
	_aniAcc+=5;
	clearScreen();
	drawRegions();
	drawTransitionBlock();
}

function startAnimation(origL, origC, destL, destC)//dest como sendo o espaço em branco
{
	if(origL == destL && origC != destC)//um do lado do outro
	{
		_vertical = false;
		if(origC < destC)//mover da esquerda para direita
		{
			_aniX = 1;
		}
		else
		{
			_aniX = -1;
		}
	}
	else if(origC == destC)//um emcima do outro
	{
		_vertical = true;
		if(origL < destL)//mover da esquerda para direita
		{
			_aniY = 1;
		}
		else
		{
			_aniY = -1;
		}
	}
	_aniL = origL;
	_aniC = origC;
	_holeL = destL;
	_holeC = destC;
	_startAniX = _regions[origL][origC].getX();
	_startAniY = _regions[origL][origC].getY();
	_stopAniX = _regions[destL][destC].getX();
	_stopAniY = _regions[destL][destC].getY();
	_animationInterval = setInterval(animate, 5);
}

function handleCanvasClick()
{
	var x;
  var y;
  var c = document.getElementById("mainCanvas");

	$("#mainCanvas").click(function(e)
	{
		x = e.pageX - c.offsetLeft;
		y = e.pageY - c.offsetTop;

		searchBlockUnderCursor(x, y);
		checkNeighborhood(true);
	});
}

function refreshMovimentsLabel()
{
	document.getElementById('moviments').innerHTML = "Movimentos: " +_moviments;
}

function checkNeighborhood(animation)
{
	if(_selL>0 && _blocks[_selL-1][_selC] == "")
	{
		if(animation)
			startAnimation(_selL, _selC, _selL-1, _selC);
		else
			swapBlocks(_selL, _selC, _selL-1, _selC);
		return true;
	}
	else if(_selL < 2 && _blocks[_selL+1][_selC] == "")
	{
		if(animation)
			startAnimation(_selL, _selC, _selL+1, _selC);
		else
			swapBlocks(_selL, _selC, _selL+1, _selC);
		return true;
	}
	else if(_selC>0 && _blocks[_selL][_selC-1] == "")
	{
		if(animation)
			startAnimation(_selL, _selC, _selL, _selC-1);
		else
			swapBlocks(_selL, _selC, _selL, _selC-1);
		return true;
	}
	else if(_selC<2 && _blocks[_selL][_selC+1] == "")
	{
		if(animation)
			startAnimation(_selL, _selC, _selL, _selC+1);
		else
			swapBlocks(_selL, _selC, _selL, _selC+1);
		return true;
	}
	return false;
}


function searchBlockUnderCursor(posx, posy)
{
	_selL = _selC = -1;
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			if(posx - iniX >= _regions[i][j].getX() && posx - iniX <= _regions[i][j].getX() + _regions[i][j].getWidth())
			{
				if(posy - iniY >= _regions[i][j].getY() && posy - iniY <= _regions[i][j].getY() + _regions[i][j].getHeight())
				{
					_selL = i;
					_selC = j;
					// console.log("L = " + i + " C = " + j);
					break;
				}
			}
		}
	}
}

function createBlockArrayFromBlockMatrix()
{
	var i, j, k = 0;
	blockArray = [];
	for(i = 0; i < 3; i++)
	{
		for(j = 0; j < 3; j++)
		{
			blockArray.push(_blocks[i][j]);
		}
	}
}

function shuffleBlocks()
{
	var hl, hc;
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			if(_blocks[i][j] == "")
			{
				hl = i; hc = j;
			}
		}
	}
	i = hl; j = hc;
	var rand;
	while(true)
	{
		rand = Math.floor((Math.random() * 10))%4;
		if(rand == 0)//acima
		{
			if(i - 1 >= 0)
			{
				swapBlocks(i - 1, j, i, j);
				break;
			}
			else
				rand = Math.floor((Math.random() * 10))%4;
		}
		if(rand == 1)//abaixo
		{
			if(i + 1 <= 2)
			{
				swapBlocks(i + 1, j, i, j);
				break;
			}
			else
				rand = Math.floor((Math.random() * 10))%4;
		}
		if(rand == 2)//esquerda
		{
			if(j - 1 >= 0)
			{
				swapBlocks(i, j - 1, i, j);
				break;
			}
			else
				rand = Math.floor((Math.random() * 10))%4;
		}
		if(rand == 3)//esquerda
		{
			if(j + 1 <= 2)
			{
				swapBlocks(i, j + 1, i, j);
				break;
			}
			else
				rand = Math.floor((Math.random() * 10))%4;
		}
	}
}

function randomSolution(times)
{
	setTimeout(function()
	{
		shuffleBlocks();
		if(--times && !checkBlocks())randomSolution(times);
	}, 1)
}

function personalSolution()
{
	setTimeout(function()
	{

		if(!checkBlocks())personalSolution();
	}, 100)
}

function createResultMatrix()
{
	var resultMatrix = new Array(3);
	for(var i = 0; i < 3; i++)
	{
		resultMatrix[i] = new Array(3);
	}
	resultMatrix[0][0] = 1;	resultMatrix[0][1] = 2;	resultMatrix[0][2] = 3;
	resultMatrix[1][0] = 4;	resultMatrix[1][1] = 5;	resultMatrix[1][2] = 6;
	resultMatrix[2][0] = 7;	resultMatrix[2][1] = 8;	resultMatrix[2][2] = "";
}

function checkBlocks()
{
	createBlockArrayFromBlockMatrix();
	for(var k = 0; k < 8; k++)
	{
		//console.log("blockArray["+k+"] = "+ blockArray[k]+ " != " + (k+1));
		if(blockArray[k] != k+1)
			return false;
	}
	return true;
}

function clearScreen()
{
	var c=document.getElementById("mainCanvas");
	var ctx=c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
}

function setVars()
{
	_canvas = document.getElementById("mainCanvas");
}

function handleButtons()
{
	$("#sort-button").click(function()
	{
		sortBlocks($('#sort-amount').val());
		_moviments = 0;
		refreshMovimentsLabel();
	});
	$("#heuristic-custom-button").click(function()
	{
		randomSolution(100000);
	});
	$("#heuristic-1-button").click(function()
	{
		heuristic1Process();
		drawRegions();
		refreshMovimentsLabel();
	});
	$("#heuristic-2-button").click(function()
	{
		heuristic2Process();
		drawRegions();
		refreshMovimentsLabel();
	});
}

window.onload = function()
{
	setVars();
	updateSize();
	createRegions();
	createBlocks();
	drawRegions();
	handleCanvasClick();
	createNewBlockArray();
	handleButtons();
}

window.onresize = function()
{
	updateSize();
	drawRegions();
}
