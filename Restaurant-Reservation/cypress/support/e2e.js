beforeEach(() => {
  cy.intercept("GET", "https://restaurantdata.onrender.com/states", {
    body: ["Texas"],
  }).as("getStates");

  cy.intercept("GET", "https://restaurantdata.onrender.com/cities/Texas", {
    body: ["Austin"],
  }).as("getCities");
});
