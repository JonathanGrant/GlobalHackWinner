var Camera = React.createClass({
  getInitialState: function() {
    return {
      pos: '0 0 0'
    }
  },
  render: function() {
    return (
        <a-camera position={this.state.pos}>
            <a-cursor color="#FF0000"></a-cursor>
        </a-camera>
        )
  }
})

var Cube = React.createClass({
  render: function() {
    return (
        <a-box position={this.props.pos}>
        </a-box>
        )
  }
})

var PlayerSphere = React.createClass({
  render: function() {
    return (
        <a-sphere position={this.props.pos} radius={this.props.radius} color={this.props.theColor}>
        </a-sphere>
        )
  }
})

var GoalSphere = React.createClass({
  render: function() {
    return (
        <a-sphere position={this.props.pos} radius={this.props.radius} color="green">
        </a-sphere>
        )
  }
})

var GhostSphere = React.createClass({
  render: function() {
    return (
        <a-sphere material="opacity:0.1" position={this.props.pos} radius={this.props.radius} color={this.props.theColor}>
        </a-sphere>
        )
  }
})

var Sky = React.createClass({
  getInitialState: function() {
    return {
      pos: '1 1 -4'
    }
  },
  render: function() {
    return (
        <a-sky src="./sky.jpg">
        </a-sky>
        )
  }
})

