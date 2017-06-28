function isComplete(node)
{
	var currentIndex = 1;
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			var currentValue = node.getBlocks()[i][j];
			if( currentValue == "" && currentIndex == 9)
			{

			}
			else if( currentIndex - currentValue != 0 )
			{
				return false;
			}
			currentIndex++;
		}
	}

	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			_blocks[i][j] = node.getBlocks()[i][j];
		}
	}

	return true;
}

function createNode(parent, blocks)
{
	var node = new Node();
	node.createBlocksMatrix();
	node.setBlockAt(0, 0, blocks[0][0]);	node.setBlockAt(0, 1, blocks[0][1]);	node.setBlockAt(0, 2, blocks[0][2]);
	node.setBlockAt(1, 0, blocks[1][0]);	node.setBlockAt(1, 1, blocks[1][1]);	node.setBlockAt(1, 2, blocks[1][2]);
	node.setBlockAt(2, 0, blocks[2][0]);	node.setBlockAt(2, 1, blocks[2][1]);	node.setBlockAt(2, 2, blocks[2][2]);
	node.calculateDistance();
	node.setParent(parent);
	openList.push(node);
}

function createChildNodes(parentNode)
{
	var brk = false;
	for(var i = 0; i < 3 && !brk; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			if(parentNode.getBlocks()[i][j] == "")
			{
				brk = true;
				i--;
				break;
			}
		}
	}
	var auxMatrix = new Array(3);
	for(var k = 0; k < 3; k++)
	{
		auxMatrix[k] = new Array(3);
	}
	// var str;
	// str ="PAI \n";
	// for(var ii = 0; ii < 3; ii++)
	// {
	// 	for(var ji = 0; ji < 3; ji++)
	// 	{
	// 		if(parentNode.getBlocks()[ii][ji] == "")
	// 		{
	// 			str +=" |";
	// 		}
	// 		else
	// 		str += parentNode.getBlocks()[ii][ji] + "|";
	// 	}
	// 	str += '\n';
	// }
	if(i > 0)//up
	{
		for(var k = 0; k < 3; k++)
		{
			for(var l = 0; l < 3; l++)
			{
				auxMatrix[k][l] = parentNode.getBlocks()[k][l];
			}
		}
		auxMatrix[i][j] = auxMatrix[i-1][j];
		auxMatrix[i-1][j] = "";
		var node = new Node();
		node.createBlocksMatrix();
		node.setBlockAt(0, 0, auxMatrix[0][0]);	node.setBlockAt(0, 1, auxMatrix[0][1]);	node.setBlockAt(0, 2, auxMatrix[0][2]);
		node.setBlockAt(1, 0, auxMatrix[1][0]);	node.setBlockAt(1, 1, auxMatrix[1][1]);	node.setBlockAt(1, 2, auxMatrix[1][2]);
		node.setBlockAt(2, 0, auxMatrix[2][0]);	node.setBlockAt(2, 1, auxMatrix[2][1]);	node.setBlockAt(2, 2, auxMatrix[2][2]);
		node.calculateDistance();
		node.setParent(parentNode);
		parentNode.appendChildNode(node);

	}
	if(i < 2)//down
	{
		for(var k = 0; k < 3; k++)
		{
			for(var l = 0; l < 3; l++)
			{
				auxMatrix[k][l] = parentNode.getBlocks()[k][l];
			}
		}
		auxMatrix[i][j] = auxMatrix[i+1][j];
		auxMatrix[i+1][j] = "";
		var node = new Node();
		node.createBlocksMatrix();
		node.setBlockAt(0, 0, auxMatrix[0][0]);	node.setBlockAt(0, 1, auxMatrix[0][1]);	node.setBlockAt(0, 2, auxMatrix[0][2]);
		node.setBlockAt(1, 0, auxMatrix[1][0]);	node.setBlockAt(1, 1, auxMatrix[1][1]);	node.setBlockAt(1, 2, auxMatrix[1][2]);
		node.setBlockAt(2, 0, auxMatrix[2][0]);	node.setBlockAt(2, 1, auxMatrix[2][1]);	node.setBlockAt(2, 2, auxMatrix[2][2]);
		node.calculateDistance();
		node.setParent(parentNode);
		parentNode.appendChildNode(node);
	}
	if(j > 0)//left
	{
		for(var k = 0; k < 3; k++)
		{
			for(var l = 0; l < 3; l++)
			{
				auxMatrix[k][l] = parentNode.getBlocks()[k][l];
			}
		}
		auxMatrix[i][j] = auxMatrix[i][j-1];
		auxMatrix[i][j-1] = "";
		var node = new Node();
		node.createBlocksMatrix();
		node.setBlockAt(0, 0, auxMatrix[0][0]);	node.setBlockAt(0, 1, auxMatrix[0][1]);	node.setBlockAt(0, 2, auxMatrix[0][2]);
		node.setBlockAt(1, 0, auxMatrix[1][0]);	node.setBlockAt(1, 1, auxMatrix[1][1]);	node.setBlockAt(1, 2, auxMatrix[1][2]);
		node.setBlockAt(2, 0, auxMatrix[2][0]);	node.setBlockAt(2, 1, auxMatrix[2][1]);	node.setBlockAt(2, 2, auxMatrix[2][2]);
		node.calculateDistance();
		node.setParent(parentNode);
		parentNode.appendChildNode(node);
	}
	if(j < 2)//right
	{
		for(var k = 0; k < 3; k++)
		{
			for(var l = 0; l < 3; l++)
			{
				auxMatrix[k][l] = parentNode.getBlocks()[k][l];
			}
		}
		auxMatrix[i][j] = auxMatrix[i][j+1];
		auxMatrix[i][j+1] = "";
		var node = new Node();
		node.createBlocksMatrix();
		node.setBlockAt(0, 0, auxMatrix[0][0]);	node.setBlockAt(0, 1, auxMatrix[0][1]);	node.setBlockAt(0, 2, auxMatrix[0][2]);
		node.setBlockAt(1, 0, auxMatrix[1][0]);	node.setBlockAt(1, 1, auxMatrix[1][1]);	node.setBlockAt(1, 2, auxMatrix[1][2]);
		node.setBlockAt(2, 0, auxMatrix[2][0]);	node.setBlockAt(2, 1, auxMatrix[2][1]);	node.setBlockAt(2, 2, auxMatrix[2][2]);
		node.calculateDistance();
		node.setParent(parentNode);
		parentNode.appendChildNode(node);
	}
}

