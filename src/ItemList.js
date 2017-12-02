import React, { Component } from 'react';
import {startGettingDrivers, startGettingDeliveries} from './utils.js';
var axios = require('axios');

class ItemList extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            inProgress: true,
            error: false,
            data: []
        };
    }

    componentDidMount() {
        this.getData();
    }
 
    render() {
        return (
        <main role="main">
            <h1>Deliveries</h1>
            {this.state.inProgress && <LoadingScreen />}
            {this.state.error && <ErrorScreen />}
            {(!this.state.inProgress && !this.state.error) && 
                <TableContainer>
                    {this.state.data.map(elem => 
                        <TableRow key={elem.key} 
                            deliveryId={elem.key} 
                            date={elem.date} 
                            name={elem.name} 
                            driver={this.state.drivers[elem.driver_id].name} 
                            onEdit={this.props.switchView('itemEdit', elem.key)} 
                            onDelete={this.props.switchView('itemDelete', elem.key)} 
                        />
                    )}
                </TableContainer>
            }
        </main>

    )}

    getData = () => {
        axios.all([startGettingDeliveries(), startGettingDrivers()])
        .then(axios.spread( (deliveries, drivers) => {
            this.setState({
                inProgress: false,
                error: false, 
                data: Object.keys(deliveries.data).map(key => Object.assign({}, deliveries.data[key], {key: key})),
                drivers: drivers.data
            });            
        })).catch(error => {
            this.setState({
                inProgress: false,
                error: true
            });            
        });          
    }
}

const LoadingScreen = () =>
<div className='text-center'>Loading...</div>

const ErrorScreen = () =>
<div className='text-center'>Sorry, something went wrong.</div>

const TableContainer = (props) =>
<table className="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Driver</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        {props.children}
    </tbody>
</table>

const TableRow = (props) =>
<tr>
    <th scope="row">{props.deliveryId}</th>
    <td>{props.date}</td>
    <td>{props.name}</td>
    <td>{props.driver}</td>
    <td className='text-right'>
        <a className='btn btn-outline-primary' href='' onClick={props.onEdit}>Edit</a>
        <a className='btn btn-outline-danger' href='' onClick={props.onDelete}>Delete</a>
    </td>
</tr>

export default ItemList;