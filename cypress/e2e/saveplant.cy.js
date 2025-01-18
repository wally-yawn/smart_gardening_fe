describe("Garden Plant Saving Functionality with Recommendation", () => {
  beforeEach(() => {
    // Intercepts the garden and plant recommendation API calls
    // cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
    //   fixture: "mygarden_empty", // Empty garden initially
    // }).as('getGardenEmpty');

    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
      fixture: "mygarden_saved", // Empty garden initially
    });
    cy.intercept(
      "GET",
      "http://localhost:3000/api/v1/recommendation?zip_code=80209&sunlight=Full+Sun&soil_type=Loamy&water_needs=High&purpose=Food+Production",
      {
        fixture: "recommendations",
      }
    );

    // Intercept POST request to simulate successful plant save
    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      statusCode: 200,
      body: { message: "Plant added successfully" },
    });

    cy.intercept("GET", "http://localhost:3000/api/v1/gardens/1"),
      {
        fixture: "gardens.json",
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

    // Visit the main page to start the process
    cy.visit("http://localhost:3001/");
  });

  it("runs a recommendation, saves a plant, and verifies it appears in the garden", () => {
    // Step 1: Input garden info and click Search
    cy.get('input[name="zip_code"]').type("80209");
    cy.get('select[name="sunlight"]').select("Full Sun");
    cy.get('select[name="soil_type"]').select("Loamy");
    cy.get('select[name="water_needs"]').select("High");
    cy.get('select[name="purpose"]').select("Food Production");
    cy.get(".search-button").click();

    // Step 2: Wait for recommendations to load and verify plant cards
    cy.get(".plant-cards").find(".plant-card").should("have.length", 2);

    // Verify the plant cards contain the correct data from the fixture
    cy.get(".plant-cards > :nth-child(1) > h3").contains("Strawberry");
    cy.get(".plant-cards > :nth-child(1) > img").should(
      "have.attr",
      "src",
      "https://example.com/mock-strawberry.jpg"
    );
    cy.get(".plant-cards > :nth-child(1) > p").contains(
      "Thrives in loamy soil and full sun, ideal for food production."
    );

    // Step 3: Save a plant
    cy.get(".plant-cards > :nth-child(1) .button-enabled").click(); // Save the first plant (Strawberry)

    // Step 4: Verify the button changes to 'Plant Saved' and is disabled
    // cy.wait("@savePlant").then(() => {
    cy.get(".plant-cards > :nth-child(1) .button-disabled")
      .contains("Plant Saved")
      .should("be.disabled");
    // Step 5: Visit the garden page and verify the plant is saved
    cy.visit("http://localhost:3001/mygarden");
    cy.get(".all-plant-cards").contains("Strawberry"); // Ensure the saved plant is visible
  });

  it("handles error during plant saving", () => {
    // Simulate an error during plant saving (e.g., server error)
    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("savePlantError");

    // Step 1: Try to save a plant
    cy.get(".plant-cards > :nth-child(1) .button-enabled").click();

    // Step 2: Verify the error message is shown on the button
    cy.wait("@savePlantError").then(() => {
      cy.get(".plant-cards > :nth-child(1) .button-error")
        .contains("Error Try Again Later")
        .should("not.be.disabled");
    });
  });
});
