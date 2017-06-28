function Node()
{
	var distance;
	var blocks;
	var childNodes = [];
	var parent;
	var visited = false;

	this.calculateDistance = function()
	{
		var sum = 0, i, j, ii, jj, line, column, elem;

			for(i = 0; i < 3; i++)
			{
				for(j = 0; j < 3; j++)
				{
					var brk = false;
					elem = i*3 + j + 1;
					for(ii = 0; ii < 3 && !brk; ii++)
					{
						for(jj = 0; jj < 3 && !brk; jj++)
						{
							if (this.blocks[ii][jj] == elem || (elem == 9 && this.blocks[ii][jj] == "")) {
								line = ii;
								column = jj;
								brk = true;
							}
						}
					}
					sum += Math.pow(i-line, 2.0) + Math.pow(j-column, 2.0);
				}
			}
		this.distance = sum;
	}

	this.setDistance = function(d)
	{
		this.distance = d;
	}

	this.getDistance = function()
	{
		return this.distance;
	}

	this.createBlocksMatrix = function()
	{
		this.blocks = new Array(3);
		for(var i = 0; i < 3; i++)
		{
			this.blocks[i] = new Array(3);
		}
	}

	this.getBlocks = function()
	{
		return this.blocks;
	}

	this.setBlockAt = function(i, j, v)
	{
		this.blocks[i][j] = v;
		//console.log("this.blocks["+i+"]["+j+"] = " + this.blocks[i][j]);
	}

	function bubbleSort()
	{
		var aux;
		for(var i=childNodes.length - 1; i >= 1; i--)
		{
			for(var j=0; j < i ; j++)
			{
				if(childNodes[j].getDistance() > childNodes[j+1].getDistance())
				{
					aux = childNodes[j];
					childNodes[j] = childNodes[j+1];
					childNodes[j+1] = aux;
				}
			}
		}
	}

	this.appendChildNode = function(node)
	{
		childNodes.push(node);
		bubbleSort();
	}

	this.getChildNodes = function()
	{
		return childNodes;
	}

	this.setChildNodes = function(cn)
	{
		this.childNodes = cn;
	}

	this.setParent = function(p)
	{
		this.parent = p;
	}

	this.getParent = function()
	{
		return this.parent;
	}

	this.setVisited = function(v)
	{
		this.visited = v;
	}

	this.getVisited = function()
	{
		return this.visited;
	}

	this.getValue = function()
	{
		var currentIndex = 1;
		var value = 0;

		for(var i = 0; i < 3; i++)
		{
			for(var j = 0; j < 3; j++)
			{
				var currentValue = this.blocks[i][j];
				if( currentValue != "" )
				{
					// console.log("position: " + currentIndex + " -> value: " + currentValue);
					value = value + (currentIndex - currentValue);
				}
				currentIndex++;
			}
		}
		return value;
	}

	this.toString = function()
	{
		var text = "";
		for(var i = 0; i < 3; i++)
		{
			for(var j = 0; j < 3; j++)
			{
				var currentValue = this.blocks[i][j];
				text += currentValue + ", ";
			}
		}
		return text;
	}
}
