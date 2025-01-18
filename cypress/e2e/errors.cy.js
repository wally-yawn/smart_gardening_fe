describe("gardenPlantErrors", () => {
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

    cy.intercept("GET", "http://localhost:3000/api/v1/gardens/1", {
      fixture: "gardens",
    });

    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
      statusCode: 404,
      fixture: "404_error",
    });

    cy.visit("http://localhost:3001");
  })

it("display an error if fetching garden plants fails", () => {
    cy.get("h2").contains("Oh no, something went wrong fetching your plants, try again in a few minutes")
})
})