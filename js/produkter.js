const apiUrl = "stoperiapp.local/wp-json/wp/v2/posts";

async function getProducts() {
    try {
      const response = await fetch(apiUrl);
      const getResults = await response.json();
     /*  createHTML(getResults); */
      console.log(getResults);
    } catch (error) {
      console.log(error);
    }
  }
  
  getProducts();