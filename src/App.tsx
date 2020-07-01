import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import Theme from './styles/theme';

const App: React.FC = () => (
  <Router>
    <Theme />
    <ToastContainer />
    <Routes />
  </Router>
);

export default App;
