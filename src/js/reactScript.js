var React = require('react');
var ReactDOM = require('react-dom');

const e = React.createElement;

ReactDOM.render(
	e("div", null, "Hello React!"),
	document.getElementsByClassName("insert")[0]
);