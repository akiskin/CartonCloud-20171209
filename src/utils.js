var axios = require('axios');

export function startGettingDrivers() {
    return axios.get(process.env.REACT_APP_URL_ROOT + '/drivers.php');
}

export function startGettingDriverData(id) {
    return axios.get(process.env.REACT_APP_URL_ROOT + '/drivers.php', {params: {'id': id}});
}

export function startGettingDeliveries() {
    return axios.get(process.env.REACT_APP_URL_ROOT + '/deliveries.php');
}

export function startGettingDeliveryData(id) {
    return axios.get(process.env.REACT_APP_URL_ROOT + '/deliveries.php', {params: {'id': id}});
}