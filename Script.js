
  // new code

  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalDisplay = document.getElementById("cartTotal");

  const products = [
      {
        name: "Butter Chicken",
        description: "Tender chicken in a creamy tomato-based sauce.",
        price: 145.00,
        category: "meat",
        image: "images/butterchicken.jpeg"
      },
      {
        name: "Daal makhani",
        description: "Rich and creamy Indian lentil dish.",
        price: 119.00,
        category: "vegetarian",
        image: "images/daalmakhani.jpg"
      },
      {
        name: "Palak Paneer",
        description: "Spinach and paneer cooked with aromatic spices.",
        price: 125.00,
        category: "vegetarian",
        image: "images/palakpaneer.jpg"
      },
      {
        name: "Lamb Rogan Josh",
        description: "Slow-cooked lamb in a spiced curry sauce.",
        price: 155.00,
        category: "meat",
        image: "images/laamrogan.jpg"
      },
      {
        name: "Chana Masala",
        description: "Chickpeas simmered in a tomato onion gravy.",
        price: 110.00,
        category: "vegetarian",
        image: "images/channamasala.jpg"
      },

      { 
        name: "Vegetarian Pizza", 
        description: "A Vegetarian Pizza is topped with fresh veggies, cheese, and tomato sauce.",
        price: 120.00, 
        category: "vegetarian", 
        image: "images/vegpizza.jpg" 
      },
      { 
        name: "Chicken Burger", 
        description: "  Chicken patty with lettuce, and sauce in a soft bun.",
        price: 89.00, 
        category: "meat", 
        image: "images/chickburger.jpg" 
      },
      { 
        name: "Veggie Wrap",
        description: " With fresh vegetables, cheese, and flavorful sauce.",

        price: 69.00, 
        category: "vegetarian", 
        image: "images/vegwrap.jpg" 
      },
      { 
        name: "Beef Steak", 
        description: "Juicy cut of beef, grilled or pan-seared to perfection.",
        price: 150.00, 
        category: "meat", 
        image: "images/beefsteak.jpg" 
      },
      { 
        name: "kingfisher",
        description: "Refreshing taste and smooth, malty flavor.", 
        price: 75.00, 
        category: "drink", 
        image: "images/kingfisher beer.jpg" 
      },
      { 
        name: "Rødvin", 
        description: " Full-bodied drink made from fermented dark grapes.",
        price: 70.00, 
        category: "drink", 
        image: "images/rødvin.jpg" 
      },
      { 
        name: "Cola", 
        description: "One small cola free with two medium cola.",
        price: 60.00, 
        category: "drink", 
        image: "images/cola.jpg" 
      }
  ];


  let cart = [];

  function createProductItem(product) {
    const li = document.createElement("li");
    li.classList.add("product-item");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("product-image");

    const name = document.createElement("h3");
    name.textContent = product.name;
    name.classList.add("product-name");

    const description = document.createElement("p");
    description.textContent = product.description;
    description.classList.add("product-description");

    const price = document.createElement("p");
    price.textContent = `DKK ${product.price.toFixed(2)}`;
    price.classList.add("product-price");

    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;
    category.classList.add("product-category");

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(product);

    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(description);
    li.appendChild(price);
    li.appendChild(category);
    li.appendChild(addButton);

    productList.appendChild(li);
  }

  function displayProducts(products) {
    productList.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
      createProductItem(products[i]);
    }
  }

  function filterVegetarian() {
    const vegetarianProducts = products.filter(product => product.category === "vegetarian");
    displayProducts(vegetarianProducts);
  }

  function filterMeat() {
    const meatProducts = products.filter(product => product.category === "meat");
    displayProducts(meatProducts);
  }

    function filterdrink() {
    const drinkProducts = products.filter(product => product.category === "drink");
    displayProducts(drinkProducts);
  }

  function showAll() {
    displayProducts(products);
  }

  function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
  }


 function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <span>${item.name} (DKK ${item.price.toFixed(2)})</span>
      <div class="quantity-controls">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
      <span>Subtotal: DKK ${itemTotal.toFixed(2)}</span>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalDisplay.textContent = `Total: DKK ${total.toFixed(2)}`;
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

  

  function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    displayProducts(filtered);
  }

  // Event Listeners
  document.getElementById("vegetarianBtn").addEventListener("click", filterVegetarian);
  document.getElementById("meatBtn").addEventListener("click", filterMeat);
  document.getElementById("drinkBtn").addEventListener("click", filterdrink);
  document.getElementById("allBtn").addEventListener("click", showAll);
  
  searchInput.addEventListener("input", handleSearch);

  // Initial display
  displayProducts(products);