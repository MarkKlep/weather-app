import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './components/routing/Routing';
import HomePage from './components/home-page/HomePage';
import AuthProvider from './components/provider/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Routing>
      <HomePage/>
    </Routing>
  </AuthProvider>
);