function heuristic1(backtracking)
{
	// if no node is in the openList
	if( openList.length <= 0 ) return;

	// get the last elment of the openList
	node = openList.pop();

	if( node == null ) return;

	// verify if the current node (position of the blocks) is complete (right positions).
	if(isComplete(node)) return;

	// doing a movement
	_moviments++;

	// have to verify if it is not backtracked to not create repetitives nodes (movements)
	if (!backtracking)
	{
		// create possible movements (child nodes)
		createChildNodes(node);

		// store the current node (movement), used to avoid loops
		closeList.push(node);
	}

	backtracking = false;

	// we have to verify if the current node has onlu one way (child nodes)
	var hasOneWay = false;

	// verify if we have a repretition of movement (loop of nodes) for each child node of the current node (possible movements)
	for(var j = 0; j < node.getChildNodes().length; j++)
	{
		var repeated = false;
		if( !node.getChildNodes()[j].getVisited() )
		{
			for(var i = 0; i < closeList.length; i++)
			{
				repeated = true;
				for(var x = 0; x < 3 && repeated; x++)
				{
					for(var y = 0; y < 3 && repeated; y++)
					{
						if(node.getChildNodes()[j].getBlocks()[x][y] != closeList[i].getBlocks()[x][y])
						{
							repeated = false;
						}
					}
				}
				if(repeated)break;
			}

			// verified if exist a repretition, if not, advance to the next move (node child).
			if(!repeated)
			{
				hasOneWay = true;

				// advance a movement node (child).
				openList.push(node.getChildNodes()[j]);
				break;
			}
		}
	}

	// if not exist child node (movement) possible.
	if (!hasOneWay)
	{
		// set node visited (to not repeat this movement)
		node.setVisited(true);

		// we have to back to parent (backtracking)
		openList.push(node.getParent());

		backtracking = true;
	}

	heuristic1(backtracking);
}

