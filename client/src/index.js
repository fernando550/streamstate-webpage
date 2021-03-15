import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';
import "./styles/index.scss";

import {App} from './app';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
