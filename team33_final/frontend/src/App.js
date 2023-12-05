import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

const response = await fetch("http://localhost:8081/listDrivers");
var data = await response.json();

function App() {
  const [query, setQuery] = useState("");
  const [ItemsCategory, setItems] = useState(data);
  const [showing, setShowing] = useState(0);

  var startData = {
    _id: "",
    id: -1,
    name: "",
    brand: "",
    year: 2023,
    url: "",
    price: "",
    design_info: ["", ""],
    grip: "",
    hand: "",
    length: "",
    loft: "",
    shaft: "",
    shaft_flex: "",
    rating: 0
  };
  const [pageData, setPageData] = useState(startData);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [showingCatalog, setShowingCatalog] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/listDrivers");
      const result = await response.json();
      setItems(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      // Remove the dollar sign and convert to float
      const price = parseFloat(cart[i].price.replace("$", ""));
      totalVal += price;
    }
    setCartTotal(totalVal);
  }, [cart]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    const results = data.filter((eachItem) => {
      if (e.target.value === "") return ItemsCategory;
      return eachItem.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setItems(results);
  };

  const handleImageClick = async (id) => {
    setShowing(id);
    const response = await fetch("http://localhost:8081/" + id);
    setPageData(await response.json());
  };

  const handleHomeClick = () => {
    setShowing(0);
  };

  const handleAboutClick = () => {
    setShowing(10);
  };
  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  // Remove item from cart
  const removeFromCart = (el) => {
    setCart(cart.filter((cartItem) => cartItem.id !== el.id));
  };

  // Toggle showing the catalog or the cart
  const handleShowHideCatalog = () => {
    setShowingCatalog(!showingCatalog);
  };

  const listItems = ItemsCategory.map((el) => (
    <div class="col" key={el.id}>
      <div class="card shadow-sm">
        <img id="catalog_image" src={el.url} width="100%" alt="image" onClick={() => handleImageClick(el.id)}/>
        <div class="card-body">
          <h4 class="card-text">
            <strong>{el.name}</strong> - {el.year}
          </h4>
          <h5 class="card-text">{el.price}</h5>
          <h6 class="card-text">Rating: {el.rating}</h6>

          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button
                class="mx-1"
                type="button"
                onClick={() => removeFromCart(el)}
              >
                {" "}
                -{" "}
              </button>{" "}
              <button class="mx-1" type="button" onClick={() => addToCart(el)}>
                {" "}
                +{" "}
              </button>
              ${el.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  
  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <div>
        <img src={el.url} width="25%" alt="image" />
        <p>
          {el.name} - {el.price}
        </p>
        <button type="button" onClick={() => removeFromCart(el)}>
          Remove
        </button>
      </div>
    </div>
  ));
  // const Cart = ({ cart, removeFromCart, cartTotal }) => {
  //   const cartItems = cart.map((el) => (
  //     <div key={el.id} className="cart-item">
  //       <img src={el.url} width="25%" alt="image" />
  //       <div>
  //         <p>{el.name} - {el.price}</p>
  //         <button onClick={() => removeFromCart(el)}>Remove</button>
  //       </div>
  //     </div>
  //   ));
  
  //   return (
  //     <div>
  //       <h1>Your Cart</h1>
  //       {cartItems.length > 0 ? (
  //         <div>
  //           <div>{cartItems}</div>
  //           <div className="total">
  //             <h4>Total Number of Products: {cart.length}</h4>
  //             <h4>Order Total: ${cartTotal.toFixed(2)}</h4>
  //           </div>
  //         </div>
  //       ) : (
  //         <p>Your cart is empty.</p>
  //       )}
  //     </div>
  //   );
  // };

  const descList = pageData.design_info.map((item) => <li>{item}</li>);

  return (
    <Router>
      <div>
        <header data-bs-theme="dark">
          <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container">
              <a
                href="#"
                onClick={handleHomeClick}
                className="navbar-brand d-flex align-items-center p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                  className="me-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <strong>Drivers</strong>
              </a>
              <a
                href="#"
                class="navbar-brand d-flex align-items-center p-2"
                onClick={handleHomeClick}
              >
                <strong>Golf Driver Catalog</strong>
              </a>
              <a
                onClick={handleAboutClick}
                class="navbar-brand d-flex align-items-center p-2"
              >
                <strong>About</strong>
              </a>
            </div>
          </div>
          <button onClick={handleShowHideCatalog}>
            {showingCatalog ? "View Cart" : "Back to Catalog"}
          </button>
        </header>

        {showing === 0 && showingCatalog && (
          <div>
            <section class="py-5 text-center container">
              <div class="row py-1">
                <div class="col-lg-6 col-md-8 mx-auto">
                  <h1 class="fw-light">Golf Drivers</h1>
                </div>
              </div>
            </section>
            <div class="album py-5 bg-body-tertiary">
              <div class="container">
                <h5 class="pb-3">
                  Search:{" "}
                  <input type="search" value={query} onChange={handleChange} />
                </h5>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {listItems}
                </div>
              </div>
            </div>
          </div>
        )}
        {!showingCatalog && (
          <div>
            {/* Cart view components */}
            <h1>Your Cart: </h1>
            {cartItems}
            <h4>Total Number of Products: {cart.length}</h4>
            <h4>Order Total: ${cartTotal}</h4>
            <button onClick={handleShowHideCatalog}>Back to Catalog</button>
            <h1>Payment Information</h1>

            <div id="liveAlertPlaceholder"></div>

            <form class="row g-3" id="checkout-form">
              <div class="col-md-6">
                <label for="inputName" class="form-label">
                  Full Name
                </label>
                <input type="text" class="form-control" id="inputName" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Must be like, "John Doe"</div>
              </div>

              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Email
                </label>
                <input type="email" class="form-control" id="inputEmail4" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Must be like, "abc@xyz.efg"</div>
              </div>

              <div class="col-12">
                <label for="inputCard" class="form-label">
                  Card
                </label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="bi-credit-card-fill"></i>
                  </span>
                  <input
                    type="text"
                    id="inputCard"
                    class="form-control"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Must be like, "7777-7777-7777-7777"
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label for="inputAddress" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div class="col-12">
                <label for="inputAddress2" class="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  City
                </label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-md-4">
                <label for="inputState" class="form-label">
                  State
                </label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Zip
                </label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-success">
                  {" "}
                  <i class="bi-bag-check"></i> Order
                </button>
              </div>
            </form>

            <div class="card collapse">
              <div class="card-body">
                <h5 class="card-title">Order summary</h5>
                <p class="card-text">Here is a summary of your order.</p>
              </div>
              <ul class="list-group list-group-flush"></ul>
              <a href="" onclick="location.reload()" class="btn btn-secondary">
                {" "}
                <i class="bi-arrow-left-circle"></i>
                Return
              </a>
            </div>
          </div>
        )}
        {showing > 0 && showing <= 9 && (
          <div>
            <div class="album py-5 bg-body-tertiary">
              <div class="container">
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
                  <div class="col">
                    <div class="card shadow-sm">
                      <img
                        src={pageData.url}
                        width="100%"
                        alt="mavrik driver"
                      />
                      <h3 id="price">{pageData.price}</h3>
                      <h5>Rating: {pageData.rating}</h5>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card shadow-sm">
                      <div class="card-body" id="information">
                        <h2 class="card-text">
                          <strong>{pageData.name}</strong>
                        </h2>
                        <h5>Product Options Information:</h5>
                        <ul>
                          <li>
                            <strong>Shaft Flex:</strong> {pageData.shaft_flex}
                          </li>
                          <li>
                            <strong>Hand:</strong> {pageData.hand}
                          </li>
                          <li>
                            <strong>Loft:</strong> {pageData.loft}
                          </li>
                          <li>
                            <strong>Shaft:</strong> {pageData.shaft}
                          </li>
                          <li>
                            <strong>Grip:</strong> {pageData.grip}
                          </li>
                          <li>
                            <strong>Length:</strong> {pageData.length}
                          </li>
                        </ul>
                        <h5>Design Information</h5>
                        <ul>{descList}</ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showing === 10 && (
          <body>
            <div class="row">
              <div class="col m-5">
                <h2>
                  <strong>Croix Westbrock</strong>
                </h2>
                <h4 id="role">Contributor</h4>
                <h6 id="contacts">Contact: croix24@iastate.edu</h6>
              </div>
              <div class="col my-5">
                <h2>
                  <strong>Jonathon Madden</strong>
                </h2>
                <h4 id="role">Contributor</h4>
                <h6 id="contacts">Contact: jnmadden@iastate.edu</h6>
              </div>
            </div>
            <div class="row">
              <div class="col mx-5">
                <h2>
                  <strong>
                    SE/COMS 319 Fall 2023 - Construction of User Interfaces
                  </strong>
                </h2>
                <h3>Abraham Aldaco</h3>
                <h4 id="role">Professor</h4>
                <h6 id="contacts">Novermber 27, 2023</h6>
              </div>
            </div>
          </body>
        )}

        <footer class="text-body-secondary py-5">
          <div class="container">
            <p class="float-end mb-1">
              <a href="#">Back to Top</a>
            </p>
            <p class="mb-1">&copy; SE/COMS 319 Team 33</p>
            <p class="mb-0">
              Contact us at croix24@iastate.edu and jnmadden@iastate.edu.
            </p>
          </div>
        </footer>
        <Routes>
          
          {/* <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
              />
            }
          /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const form = document.getElementById("checkout-form");
const inputCard = document.querySelector("#inputCard");
const alertTrigger = document.getElementById("submit-btn");
const summaryCard = document.querySelector(".card");
const summaryList = document.querySelector(".card > ul");

console.log(summaryList);

var order = { name: "", email: "", card: "" };

const alert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    ` <div>${message}</div>`,
    ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  alertPlaceholder.append(wrapper);
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
let validate = function () {
  let val = true;
  let email = document.getElementById("inputEmail4");
  let name = document.getElementById("inputName");
  let card = document.getElementById("inputCard");

  if (
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    email.setAttribute("class", "form-control is-valid");
    order.email = email.value;
  }

  if (name.value.length == 0) {
    name.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value;
  }

  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
    card.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value;
  }

  if (val) {
    form.classList.add("collapse");

    for (const [key, value] of Object.entries(order)) {
      summaryList.innerHTML +=
        '<li class="list-group-item"> <b>' +
        `${key}` +
        ": </b>" +
        `${value}` +
        "</li>";
    }
    summaryCard.classList.remove("collapse");
    alertPlaceholder.innerHTML = "";
    alert(
      '<i class="bi-cart-check-fill"></i> You have made an order!',
      "success"
    );
  }
  return val;
};

export default App;
