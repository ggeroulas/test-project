/* THINGS TO DO
Node.js
- Install it
- How to install a package
- Don't do global install, install it for the package
- API calls - axios
- Bring back some product, cart, user stuff
- Manipulating data - filtering, parsing it, pull individual elements
- Create new data
- Map
- AUTHENTICATION
- OAuth (Token based authentication)
- Set up a local database (Postgres)

*/

const axios = require('axios');
const fs = require('fs');
const dataset = 'https://dummyjson.com';

// Get product list and store in a text file
axios.get(dataset.concat('/products'))
  .then(function (response) {
    console.log(response.status)
    try {
      const output = JSON.stringify(response.data);
      fs.writeFileSync('./data/products.txt', output); 
      console.log("Product data written succesfully!");
    } catch (err) {
      console.error(err);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

// Parse product list as json object
const productRaw = fs.readFileSync('./data/products.txt'); 
const productJson = JSON.parse(productRaw); 
const productJsonArray = productJson.products;

// Extract a single item in the list

for (i in productJsonArray) {
 if (productJsonArray[i].title == "iPhone 9") {
  console.log(productJsonArray[i]);
  break;
 }
}

// Add an item to the list

const newItemId = productJson.limit + 1;
const newItemJson = {id: newItemId, title: 'Pixel 3', description: 'Best phone bar none', price: '500', discountPercentage: 10.00, rating: 5.00, stock: 0, brand: 'Google', category: 'smartphones', thumbnail: 'https://i.dummyjson.com/data/products/31/thumbnail.jpg', images: []};
productJsonArray.push(newItemJson);
//console.log(productJsonArray[30]);
productJson.products = productJsonArray;
productJson.limit = productJson.limit + 1;
//console.log(productJson);

// Sort the list alphabetically by title and store in a file

const productJsonArraySorted = productJsonArray;
productJsonArraySorted.push(productJsonArray[productJson.limit-1]);
productJsonArraySorted.sort((a, b) => a.title.localeCompare(b.title));
console.log(productJsonArraySorted);


