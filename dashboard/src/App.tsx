import React from 'react';

const App = () => {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Analytics</a>
          <a href="#">Settings</a>
        </nav>
      </nav>
      
      <main className="main-content">
        <div className="card">
          <h2>Overview</h2>
          <p>Responsive dashboard content here</p>
        </div>
      </main>
    </div>
  );
};

export default App;
