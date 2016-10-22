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
            <a-animation attribute="position" from="0 0 0" to="0 5 0" duration="1000"></a-animation>
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

var Sphere = React.createClass({
  render: function() {
    return (
        <a-sphere position={this.props.pos} radius={this.props.radius} color={this.props.theColor}>
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
  render: function() {
    return (
      <a-scene>
        <Camera />
        <Sky />
        <Cube pos="1 5 -4" />
        <Cube pos="1 6 -4" />
        <Cube pos="1 4 -4" />
        <Cube pos="0 6 -4" />
        <Sphere pos="0 5 -4" radius="0.25" theColor="purple"/>
        <Cube pos="0 4 -4" />
        <Cube pos="-1 5 -4" />
        <Cube pos="-1 6 -4" />
        <Cube pos="-1 4 -4" />
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))