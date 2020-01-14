import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var element = React.createElement(App);

ReactDOM.render(element, document.getElementById('root'));

//Hot Module Replacement - a tool for reloading application without refreshing. 
if (module.hot){
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

