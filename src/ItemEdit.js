import React, { Component } from 'react';
import {startGettingDrivers, startGettingDeliveryData} from './utils.js';
var axios = require('axios');

class ItemEdit extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            delivery: {},
            drivers: [],
            currentDriver: ''
        };
    }

    componentDidMount() {
        this.getData();
    }
 
    render() {
        return (
        <main role="main">
            <h1>Edit Delivery</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder={this.state.delivery.date} disabled />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder={this.state.delivery.name} disabled />
                    </div>
                </div>       
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Driver</label>
                    <div className="col-sm-10">
                        <select className="form-control" value={this.state.currentDriver} onChange={this.handleDriverChange}>
                            {this.state.drivers.map(elem => <option key={elem.key} value={elem.key}>{elem.name}</option>)}
                        </select>
                    </div>
                </div>   
                <button type="submit" className="btn btn-primary">Update</button>         
            </form>
        </main>
    )}

    getData = () => {
        axios.all([startGettingDeliveryData(this.props.itemId), startGettingDrivers()])
        .then(axios.spread( (delivery, drivers) => {
            this.setState({
                delivery: delivery.data,
                drivers: Object.keys(drivers.data).map(key => Object.assign({}, drivers.data[key], {key: key})),
                currentDriver: delivery.data.driver_id 
            });            
        }));        
    }

    handleDriverChange = (e) => { this.setState({currentDriver: e.target.value}) }
    
    onSubmit = (e) => {
        e.preventDefault();

        axios.put(process.env.REACT_APP_URL_ROOT + '/deliveries.php', {'driver_id': this.state.currentDriver}, {
            params: {'id': this.props.itemId}
        }).then( response =>
            this.props.switchView('itemList')()
        );
    }
}

export default ItemEdit;