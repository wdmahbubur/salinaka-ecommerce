import useScrollTop from '../../../hooks/useScrollTop';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import React from 'react';

const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();

  return (
    <div className="loader">
      <h2>Welcome to admin dashboard</h2>
    </div>
  );
};

export default Dashboard;
