describe("URL Shortener Spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      fixture: "urls.json",
    }).as("getUrls");

    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: {
        id: 3,
        long_url: "http-blah-blah.com",
        short_url: "http://localhost:3001/useshorturl/3",
        title: "Monke",
      },
    }).as("postUrl");
  });

  context("On load tests", () => {
    it("should display page contents on load", () => {
      cy.visit("http://localhost:3000/");
      cy.get("h1").should("contain", "URL Shortener"); // page title
      cy.get('form [placeholder="Title..."]').should("exist"); //form input 1
      cy.get('form [placeholder="URL to Shorten..."]').should("exist"); //form input 2
      cy.get("form button").should("exist"); //form button
      cy.get("section").should("exist");
      cy.fixture("urls.json").then((data) => {
        data.urls.forEach((url, i) => {
          cy.get(".url").eq(i).as("currentUrl");
          cy.get("@currentUrl").find("h3").should("contain", url.title); //existing urls titles
          cy.get("@currentUrl").find("a").should("contain", url.short_url); //existing urls short
          cy.get("@currentUrl").find("p").should("contain", url.long_url); // existing urls long
        });
      });
    });

    it("should reflect values in form as its filled out", () => {
      cy.visit("http://localhost:3000/");
      cy.get('form .input-field[name="title"]')
        .type("Monke")
        .should("have.value", "Monke");
      cy.get('form .input-field[name="urlToShorten"]')
        .type("http-blah-blah.com")
        .should("have.value", "http-blah-blah.com");
    });

    it("should POST/render the new shortened URL when form is submitted", () => {
      cy.visit("http://localhost:3000/");
      cy.get('form .input-field[name="title"]').type("Monke");
      cy.get('form .input-field[name="urlToShorten"]').type(
        "http-blah-blah.com"
      );
      cy.get("form button").click();
      cy.fixture("postUrls.json").then((data) => {
        data.urls.forEach((url, i) => {
          cy.get(".url").eq(i).as("currentUrl");
          cy.get("@currentUrl").find("h3").should("contain", url.title);
          cy.get("@currentUrl").find("a").should("contain", url.short_url);
          cy.get("@currentUrl").find("p").should("contain", url.long_url);
        });
      });
    });
  });
});
