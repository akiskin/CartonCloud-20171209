import React, { Component } from 'react';
import {startGettingDrivers} from './utils.js';
var axios = require('axios');

class ItemAdd extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            drivers: [],
            date: '',
            dateError: false,
            name: '',
            nameError: false,
            currentDriver: '',
            driverError: false
        };
    }

    componentDidMount() {
        this.getData();
    }
 
    render() {
        return (
        <main role="main">
            <h1>Create Delivery</h1>
            <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">
                        <input type="date" className={this.state.dateError ? 'form-control is-invalid' : 'form-control'} value={this.state.date} onChange={this.handleDateChange} required />
                        <div className="invalid-feedback">
                            Please provide a valid date
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className={this.state.nameError ? 'form-control is-invalid' : 'form-control'} value={this.state.name} onChange={this.handleNameChange} required />
                        <div className="invalid-feedback">
                            Please provide a name
                        </div>
                    </div>
                </div>       
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Driver</label>
                    <div className="col-sm-10">
                        <select className={this.state.driverError ? 'form-control is-invalid' : 'form-control'} value={this.state.currentDriver} onChange={this.handleDriverChange} required>
                            <option value=''>- Select One -</option>
                            {this.state.drivers.map(elem => <option key={elem.key} value={elem.key}>{elem.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Please provide a driver
                        </div>
                    </div>
                </div>         
                <button className="btn btn-primary">Create</button>
            </form>
        </main>
    )}

    getData = () => {
        startGettingDrivers()
        .then( drivers => {
            this.setState({
                drivers: Object.keys(drivers.data).map(key => Object.assign({}, drivers.data[key], {key: key}))
            });            
        });        
    }

    handleDriverChange = (e) => { this.setState({currentDriver: e.target.value}) }
    handleDateChange = (e) => { this.setState({date: e.target.value}) }
    handleNameChange = (e) => { this.setState({name: e.target.value}) }
    
    onSubmit = (e) => {
        e.preventDefault();

        //Validate
        let dateError = this.state.date === '';
        let nameError = this.state.name === '';
        let driverError = this.state.currentDriver === '';
        if (dateError || nameError || driverError) {
            this.setState({
                dateError: dateError,
                nameError: nameError,
                driverError: driverError
            });
            return;
        }

        axios.post(process.env.REACT_APP_URL_ROOT + '/deliveries.php', 
        {
            'driver_id': this.state.currentDriver,
            'name': this.state.name,
            'date': this.state.date
        }
        ).then( response =>
            this.props.switchView('itemList')()
        );
    }
}

export default ItemAdd;