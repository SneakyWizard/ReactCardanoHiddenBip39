
import App      from './App';
import React    from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import 'semantic-ui-less/semantic.less'

/*const styleLink = document.createElement("link");
styleLink.rel   = "stylesheet";
styleLink.href  = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild( styleLink );*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
