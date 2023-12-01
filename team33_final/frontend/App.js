import React, { useState } from "react";
import "./App.css";

const response = await fetch('http://localhost:8081/listDrivers');
var data = await response.json();

function App() {
  const [query, setQuery] = useState("");
  const [ItemsCategory, setItems] = useState(data);
  const [showing, setShowing] = useState(0);
  var startData = {
    "_id": "",
    "id": -1,
    "name": "",
    "brand": "",
    "year": 2023,
    "url": "",
    "price": "",
    "design_info": [
      "",
      ""
    ],
    "grip": "",
    "hand": "",
    "length": "",
    "loft": "",
    "shaft": "",
    "shaft_flex": ""
  };
  const [pageData, setPageData] = useState(startData);

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
  }

  const handleAboutClick = () => {
    setShowing(10);
  }

  const listItems = ItemsCategory.map((el) => (
    <div class="col" key={el.id}>
      <div class="card shadow-sm">
        <img id="catalog_image" src={el.url} width="100%" alt="image" onClick={() => handleImageClick(el.id)} />
        <div class="card-body">
          <h4 class="card-text"><strong>{el.name}</strong> - {el.year}</h4>
          <h5 class="card-text">{el.price}</h5>
        </div>
      </div>
    </div>
  ));

  const descList = pageData.design_info.map((item) => (
    <li>{item}</li>
  ));

  return (
    <div>
      <header data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a href="#" onClick={handleHomeClick} className="navbar-brand d-flex align-items-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="me-2"
                viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>Drivers</strong>
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
            <h5 class="pb-3">Search: <input type="search" value={query} onChange={handleChange} /></h5>
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
                  <h3 id="price">{pageData.price}</h3>
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
                      <li><strong>Length:</strong> {pageData.length}</li>
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
              <h3>Abraham Aldaco</h3>
              <h4 id="role">Professor</h4>
              <h6 id="contacts">Novermber 27, 2023</h6>
            </div>

          </div>
        </body>
      }

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
