describe("Header Component", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.39.0/dist/dotlottie-player.wasm",
      {
        fixture: "lottie",
      }
    );
    cy.intercept(
      "GET",
      "https://lottie.host/2d329e8e-3849-48e2-a940-4939e1314e4c/M1alAvpStN.lottie",
      {
        fixture: "lottie",
      }
    );

    cy.intercept(
      "GET",
      "https://unpkg.com/@lottiefiles/dotlottie-web@0.39.0/dist/dotlottie-player.wasm",
      {
        fixture: "lottie",
      }
    );
    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
      fixture: "mygarden_saved",
    });
    cy.intercept("GET", "http://localhost:3000/api/v1/gardens/1"),
      {
        fixture: "gardens",
      };
    cy.visit("http://localhost:3001");
  });

  it("displays the welcome message on the main page", () => {
    cy.get("h1").contains("Welcome to Smart Gardening");
  });

  it("displays the message on /mygarden", () => {
    cy.get("button.my-garden-button").click();
    cy.url().should("include", "/mygarden");
    cy.get("h1").contains("What a Wonderful Garden");
  });

  it("displays the page does not exist message", () => {
    cy.visit("http://localhost:3001/test", { failOnStatusCode: false });

    cy.get("h1").contains("Oops! This page doesn’t exist. 🌱");
  });

  it("displays the home button on non-main pages and navigates back home", () => {
    cy.visit("http://localhost:3001/mygarden");
    cy.get(".home-btn").should("exist").click();
    cy.url().should("eq", "http://localhost:3001/");
  });
});
