import React, { Component } from 'react';
import ItemList from './ItemList.js';
import ItemAdd from './ItemAdd.js';
import ItemEdit from './ItemEdit.js';
import ItemDelete from './ItemDelete.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'itemList',//itemEdit, itemDelete, itemAdd
      currentDeliveryId: ''
    };
  }

  render() {
    return (
      <div className="container">
        <header className="header clearfix">
          <nav>
            <ul className="nav nav-pills float-right">
                <li className="nav-item">
                    <a className={this.state.currentView === 'itemList' ? 'nav-link active' : 'nav-link'} href='' onClick={this.switchView('itemList')}>Deliveries</a>
                </li>
                <li className="nav-item">
                    <a className={this.state.currentView === 'itemAdd' ? 'nav-link active' : 'nav-link'} href='' onClick={this.switchView('itemAdd')}>New Delivery</a>
                </li>
            </ul>
          </nav>
          <h3 className="text-muted">CartonCloud</h3>
        </header>
            {this.state.currentView === 'itemList' && <ItemList switchView={this.switchView} />}
            {this.state.currentView === 'itemEdit' && <ItemEdit switchView={this.switchView} itemId={this.state.currentDeliveryId} />}
            {this.state.currentView === 'itemDelete' && <ItemDelete switchView={this.switchView} itemId={this.state.currentDeliveryId} />}
            {this.state.currentView === 'itemAdd' && <ItemAdd switchView={this.switchView} itemId={this.state.currentDeliveryId} />}
      </div>
    );
  }

  switchView = (view, deliveryId = '') => (e) => {
    if (e !== undefined) {
      e.preventDefault();
    };
    this.setState({currentView: view, currentDeliveryId: deliveryId}); 
  }

}

export default App;
