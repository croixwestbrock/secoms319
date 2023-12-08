import React, { useState, useEffect } from "react";
import "./App.css";

const response = await fetch('http://localhost:8081/listDrivers');
var data = await response.json();

function App() {
  const [query, setQuery] = useState("");
  const [ItemsCategory, setItems] = useState(data);
  const [showing, setShowing] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showingCart, setShowingCart] = useState(false);
  const [infoCorrect, setInfoCorrect] = useState(false);

  var startData = {
    "_id": "",
    "id": -1,
    "name": "",
    "brand": "",
    "year": 2023,
    "url": "",
    "price": 0,
    "design_info": [
      "",
      ""
    ],
    "grip": "",
    "hand": "",
    "length": 0,
    "loft": "",
    "shaft": "",
    "shaft_flex": "",
    "rating": 0
  };
  const [pageData, setPageData] = useState(startData);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id} class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col">
        <img class="img-fluid" src={el.url} width={150} />
      </div>
      <div class="col">
        {el.name}
      </div>
      <div class="col">
        ${el.price}
      </div>
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    const results = data.filter(eachItem => {
      if (e.target.value === "") return ItemsCategory;
      return eachItem.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setItems(results);
  }

  const handleImageClick = async (id) => {
    setShowing(id);
    const response = await fetch("http://localhost:8081/" + id);
    setPageData(await response.json());
  }

  const handleHomeClick = () => {
    setShowing(0);
    setShowingCart(false)
  }

  const handleAboutClick = () => {
    setShowing(10);
    setShowingCart(false);
  }

  function handleToCartClick() {
    setShowing(11);
    setShowingCart(true);
  }

  function handleToCatalogClick() {
    setShowing(0);
    setShowingCart(false);
  }

  const listItems = ItemsCategory.map((el) => (
    <div class="col" key={el.id}>
      <div class="card shadow-sm">
        <img id="catalog_image" src={el.url} width="100%" alt="image" onClick={() => handleImageClick(el.id)} />
        <div class="card-body">
          <h4 class="card-text"><strong>{el.name}</strong> - {el.year}</h4>
          <h5 class="card-text">${el.price}</h5>
          <h6 class="card-text">Rating: {el.rating}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button class="mx-1" type="button" onClick={() => removeFromCart(el)}> {" "} - {" "} </button>
              <button class="mx-1" type="button" onClick={() => addToCart(el)}> {" "} + {" "} </button>
              <h5 class="px-2"> In Cart: {howManyofThis(el.id)} </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const descList = pageData.design_info.map((item) => (
    <li>{item}</li>
  ));


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [alert, setAlert] = useState({ message: '', type: '' });
  //var order = { name: '', email: '', card: '' }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateCard = (card) => {
    return card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/);
  };

  const validateZip = (zip) => {
    return zip.match(/^[0-9]{5}$/)
  }

  const handleCardInput = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const cardNumber = input.substring(0, 16); // limit the length to 16 digits
    let formattedCardNumber = '';

    for (let i = 0; i < cardNumber.length; i++) {
      if (i !== 0 && i % 4 === 0) {
        formattedCardNumber += '-';
      }
      formattedCardNumber += cardNumber[i];
    }

    setCard(formattedCardNumber);
  };

  const handleZipInput = (e) => {
    const input = e.target.value;
    const zipNumber = input.substring(0, 5); // limit the length to 5 digits

    setZip(zipNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setAlert({ message: 'Name cannot be empty!', type: 'danger' });
      return;
    }
    if (!validateEmail(email)) {
      setAlert({ message: 'Invalid email address!', type: 'danger' });
      return;
    }
    if (!validateCard(card)) {
      setAlert({ message: 'Invalid card number!', type: 'danger' });
      return;
    }
    if (address.length === 0) {
      setAlert({ message: 'Address cannot be empty!', type: 'danger' });
      return;
    }
    if (city.length === 0) {
      setAlert({ message: 'City cannot be empty!', type: 'danger' });
      return;
    }
    if (state === '' || state === 'State') {
      setAlert({ message: 'No state picked!', type: 'danger' });
      return;
    }
    if (!validateZip(zip)) {
      setAlert({ message: 'Invalid zip code!', type: 'danger' });
      return;
    }

    // If all validations pass
    setAlert({ message: 'You have made an order!', type: 'success' });
    setInfoCorrect(true);
  };

  return (
    <div>
      <header data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center p-2" onClick={showingCart ? handleToCatalogClick : handleToCartClick}>
              <strong>{showingCart ? "View Catalog" : "View Cart"}</strong>
            </a>
            <a href="#" class="navbar-brand d-flex align-items-center p-2" onClick={handleHomeClick}>
              <strong>Golf Driver Catalog</strong>
            </a>
            <a onClick={handleAboutClick} class="navbar-brand d-flex align-items-center p-2" >
              <strong>About</strong>
            </a>
          </div>
        </div>
      </header>

      {showing === 0 && <div>
        <section class="py-5 text-center container">
          <div class="row py-1">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Golf Drivers</h1>
            </div>
          </div>
        </section>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3">
              <h5 class="pb-2">Search: <input type="search" value={query} onChange={handleChange} /></h5>
              <h5 class="text-left pb-2">Products Selected: {cart.length}</h5>
              <h5 class="text-left pb-2">Cart Total: {cartTotal}</h5>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {listItems}
            </div>
          </div>
        </div>
      </div>
      }
      {showing > 0 && showing <= 9 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src={pageData.url} width="100%"
                    alt="mavrik driver" />
                  <h3 class="px-2" id="price">${pageData.price}</h3>
                  <h5 class="px-3">Rating: {pageData.rating}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group mx-3 my-2">
                      <button class="mx-1" type="button" onClick={() => removeFromCart(pageData)}> {" "} - {" "} </button>
                      <button class="mx-1" type="button" onClick={() => addToCart(pageData)}> {" "} + {" "} </button>
                      <h5 class="px-2"> In Cart: {howManyofThis(pageData.id)} </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text"><strong>{pageData.name}</strong></h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> {pageData.shaft_flex}</li>
                      <li><strong>Hand:</strong> {pageData.hand}</li>
                      <li><strong>Loft:</strong> {pageData.loft}</li>
                      <li><strong>Shaft:</strong> {pageData.shaft}</li>
                      <li><strong>Grip:</strong> {pageData.grip}</li>
                      <li><strong>Length:</strong> {pageData.length}"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      {descList}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 10 &&
        <body>
          <div class="row">
            <div class="col m-5">
              <h2><strong>Croix Westbrock</strong></h2>
              <h4 id="role">Contributor</h4>
              <h6 id="contacts">Contact: croix24@iastate.edu</h6>

            </div>
            <div class="col my-5">
              <h2><strong>Jonathon Madden</strong></h2>
              <h4 id="role">Contributor</h4>
              <h6 id="contacts">Contact: jnmadden@iastate.edu</h6>

            </div>
          </div>
          <div class="row">
            <div class="col mx-5">
              <h2><strong>SE/COMS 319 Fall 2023 - Construction of User Interfaces</strong></h2>
              <h3>Dr. Abraham N. Aldaco Gastelum</h3>
              <h4 id="role">Professor</h4>
              <h6 id="contacts">Completed December 7, 2023</h6>
            </div>

          </div>
        </body>
      }
      {showing === 11 && <div>
        {!infoCorrect && <div>
          <div class="row py-3">
            <div class="col-2"></div>
            <div class="col-8">
              <h1>Your Cart: </h1>
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-3">
                <div class="col">
                  <h4>Item Image</h4>
                </div>
                <div class="col">
                  <h4>Item Name</h4>
                </div>
                <div class="col">
                  <h4>Item Price</h4>
                </div>
              </div>
              <div class="row">
                {cartItems}
                <h4 class="pt-4">Total Number of Products: {cart.length}</h4>
                <h4 class="py-2">Order Total: ${cartTotal}</h4>
              </div>

              <h1>Payment Information</h1>
              {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              )}
              <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-6">
                  <input class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div class="col-md-6">
                  <input class="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div class="col-12">
                  <input class="form-control" type="text" value={card} onChange={handleCardInput} placeholder="XXXX-XXXX-XXXX-XXXX" />
                </div>
                <div class="col-12">
                  <input class="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <div class="col-md-6">
                  <input class="form-control" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                </div>
                <div class="col-md-4">
                  <select class="form-select" type="text" value={state} onChange={(e) => setState(e.target.value)}>
                    <option selected>State</option>
                    <option>IA</option>
                    <option>MN</option>
                    <option>MI</option>
                    <option>WI</option>
                    <option>ND</option>
                    <option>SD</option>
                    <option>NE</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <input class="form-control" type="text" value={zip} onChange={handleZipInput} placeholder="Zip" />
                </div>
                <div class="col-12">
                  <button class="btn btn-success" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>}

        {infoCorrect && <div>
          <div class="row py-3">
            <div class="col-2"></div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">Order summary</h5>
                <p class="card-text">Here is a summary of your order.</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"> <b>Name:</b> {name}</li>
                <li class="list-group-item"> <b>Email:</b> {email}</li>
                <li class="list-group-item"> <b>Card:</b> XXXX-XXXX-XXXX-{card.substring(15, 19)}</li>
                <li class="list-group-item"> <b>Address:</b> {address}</li>
                <li class="list-group-item"> <b>City:</b> {city}</li>
                <li class="list-group-item"> <b>State:</b> {state}</li>
                <li class="list-group-item"> <b>Zip:</b> {zip}</li>
              </ul>
              <a href="" onclick="location.reload()" class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
                Return</a>
            </div>
          </div>
        </div>}
      </div>}

      <footer class="text-body-secondary py-5">
        <div class="container">
          <p class="float-end mb-1">
            <a href="#">Back to Top</a>
          </p>
          <p class="mb-1">&copy; SE/COMS 319 Team 33</p>
          <p class="mb-0">Contact us at croix24@iastate.edu and jnmadden@iastate.edu.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
