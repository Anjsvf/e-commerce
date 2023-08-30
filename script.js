document.addEventListener("DOMContentLoaded", () => {
    const tvs = [
        { name: " Tmart TV LG, 49 polegadas", price: 6.00, image: "img/tvlg.jpeg", stock: "3" },
        { name: " Smart TV Sansung 4k 60 polegadas", price: 41.20000, image: "img/tvsansung.jpeg", stock: "6" },
        { name: " Smart TV Acer 29 polegadas", price: 6.906, image: "img/tvacer.jpeg", stock: "4" },

    ];


    const smartphones = [
        { name: "Iphone pro max 11", price: 2.0900, image: "./img/iphone.jpeg", stock: "3" },
        { name: " Smartphone Sansung A12 120gb", price: 6.0090, image: "./img/a12.jpeg", stock: "6" },
        { name: " Smartphone Sansung S20 280gb", price: 4.466, image: "./img/s20.jpeg", stock: "3" },

    ];


    const games = [
        { name: "Console Playstation 4", price: 4.360, image: "./img/ps4.jpeg", stock: "3" },
        { name: " Console playstation 3", price: 3.600, image: "./img/ps3.jpeg", stock: "7" },
        { name: "Xbox one", price: 2.560, image: "./img/xbox.jpeg", stock: "9" },

    ];


    const notebooks = [
        { name: " notebook Acer 8gb ssd 500gb", price: 2.000, image: "img/acer.jpeg", stock: "3" },
        { name: " notebook Sansung 8g ssd 256  ", price: 4.500, image: "./img/sansung8gb.jpeg", stock: "4" },
        { name: " notebook  Dell 4gb ram  ssd 234 gb", price: 10000, image: "img/dell.jpeg", stock: "3" },

    ];

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


    let cartItemCount = 0;

    function addToCart(product) {
        cartItems.push(product);
        updateCartDisplay();
        saveCartToLocalStorage();
    }

    function updateCartDisplay() {
        const cartList = document.getElementById("cart-items");
        cartList.innerHTML = "";


        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("li");

            cartItem.innerHTML = `${item.name}
    <button class="delete-item"  data-index ="${index}">Deletar</button>;`

            cartList.appendChild(cartItem);

        });


        cartItemCount = cartItems.length;
        const badge = document.querySelector(".badge");
        badge.textContent = cartItemCount;

        badge.style.display = cartItemCount > 0 ? "block" : "none";

    }


    function displayProducts(productsArray, containerId) {
        const productList = document.getElementById(containerId);

        productsArray.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);

        })

        $(`#${containerId}`).slick({
            slidesToshow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }

    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `<h2>${product.name}</h2>
    
<img src="${product.image}" alt="${product.name}" class="product-image">
<p>preço: $${product.price.toFixed(2)}</p>
<p>estoque: ${product.stock} disponíveis</p>

<button class="add-to-cart"> adicione no carrinho</button>

`;
        const addButton = productCard.querySelector(".add-to-cart");
        addButton.addEventListener("click", () => {
            addToCart(product)
        })

        return productCard;

    }

    function saveCartToLocalStorage() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));


    }


    displayProducts(tvs, "tv-list");
    displayProducts(smartphones, "smartphone-list");
    displayProducts(games, "game-list");
    displayProducts(notebooks, "notebook-list");



    const cartIcon = document.getElementById("cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close")

    cartIcon.addEventListener("click", () => {
        cartModal.style.display = "block";
    });


    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    const cartItemList = document.getElementById("cart-items");


    cartItemList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-item")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            cartItems.splice(index, 1);
            updateCartDisplay();

            saveCartToLocalStorage();
        }
    });

    const deleteSelectedButton = document.getElementById("delete-selected");


    deleteSelectedButton.addEventListener("click", () => {
        const selectedIndexes = Array.from(document.querySelectorAll(".delete-item:checked"))
            .map(checkbox => parseInt(checkbox.getAttribute("data-index")));

        selectedIndexes.sort((a, b) => b - a);

        selectedIndexes.forEach(index => {
            cartItems.splice(index, 1)
        });

        updateCartDisplay();
        cartModal.style.display = "none";

        document.querySelectorAll(".delete-item-checked").forEach(checkbox => {
            checkbox.checked = false;
        });

        saveCartToLocalStorage();

    });


    const deleteAllButton = document.getElementById("delete-all");



    deleteAllButton.addEventListener("click", () => {

        cartItems.length = 0
        updateCartDisplay();

        cartModal.style.display = "none";
        saveCartToLocalStorage();
    })










});