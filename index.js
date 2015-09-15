window.jQuery = require('jquery');
require('./assets/js/bootstrap');
require('./style.styl');

var React = require('react'),
    App = require('./react/components/App')

React.render(<App />, document.getElementById('content'))
