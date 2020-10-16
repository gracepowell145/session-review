import React from 'react';
import axios from 'axios'
import Header from './Header'

function Dashboard() {
  return (
    <div className="dashboard">
        <Header/>
      <p>
          this is the dashboard
      </p>
    </div>
  );
}

export default Dashboard;