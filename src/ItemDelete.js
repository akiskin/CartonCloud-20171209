import React, { Component } from 'react';
var axios = require('axios');

class ItemDelete extends Component {
    render() {
        return (
        <main role="main">
            <h1>Delete Delivery</h1>
            <p>Are you sure you want to delete this delivery?</p>
            <button className='btn btn-danger' onClick={this.onDelete}>Delete</button>
        </main>
    )}

    onDelete = (e) => {
        axios.delete(process.env.REACT_APP_URL_ROOT + '/deliveries.php', 
        {
            params: {'id': this.props.itemId}
        }
        ).then( response =>
            this.props.switchView('itemList')()
        );
    }

}

export default ItemDelete;