var AFrameScene = React.createClass({
  getInitialState() {
    return {
      grid: [
      [1,1,1,1,1,1,1,1,1],
      [1,3,1,0,0,0,1,1,1],
      [1,0,0,0,1,0,0,1,1],
      [1,0,1,0,1,0,0,1,1],
      [1,0,0,0,0,0,1,1,1],
      [1,0,1,0,1,1,1,0,1],
      [1,1,0,0,0,0,0,0,1],
      [1,1,1,0,1,1,0,2,1],
      [1,1,1,1,1,1,1,1,1]
      ]
    }
  },
  aStarCreateGrid: function() {
    var searchGrid = []
    for (var y = 0; y < this.state.grid.length; y++) {
        var row = []
        for (var x = 0; x < this.state.grid[y].length; x++) {
            var newNode = {f: 0, g: 0, h: 0, debug: "", parent: null, x: x, y: y, isWall: this.state.grid[y][x]}
            row.push(newNode)
        }
        searchGrid.push(row)
    }
    return searchGrid
  },
  aStarHeuristic: function(node, goal) {
    return (Math.abs(goal.x - node.x) + Math.abs(goal.y - node.y))
  },
  aStarSearch: function(searchGrid, start, goal) {
    var openList = []
    var closedList = []
    openList.push(start)
    while(openList.length > 0) {
        var lowInd = 0
        for(var i=0; i< openList.length; i++) {
            if(openList[i].f < openList[lowInd].f) { lowInd = i; }
        }
        var currNode = openList[lowInd]
        if(currNode.x == goal.x && currNode.y == goal.y) {
            var cur = currNode
            var path = []
            while(cur.parent) {
                path.push(cur.parent)
                cur = cur.parent
            }
            var reversePath = path.reverse()
            goal.parent = reversePath[path.length-1]
            reversePath.push(goal)
            return reversePath
        }
        for(var i = 0; i < openList.length; i++) {
            if(openList[i].x == currNode.x && openList[i].y == currNode.y) {
                openList.splice(i, 1);
                break;
            }
        }
        closedList.push(currNode)
        var neighbors = this.aStarNeighbors(searchGrid, currNode)
        for(var i=0; i< neighbors.length;i++) {
            var neighbor = neighbors[i];
            var neighborIsInClosedList = false;
            for(var j = 0; j < closedList.length; j++) {
                if(closedList[j].x == neighbor.x && closedList[j].y == neighbor.y) {
                    neighborIsInClosedList = true;
                    break
                }
            }
            if(neighborIsInClosedList || neighbor.isWall == 1) {
                // not a valid node to process, skip to next neighbor
                continue;
            }
            var gScore = currNode.g + 1;
            var gScoreIsBest = false;
            var neighborInOpenList = false
            for(var j = 0; j < openList.length; j++) {
                if(openList[j].x == neighbor.x && openList[j].y == neighbor.y) {
                    neighborInOpenList = true
                    break
                }
            }
            if(!neighborInOpenList) {
                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                gScoreIsBest = true;
                neighbor.h = this.aStarHeuristic(neighbor, goal);
                openList.push(neighbor);
            } else if(gScore < neighbor.g) {
                // We have already seen the node, but last time it had a worse g (distance from start)
                gScoreIsBest = true;
            }
            if(gScoreIsBest) {
                // Found an optimal (so far) path to this node.  Store info on how we got here and
                //  just how good it really is...
                neighbor.parent = currNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
            }
        }
    }
    return []
  },
  aStarNeighbors: function(searchGrid, node) {
    var x = node.x
    var y = node.y
    var neighbors = []
    if(searchGrid[y-1] && searchGrid[y-1][x]) {
        neighbors.push(searchGrid[y-1][x]);
    }
    if(searchGrid[y+1] && searchGrid[y+1][x]) {
        neighbors.push(searchGrid[y+1][x]);
    }
    if(searchGrid[y][x-1] && searchGrid[y][x-1]) {
        neighbors.push(searchGrid[y][x-1]);
    }
    if(searchGrid[y][x+1] && searchGrid[y][x+1]) {
        neighbors.push(searchGrid[y][x+1]);
    }
    return neighbors;
  },
  aStarStep: function(searchGrid, start, goal) {
    console.log("step", this.state)
    if(!this.state.openList) {
        setTimeout(this.aStarStep, 1000, searchGrid, searchGrid[7][7], searchGrid[1][1])
        return
    }
    var newOpenList = this.state.openList
    var newClosedList = this.state.closedList
    var lowInd = 0
    for(var i=0; i < newOpenList.length; i++) {
        if(newOpenList[i].f < newOpenList[lowInd].f) { lowInd = i; }
    }
    var currNode = newOpenList[lowInd]
    if(currNode.x == goal.x && currNode.y == goal.y) {
        var cur = currNode
        var path = []
        while(cur.parent) {
            path.push(cur.parent)
            cur = cur.parent
        }
        var reversePath = path.reverse()
        goal.parent = reversePath[path.length-1]
        reversePath.push(goal)
        this.setState({
            path: reversePath
        })
        return
    }
    for(var i = 0; i < newOpenList.length; i++) {
        if(newOpenList[i].x == currNode.x && newOpenList[i].y == currNode.y) {
            newOpenList.splice(i, 1);
            break;
        }
    }
    newClosedList.push(currNode)
    var neighbors = this.aStarNeighbors(searchGrid, currNode)
    for(var i=0; i< neighbors.length;i++) {
        var neighbor = neighbors[i];
        var neighborIsInClosedList = false;
        for(var j = 0; j < newClosedList.length; j++) {
            if(newClosedList[j].x == neighbor.x && newClosedList[j].y == neighbor.y) {
                neighborIsInClosedList = true;
                break
            }
        }
        if(neighborIsInClosedList || neighbor.isWall == 1) {
            // not a valid node to process, skip to next neighbor
            continue;
        }
        var gScore = currNode.g + 1;
        var gScoreIsBest = false;
        var neighborInOpenList = false
        for(var j = 0; j < newOpenList.length; j++) {
            if(newOpenList[j].x == neighbor.x && newOpenList[j].y == neighbor.y) {
                neighborInOpenList = true
                break
            }
        }
        if(!neighborInOpenList) {
            // This the the first time we have arrived at this node, it must be the best
            // Also, we need to take the h (heuristic) score since we haven't done so yet
            gScoreIsBest = true;
            neighbor.h = this.aStarHeuristic(neighbor, goal);
            newOpenList.push(neighbor);
        } else if(gScore < neighbor.g) {
            // We have already seen the node, but last time it had a worse g (distance from start)
            gScoreIsBest = true;
        }
        if(gScoreIsBest) {
            // Found an optimal (so far) path to this node.  Store info on how we got here and
            //  just how good it really is...
            neighbor.parent = currNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
        }
    }
    this.setState({
        openList: newOpenList,
        closedList: newClosedList,
    })
    setTimeout(this.aStarStep, 1000, searchGrid, searchGrid[7][7], searchGrid[1][1])
  },
  componentDidMount: function() {
      var sg = this.aStarCreateGrid()
      this.setState({
        openList: [sg[7][7]],
        closedList: []
      })
      setTimeout(this.aStarStep, 1000, sg, sg[7][7], sg[1][1])
  },
  drawGrid: function(path) {
    var grid = []
    for (var y = 0; y < this.state.grid.length; y++) {
        var row = []
        for (var x = 0; x < this.state.grid[y].length; x++) {
            var pos = (x-2) + " " + (y-2) + " -10"
            if(this.state.grid[y][x] == 1) {
                row.push(<Cube pos={pos} />)
            } else if(this.state.grid[y][x]==2) {
                row.push(<PlayerSphere pos={pos} radius="0.25" theColor="black"/>)
            } else if(this.state.grid[y][x]==3) {
                row.push(<GoalSphere pos={pos} radius="0.25" />)
            } else {
                var partOfPath = false
                for(var i = 0; i < path.length; i++) {
                    if(path[i].x == x && path[i].y == y) {
                        row.push(<GhostSphere pos={pos} radius="0.2" theColor="purple"/>)
                        partOfPath = true
                        break
                    }
                }
                if(!partOfPath) {
                    row.push(null)
                }
            }
            grid.push(row)
        }
    }
    return grid
  },
  drawCurrentGrid: function() {
    var grid = []
    for (var y = 0; y < this.state.grid.length; y++) {
        var row = []
        for (var x = 0; x < this.state.grid[y].length; x++) {
            var pos = (x-2) + " " + (y-2) + " -10"
            if(this.state.grid[y][x] == 1) {
                row.push(<Cube pos={pos} />)
            } else if(this.state.grid[y][x]==2) {
                row.push(<PlayerSphere pos={pos} radius="0.25" theColor="black"/>)
            } else if(this.state.grid[y][x]==3) {
                row.push(<GoalSphere pos={pos} radius="0.25" />)
            } else if(!this.state.path) {
                var inOpenList = false
                if(!this.state.openList) {
                    row.push(null)
                    continue
                }
                for(var i = 0; i < this.state.openList.length; i++) {
                    if(this.state.openList[i].x == x && this.state.openList[i].y == y) {
                        row.push(<GhostSphere pos={pos} radius="0.2" theColor="purple"/>)
                        inOpenList = true
                        break
                    }
                }
                if(!inOpenList) {
                    row.push(null)
                }
            } else {
                var partOfPath = false
                for(var i = 0; i < this.state.path.length; i++) {
                    if(this.state.path[i].x == x && this.state.path[i].y == y) {
                        row.push(<GhostSphere pos={pos} radius="0.2" theColor="purple"/>)
                        partOfPath = true
                        break
                    }
                }
                if(!partOfPath) {
                    row.push(null)
                }
            }
            grid.push(row)
        }
    }
    return grid
  },
  render: function() {
    console.log(this.state)
    // var sg = this.aStarCreateGrid()
    // var path = this.aStarSearch(sg, sg[7][7], sg[1][1])
    return (
      <a-scene>
        <Camera />
        <Sky />
        {this.drawCurrentGrid()}
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))