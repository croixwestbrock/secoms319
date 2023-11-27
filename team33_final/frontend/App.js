import React, { useState } from "react";
import "./App.css";

const response = await fetch('http://localhost:8081/listDrivers');
var data = await response.json();

function App() {
  const [query, setQuery] = useState("");
  const [ItemsCategory, setItems] = useState(data);
  const [showing, setShowing] = useState(0);

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    const results = data.filter(eachItem => {
      if (e.target.value === "") return ItemsCategory;
      return eachItem.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setItems(results);
  }

  const handleImageClick = (id) => {
    setShowing(id);
  }

  const listItems = ItemsCategory.map((el) => (
    // PRODUCT
    <div class="col" key={el.id}>
      <div class="card shadow-sm">
        <img src={el.url} width="100%" alt="image" onClick={() => handleImageClick(el.id)} />
        <div class="card-body">
          <h4 class="card-text"><strong>{el.name}</strong> - {el.year}</h4>
          <h5 class="card-text">{el.price}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              {/* <button class="mx-1" type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
              <button class="mx-1" type="button" variant="light" onClick={() => addToCart(el)}> + </button> */}
              {/* ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <header data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a href="./index.html" className="navbar-brand d-flex align-items-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="me-2"
                viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>Drivers</strong>
            </a>
            <a href="./index.html" class="navbar-brand d-flex align-items-center p-2" >
              <strong>Golf Driver Catalog</strong>
            </a>
            <a href="./about.html" class="navbar-brand d-flex align-items-center p-2" >
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
      {showing === 1 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://www.golfalot.com/Portals/0/imagesblogs/callaway/mavrikdriver/reviewhero.jpg" width="100%"
                    alt="mavrik driver" />
                  <h3 id="price">$299.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Callaway MAVRIK Driver</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft (Adjustable):</strong> 9.0° (8°-11°), 10.5° (9.5°-12.5°)</li>
                      <li><strong>Shaft:</strong> Projext X HZRDUS T800 Graphite</li>
                      <li><strong>Grip:</strong> Golf Pride Tour Velvet Align 50g Grip</li>
                      <li><strong>Length:</strong> 45.5"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Designed to equip golfers with a combination of incredible distance, forgiveness, consistency and
                        feel</li>
                      <li>Remarkable new technologies allows for smarter and extensive performance improvements in the face
                        and clubhead</li>
                      <li>Single, fixed 5g weight located in the back-center of the sole promotes mid-level spin and a
                        moderate draw bias</li>
                      <li>New Artificial Intelligence designed Flash Face SS20 contains a thinner face across a more expansive
                        area for ultra-fast ball speeds</li>
                      <li>Cyclone Aero shape features a shallower silhouette with a flat crown to decrease drag for increased
                        clubhead speed</li>
                      <li>High-strength FS2S Titanium face allows for optimal speed, forgiveness and spin performance</li>
                      <li>Two internal Jailbreak bars connect the crown to the sole, stabilizing and stiffening those points
                        at impact</li>
                      <li>Triaxial carbon fabric (TC2) promotes high MOI for better distance and accuracy performance on
                        mis-hits</li>
                      <li>Acoustic A.I. design features an internal titanium rib system that fine-tunes the head for
                        unparalleled sound and feel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 2 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://www.golfalot.com/Portals/0/imagesblogs/wilson/dynapowerdriver/dynapower_hero.jpg" width="100%"
                    alt="dynapower driver" />
                  <h3 id="price">$429.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Wilson Dynapower Driver</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft:</strong> 9.0°, 10.5°, 13.0°</li>
                      <li><strong>Shaft:</strong> Projext X HZRDUS Smoke Red RDX Graphite</li>
                      <li><strong>Grip:</strong> WS Lamkin Crossline 360</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>16-gram rear weight and a CG positioned low and back for maximum stability, higher launch angles and a neutral to draw bias. A six-way hosel allows for easy loft and spin adjustments.</li>
                      <li>Dynapower AI analyzed thousands of permutations to find the perfect thickness for each section of the club face, resulting in the fastest ball speeds and maximum forgiveness.</li>
                      <li>Rear weighting produces a high MOI driver head with a deep, rear CG that delivers forgiving, higher launch angles with a neutral to draw bias.</li>
                      <li>The new 6-way adjustable driver sleeve allows for more launch and spin adjustments.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 3 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://golfweek.usatoday.com/wp-content/uploads/sites/87/2021/01/Callaway-Epic-Speed-driver.jpg" width="100%"
                    alt="epic speed driver" />
                  <h3 id="price">$429.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Callaway Epic Speed Driver</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft:</strong> 9.0°, 10.5°, 12.0°</li>
                      <li><strong>Shaft:</strong> Projext X Cypher 40g Graphite</li>
                      <li><strong>Grip:</strong> Golf Pride Tour Velvet Align Black</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Jailbreak A.I. Speed Frame improves stability in the vertical, horizontal and torsional direction for incredible ball speeds across the face</li>
                      <li>Super strength titanium promotes optimal speed, forgiveness and spin robustness</li>
                      <li>Taller ribbon and flatter crown help golfers generate more speed from their swing</li>
                      <li>A.I Designed Flash Face creates a greater emphasis on center and off-center ball speeds</li>
                      <li>Advanced aerodynamical head construction promotes lower drag for increased head speed and ball speed</li>
                      <li>Saved weight redistributed to increase forgiveness</li>
                      <li>Additional Triaxial carbon toe patch adds draw bias while saving weight to promote a powerful shot shape</li>
                      <li>Triaxial carbon covers a larger portion of the crown for reduced weight vs. titanium crowns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 4 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://www.americangolf.co.uk/on/demandware.static/-/Sites-master-catalog/default/dw99b1ab12/images-square/zoom/369531-PING-G425-Max-Driver-1.jpg" width="100%"
                    alt="g425 max driver" />
                  <h3 id="price">$399.00</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">PING G425 Max Driver</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft:</strong> 9.0°, 10.5°, 12.0°</li>
                      <li><strong>Shaft:</strong> Alta CB 55 Slate Graphite, PING Tour 173-65 Graphite</li>
                      <li><strong>Grip:</strong> Arccos Caddie Smart Grip, Golf Pride 360 Tour Velvet Grip</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Loft Adjustable +/- 1.5°</li>
                      <li>Incredibly high MOI</li>
                      <li>26g tungsten movable CG-shifting weight</li>
                      <li>Neutral, Draw and Fade settings for customized ball flight</li>
                      <li>T9S+ forged face flexes to add distance</li>
                      <li>Internal ribbing optimizes feel and sound</li>
                      <li>Lightweight, 8-position hosel for adjusting loft and lie</li>
                      <li>Arccos Caddie Smart Grip and Smart Sensor technology pair with the Arccos Caddie app to automatically record and analyze every shot</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 5 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://cdn.golfmagic.com/DRIVER1.png" width="100%"
                    alt="paradym driver" />
                  <h3 id="price">$599.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Callaway Paradym Driver</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Tour, Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft:</strong> 9.0°, 10.5°, 12.0°</li>
                      <li><strong>Shaft:</strong> Aldila Ascent 40 Graphite, Fujikura Ventus TR 6 Graphite, Mitsubishi Kai'li 60 Graphite</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>New A.I. designed Jailbreak system provides stability in both the horizontal and torsional direction, now with a 33% lighter weight design for enhanced stability and faster ball speeds.</li>
                      <li>All-new A.I. face optimization enhances speed, launch and spin, and now downrange dispersion.</li>
                      <li>360° Carbon Chassis promotes unprecedented weight redistribution for maximized distance.</li>
                      <li>Triaxial Carbon crown and Forged Carbon sole is 44% lighter than a titanium chassis and is repositioned for higher MOI and increased forgiveness.</li>
                      <li>Face Cup Technology provides higher energy transfer to the ball than a standard driver face insert.</li>
                      <li>Refined head shape with high MOI and adjustable perimeter weighting. From a 15g sliding weight, players can experience an average of 12 yards of shot shape correction.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 6 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2021/hotlist-2021/drivers/revised-hero-images/EDIT_CLUBS_0006_GD0221_HL_DRIVER_TAYLORMADE_SIM2_HERO.jpg.rend.hgtvcom.1850.1850.suffix/1612884822432.jpeg" width="100%"
                    alt="taylormade sim2" />
                  <h3 id="price">$529.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">TaylorMade SIM2 -2021</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Regular</li>
                      <li><strong>Hand:</strong> Left</li>
                      <li><strong>Loft:</strong> 10.5°</li>
                      <li><strong>Shaft:</strong> Mitsubishi Tensel AV Raw Blue 60 Graphite</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Lightweight and high-strength aluminum forged ring construction milled to an exacting shape for stability and forgiveness
                      </li>
                      <li>Asymmetric Inertia Generator uses advanced geometry and aerodynamic analytics to deliver fast club head speeds
                      </li>
                      <li>Speed Injected™ Twin Face™ improves ball speed, while the corrective face curvature protects against heel and toe mis-hits
                      </li>
                      <li>Thru-Slot Speed Pocket™ design maximizes ball speeds and produces additional forgiveness on low face strikes
                      </li>
                      <li>Split Mass Weighting enhances forgiveness, while allowing for pinpoint target swing weights custom assembly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 7 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://truespecgolf.com/wp-content/uploads/2023/01/TM23CWD-TA101-Stealth-2-Plus-LFS-OSN-24324-v1-scaled.jpg" width="100%"
                    alt="taylormade driver" />
                  <h3 id="price">$599.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">TaylorMade Stealth 2</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Tour, Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft (Adjustable):</strong> 9.0° (8°-11°), 10.5° (9.5°-12.5°)</li>
                      <li><strong>Shaft:</strong>Fujikura Ventus Red TR 5 Graphite</li>
                      <li><strong>Length:</strong> 45.75"</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Building on the speed producing success of the original 60X Carbon Twist Face that optimized energy transfer for fast ball speeds, the new face design in Stealth 2 features an advanced version of Inverted Cone Technology (ICT) to help maintain ball speed on off-center strikes and increase forgiveness.</li>
                      <li>The Carbon Reinforced Composite Ring unites the driver head into a singular force and frees up additional mass that has been strategically placed to deliver more forgiveness.</li>
                      <li>The corrective tendencies of Twist Face™ combined with advanced ICT help maintain ball speed and accuracy on off-center strikes.</li>
                      <li>The 60X Carbon Twist Face is encased by a polyurethane cover, featuring a revolutionary nanotexture technology.</li>
                      <li>The Inertia Generator remains the foundational source of refined aerodynamic properties. The result is a slippery-fast head shape that aids in swing speed generation on the downswing for golfers at every level.</li>
                      <li>Flexible Speed Pocket™ design is engineered to maximize ball speeds and produce additional forgiveness on low-face strikes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 8 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2021/hotlist-2021/drivers/revised-hero-images/EDIT_CLUBS_0002_GD0221_HL_DRIVER_TITLEIST_TSi3_HERO.jpg.rend.hgtvcom.1850.1850.suffix/1612884819435.jpeg" width="100%"
                    alt="tsi3 driver" />
                  <h3 id="price">$549.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Titleist TSi3</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Stiff</li>
                      <li><strong>Hand:</strong> Right</li>
                      <li><strong>Loft (Adjustable):</strong> 8.0°,9.0°</li>
                      <li><strong>Shaft:</strong>Project X HZRDUS Smoke Black RDX</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Adjustable CG Track Design for advanced speed-tuned performance</li>
                      <li>ATI 425 Aerospace Titanium in face creates a long, straight, stylish and incredible sounding driver</li>
                      <li>Face delivers higher ball speed at every point of contact</li>
                      <li>Improved aerodynamics for increased speed</li>
                      <li>Multi-dimensional stability for added speed, and a tighter speed range up and down the face</li>
                      <li>Adjustability features for fine-tuned performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {showing === 9 && <div>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="https://www.golfwrx.com/wp-content/uploads/2022/09/IMG_6484.jpeg" width="100%"
                    alt="tsr2 driver" />
                  <h3 id="price">$599.99</h3>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body" id="information">
                    <h2 class="card-text">Titleist TSR2</h2>
                    <h5>Product Options Information:</h5>
                    <ul>
                      <li><strong>Shaft Flex:</strong> Tour, Stiff, Regular, Senior</li>
                      <li><strong>Hand:</strong> Right, Left</li>
                      <li><strong>Loft (Adjustable):</strong> 9.0° (8°-11°), 10.5° (9.5°-12.5°)</li>
                      <li><strong>Shaft:</strong> Graphite Design Tour AD DI-6 Graphite</li>
                    </ul>
                    <h5>Design Information</h5>
                    <ul>
                      <li>Titleist TSR2 is slimmed down and ramped up. For players who make contact across the entire surface of the face, it combines our most significant CG shift with a new Multi-Plateau VFT face to boost speed across the face.</li>
                      <li>Greater speed means greater distance, and the new shape of TSR2 has been refined to make it as fast as possible through the air. </li>
                      <li>The redesigned toe shape also improves the face angle for a better look at address.</li>
                      <li>This new construction approach builds the face inward, layer by layer, to create nearly constant CT across the entire hitting surface.</li>
                      <li>CG placement plays a key role in both speed and forgiveness. For TSR2, the CG has been shifted both lower and more forward to increase ball speed while improving launch and spin.</li>
                      <li>A driver that fits better performs better. The SureFit system gives a fitter the flexibility to perfectly match the performance of TSR2 to the needs of each individual player, helping you make purer and more consistent contact.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>


  );
}

export default App;
