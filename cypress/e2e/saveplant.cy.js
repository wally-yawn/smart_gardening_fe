describe("Garden Plant Saving Functionality with Recommendation", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
      fixture: "mygarden_saved",
    });

    cy.intercept(
      "GET",
      "http://localhost:3000/api/v1/recommendation?zip_code=80209&sunlight=Full+Sun&soil_type=Loamy&water_needs=High&purpose=Food+Production",
      {
        fixture: "recommendations",
      }
    );

    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      statusCode: 200,
      body: { message: "Plant added successfully" },
    });

    cy.intercept("GET", "http://localhost:3000/api/v1/gardens/1"),
      {
        fixture: "gardens",
      };

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

    cy.visit("http://localhost:3001/");
  });

  it("runs a recommendation, saves a plant, and verifies it appears in the garden", () => {
    cy.get('input[name="zip_code"]').type("80209");
    cy.get('select[name="sunlight"]').select("Full Sun");
    cy.get('select[name="soil_type"]').select("Loamy");
    cy.get('select[name="water_needs"]').select("High");
    cy.get('select[name="purpose"]').select("Food Production");
    cy.get(".search-button").click();

    cy.get(".plant-cards").find(".plant-card").should("have.length", 2);

    cy.get(".plant-cards > :nth-child(1) > h3").contains("Strawberry");
    cy.get(".plant-cards > :nth-child(1) > img").should(
      "have.attr",
      "src",
      "https://example.com/mock-strawberry.jpg"
    );
    cy.get(".plant-cards > :nth-child(1) > p").contains(
      "Thrives in loamy soil and full sun, ideal for food production."
    );

    cy.get(".plant-cards > :nth-child(1) .button-enabled").click(); //

    cy.get(".plant-cards > :nth-child(1) .button-disabled")
      .contains("Plant Saved")
      .should("be.disabled");
    cy.visit("http://localhost:3001/mygarden");
    cy.get(".all-plant-cards").contains("Strawberry");
  });

  it("handles error during plant saving", () => {
    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    });

    cy.get('select[name="sunlight"]').select("Full Sun");
    cy.get('select[name="soil_type"]').select("Loamy");
    cy.get('select[name="water_needs"]').select("High");
    cy.get('select[name="purpose"]').select("Food Production");
    cy.get(".search-button").click();

    cy.get(".plant-cards").find(".plant-card").should("have.length", 2);

    cy.get(".plant-cards > :nth-child(1) .button-enabled").click();

    cy.get(".plant-cards > :nth-child(1) .button-enabled").contains(
      "Error Try Again Later"
    );
  });
});