function heuristic2(backtracking)
{
	// if no node is in the openList
	if( openList.length <= 0 ) return;

	// get the last elment of the openList
	node = openList.pop();

	if( node == null ) return;

	// verify if the current node (position of the blocks) is complete (right positions).
	if(isComplete(node)) return;

	// doing a movement
	_moviments++;

	// have to verify if it is not backtracked to not create repetitives nodes (child nodes)
	if (!backtracking)
	{
		// store the current node (movement), used to avoid loops
		closeList.push(node);

		// create possible movements (child nodes)
		createChildNodes(node);

		// In this for, creating a second layer of possible movemets of the possible movements (child nodes for each child node)
		for(var i = 0; i < node.getChildNodes().length; ++i)
		{
			createChildNodes(node.getChildNodes()[i]);
		}

		// swap the first layer with the second layer
		var aux;
		for( var i = node.getChildNodes().length - 1; i >= 1; i--)
		{
			for(var j=0; j < i ; j++)
			{
				var firstLayerChildNode = node.getChildNodes()[j];
				var secondLayerChildNode = node.getChildNodes()[j].getChildNodes()[0];

				if( firstLayerChildNode.getDistance() + secondLayerChildNode.getDistance() > node.getChildNodes()[j+1].getDistance() + node.getChildNodes()[j+1].getChildNodes()[0].getDistance())
				{
					aux = node.getChildNodes()[j];
					node.getChildNodes()[j] = node.getChildNodes()[j+1];
					node.getChildNodes()[j+1] = aux;
				}
			}
		}

		// remove the current second layer
		for(var i = 0; i < node.getChildNodes().length; ++i)
		{
			node.getChildNodes()[i].setChildNodes(null);
		}
	}

	backtracking = false;

	// we have to verify if the current node has onlu one way (child nodes)
	var hasOneWay = false;

	// verify if we have a repretition of movement (loop of nodes) for each child node of the current node (possible movements)
	for(var j = 0; j < node.getChildNodes().length; j++)
	{
		var repeated = false;
		if( !node.getChildNodes()[j].getVisited() )
		{
			for(var i = 0; i < closeList.length; i++)
			{
				repeated = true;
				for(var x = 0; x < 3 && repeated; x++)
				{
					for(var y = 0; y < 3 && repeated; y++)
					{
						if(node.getChildNodes()[j].getBlocks()[x][y] != closeList[i].getBlocks()[x][y])
						{
							repeated = false;
						}
					}
				}
				if(repeated)break;
			}

			// verified if exist a repretition, if not, advance to the next move (node child).
			if(!repeated)
			{
				hasOneWay = true;

				// advance a movement node (child).
				openList.push(node.getChildNodes()[j]);
				break;
			}
		}
	}

	// if not exist child node (movement) possible.
	if (!hasOneWay)
	{
		// set node visited (to not repeat this movement)
		node.setVisited(true);

		// we have to back to parent (backtracking)
		openList.push(node.getParent());

		backtracking = true;
	}

	heuristic2(backtracking);
}

function heuristic1Process()
{
	_animationInterval = 1;
	_moviments = 0;
	openList = null;
	openList =[];
	closeList = null;
	closeList = [];
	createNode(parent, _blocks);

	heuristic1(false);
}

function heuristic2Process()
{
	_moviments = 0;
	openList = null;
	openList =[];
	closeList = null;
	closeList = [];
	createNode(parent, _blocks);

	heuristic2(false);
}
