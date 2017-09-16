import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.store.getState())}
      </div>
    );
  }
}

export default App;
