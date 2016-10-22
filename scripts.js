var BuckysComponent = React.createClass({
    render: function() {
        return (<h2>This is a simple component</h2>);
    }
});
ReactDOM.render(<BuckysComponent />, document.getElementById('container'));