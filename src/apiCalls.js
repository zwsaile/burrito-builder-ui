export const getOrders = (state) => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => state.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
}

export const submitOrders = (request) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = request;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  fetch("http://localhost:3001/api/v1/orders", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}