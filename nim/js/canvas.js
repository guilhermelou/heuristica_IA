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
		if(--times)sortBlocks(times);
		else
		{
			_moviments = 0;
			refreshMovimentsLabel();
			lock = false;
		}
	}, 50)
}


function refreshMovimentsLabel()
{
	document.getElementById('moviments').innerHTML = "Movimentos: " +_moviments;
    TapesSimulator(chart, _blocks);
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

function swapBlocks(origL, origC, destL, destC)//dest como sendo o espaco em branco
{
	if(_blocks[destL][destC] == "")
	{
		_blocks[destL][destC] = _blocks[origL][origC];
		_blocks[origL][origC] = "";
		_moviments++;
		refreshMovimentsLabel();
	}
	if(checkBlocks() && !lock)
	{
		alert("Parabéns !");
		console.log("Parabéns")
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



function handleButtons()
{
	$("#sort-button").click(function()
	{
		sortBlocks($('#sort-amount').val());
		_moviments = 0;
		refreshMovimentsLabel();
	});
	$("#random-button").click(function()
	{
        // É PRA EU FAZER
		randomSolution($('#sort-amount').val());
	});
	$("#heuristic-1-button").click(function()
	{
		heuristic1Process();
		//drawRegions();
        TapesSimulator(chart, _blocks);
		refreshMovimentsLabel();
	});
	$("#heuristic-2-button").click(function()
	{
		heuristic2Process();
        TapesSimulator(chart, _blocks);
		//drawRegions();
		refreshMovimentsLabel();
	});
	$("#heuristic-custom-button").click(function()
	{
		heuristicCustomProcess();
        TapesSimulator(chart, _blocks);
		//drawRegions();
		refreshMovimentsLabel();
	});
}

window.onload = function()
{
	createBlocks();
	createNewBlockArray();
	handleButtons();
}

window.onresize = function()
{
}
