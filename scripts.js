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

var AFrameScene = React.createClass({
  render: function() {
    return (
      <a-scene>
        <Camera />
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))