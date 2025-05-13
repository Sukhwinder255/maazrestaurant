
    // Simulated database of products
    const products = [
      { name: "Vegetarian Pizza", price: "120 kr.", category: "vegetarian", imageUrl: "images/vegpizza.jpg" },
      { name: "Chicken Burger", price: "89 kr.", category: "meat", imageUrl: "images/chickburger.jpg" },
      { name: "Veggie Wrap", price: "69 kr.", category: "vegetarian", imageUrl: "images/vegwrap.jpg" },
      { name: "Beef Steak", price: "150 kr.", category: "meat", imageUrl: "images/beefsteak.jpg" }
    ];

    // Get the <ul> element
    const productList = document.getElementById("productList");

    // Function to create product list items
    function createProductItem(product) {
      // Create <li> element
      const li = document.createElement("li");

      // Create product image
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.name;

      // Create <p> for product name
      const name = document.createElement("p");
      name.textContent = product.name;

      // Create <p> for product price
      const price = document.createElement("p");
      price.textContent = product.price;

      // Create <p> for product category
      const category = document.createElement("p");
      category.textContent = product.category;

      // Append elements to <li>
      li.appendChild(img);
      li.appendChild(name);
      li.appendChild(price);
      li.appendChild(category);

      // Append <li> to <ul>
      productList.appendChild(li);
    }

    // Loop through the database to create product items
    function displayProducts(products) {
      productList.innerHTML = ""; // Clear the list first
      for (let i = 0; i < products.length; i++) {
        createProductItem(products[i]);
      }
    }

    // Filter functions
    function filterVegetarian() {
      const vegetarianProducts = products.filter(product => product.category === "vegetarian");
      displayProducts(vegetarianProducts);
    }

    function filterMeat() {
      const meatProducts = products.filter(product => product.category === "meat");
      displayProducts(meatProducts);
    }

    // Event listeners for filter buttons
    document.getElementById("vegetarianBtn").addEventListener("click", filterVegetarian);
    document.getElementById("meatBtn").addEventListener("click", filterMeat);

    // Initial display of all products
    displayProducts(products);
