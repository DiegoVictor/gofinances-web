import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

export default (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/import" element={<Import />} />
  </Routes>
);
