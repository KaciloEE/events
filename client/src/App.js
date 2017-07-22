import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router';

class App extends Component {  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to  EReact</h2>
        </div>        
        <p className="App-intro">          
          <p><Link to="/">Главная</Link></p>
          <p><Link to="/listBids">Просмотр заявок</Link></p>          
          {this.props.children}          
        </p>
      </div>
    ); 
  }
}
 
export default App;


