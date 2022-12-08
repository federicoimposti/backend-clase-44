const axios = require('axios');

let options = {
  url: "http://localhost:8080/productos"
};

let headers = {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'application/json',
}

const product = {
    "title": "Vinilo",
    "thumbnail": "https://i.scdn.co/image/ab67616d00001e02dda272d19e1ccc1e9d438997",
    "price": "3213",
}

const productUpdated = {
    "title": "Vinilos",
    "thumbnail": "https://i.scdn.co/image/ab67616d00001e02dda272d19e1ccc1e9d438997",
    "price": "32132",
}

const getProducts = async () => {
    try {
        const response = await axios.get(options.url, { headers });
        return response;
    } catch (error) {
        console.error;
    }
}

const postProduct = async () => {
    try {
        const response = await axios.post(options.url, product);
        return response;
    } catch (error) {
        console.error;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${options.url}/${id}`, {});
        return response;
    } catch (error) {
        console.error;
    }
}

const updpateProduct = async (id) => {
    try {
        const response = await axios.put(`${options.url}/${id}`, productUpdated);
        return response;
    } catch (error) {
        console.error;
    }
}

postProduct()
    .then(res => {
        console.log(res.status, 'Post test status code');
    })

getProducts()
  .then(res => {
      console.log(res.data)
  })
  .catch(e => {
      console.log('Ocurrio un error al obtener los productos.', e);
  })

// deleteProduct('638cf0288c8a65d74acaf4a0');

updpateProduct('638cf0288c8a65d74acaf4a0');