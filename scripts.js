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
      [1,1,1,1,1],
      [1,3,1,0,1],
      [1,0,2,0,1],
      [1,0,1,0,1],
      [1,1,1,1,1]
      ]
    }
  },
  drawGrid: function() {
    var grid = []
    for (var y = 0; y < this.state.grid.length; y++) {
        var row = []
        for (var x = 0; x < this.state.grid[y].length; x++) {
            var pos = (x-2) + " " + (y-2) + " -5"
            if(this.state.grid[y][x] == 1) {
                row.push(<Cube pos={pos} />)
            } else if(this.state.grid[y][x]==2) {
                row.push(<PlayerSphere pos={pos} radius="0.25" theColor="black"/>)
            } else if(this.state.grid[y][x]==3) {
                row.push(<GoalSphere pos={pos} radius="0.25" />)
            } else {
                row.push(null)
            }
            grid.push(row)
        }
    }
    return grid
  },
  render: function() {
    return (
      <a-scene>
        <Camera />
        <Sky />
        {this.drawGrid()}
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))