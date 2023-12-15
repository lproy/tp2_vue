let baseURL = 'http://storerestservice.azurewebsites.net/api/';
let headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const RESOURCE_NAME = "products";

export async function getAllProducts() {
  const response = await fetch(baseURL + RESOURCE_NAME, headers);
  return await response.json();
}

export async function getProduct(id) {
    const response = await fetch(baseURL + RESOURCE_NAME + '/' + id, headers);
    let product = await response.json();
    return product;
  }

