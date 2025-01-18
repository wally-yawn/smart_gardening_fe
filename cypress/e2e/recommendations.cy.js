describe("recommendations", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/v1/gardens/1", {
      fixture: "gardens",
    });

    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", {
      fixture: "plants",
    });

    cy.intercept(
      "GET",
      "http://localhost:3000/api/v1/recommendation?zip_code=80209&sunlight=Full+Sun&soil_type=Loamy&water_needs=High&purpose=Food+Production",
      {
        fixture: "recommendations",
      }
    );

    cy.intercept(
      "GET",
      "http://localhost:3000/api/v1/recommendation?zip_code=80221&sunlight=Shade&soil_type=Silty&water_needs=Moderate&purpose=Recreation",
      {
        fixture: "recommendations_2",
      }
    );

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

    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      fixture: "gardens",
    });
    cy.visit("http://localhost:3001/");
  });

  it("shows the main page before a search has not been completed with a default garden", () => {
    cy.get("h1")
      .contains("Smart Gardening")
      .get(".my-garden-button")
      .should("exist")
      .get(".garden-form-section > h1")
      .contains("Input Garden Info")
      .get('input[name="zip_code"]')
      .should("have.value", "80209")
      .get('input[name="zip_code"]')
      .should("have.value", "80209")
      .get('select[name="name"]')
      .should("have.value", "Vegetable Garden")
      .get('select[name="soil_type"]')
      .should("have.value", "Loamy")
      .get('select[name="sunlight"]')
      .should("have.value", "Full Sun")
      .get('select[name="water_needs"]')
      .should("have.value", "High")
      .get('select[name="purpose"]')
      .should("have.value", "Food Production")
      .get(".recommendations-header")
      .contains("Recommendations")
      .get(".default-message")
      .contains(
        "Enter your garden information and click Search to get recommendations!"
      );
  });

  it("shows recommendations after clicking Search with the default garden", () => {
    cy.get(".search-button")
      .click()
      .get(".plant-cards")
      .find(".plant-card")
      .should("have.lengthOf", 2)
      .get(".plant-cards > :nth-child(1) > h3")
      .contains("Strawberry")
      .get(".plant-cards > :nth-child(1) > img")
      .should("have.attr", "src", "https://example.com/mock-strawberry.jpg")
      .get(".plant-cards > :nth-child(1) > img")
      .should("have.attr", "alt", "Strawberry")
      .get(".plant-cards > :nth-child(1) > p")
      .contains(
        "Thrives in loamy soil and full sun, ideal for food production."
      )
      .get(".plant-cards > :nth-child(2) > h3")
      .contains("Basil")
      .get(".plant-cards > :nth-child(2) > img")
      .should("have.attr", "src", "https://example.com/mock-basil.jpg")
      .get(".plant-cards > :nth-child(2) > img")
      .should("have.attr", "alt", "Basil")
      .get(".plant-cards > :nth-child(2) > p")
      .contains("Aromatic herb thriving in full sun with moderate watering.");
  });

  it("shows recommendations after clicking Search with the selected attributes", () => {
    cy.get('input[name="zip_code"]')
      .clear()
      .get('input[name="zip_code"]')
      .type("80221")
      .get('select[name="name"]')
      .select("Mixed Garden")
      .get('select[name="soil_type"]')
      .select("Silty")
      .get('select[name="sunlight"]')
      .select("Shade")
      .get('select[name="water_needs"]')
      .select("Moderate")
      .get('select[name="purpose"]')
      .select("Recreation")
      .get(".search-button")
      .click()
      .get(".plant-cards")
      .find(".plant-card")
      .should("have.lengthOf", 3)
      .get(".plant-cards > :nth-child(1) > h3")
      .contains("Catnip")
      .get(".plant-cards > :nth-child(1) > img")
      .should("have.attr", "src", "https://example.com/mock-catnip.jpg")
      .get(".plant-cards > :nth-child(1) > img")
      .should("have.attr", "alt", "Catnip")
      .get(".plant-cards > :nth-child(1) > p")
      .contains(
        "Did you know this isn't a small plant? Cuz I didn't when I planted it"
      )
      .get(".plant-cards > :nth-child(2) > h3")
      .contains("Rosemary")
      .get(".plant-cards > :nth-child(2) > img")
      .should("have.attr", "src", "https://example.com/mock-rosemary.jpg")
      .get(".plant-cards > :nth-child(2) > img")
      .should("have.attr", "alt", "Rosemary")
      .get(".plant-cards > :nth-child(2) > p")
      .contains("Goes well with everything")
      .get(".plant-cards > :nth-child(3) > h3")
      .contains("Beets")
      .get(".plant-cards > :nth-child(3) > img")
      .should("have.attr", "src", "https://example.com/mock-beets.jpg")
      .get(".plant-cards > :nth-child(3) > img")
      .should("have.attr", "alt", "Beets")
      .get(".plant-cards > :nth-child(3) > p")
      .contains("Who doesn't love beets?");
  });

  it("cannot search if the any fields are blank", () => {
    cy.get('input[name="zip_code"]')
      .clear()
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.")
      .get('input[name="zip_code"]')
      .type("80221")
      .get('select[name="name"]')
      .select("Select a Garden Name")
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.")
      .get('select[name="name"]')
      .select("Mixed Garden")
      .get('select[name="soil_type"]')
      .select("Select Soil Type")
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.")
      .get('select[name="soil_type"]')
      .select("Silty")
      .get('select[name="sunlight"]')
      .select("Select Sunlight")
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.")
      .get('select[name="sunlight"]')
      .select("Shade")
      .get('select[name="water_needs"]')
      .select("Select Water Needs")
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.")
      .get('select[name="water_needs"]')
      .select("Moderate")
      .get('select[name="purpose"]')
      .select("Select Purpose")
      .get(".search-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before searching.");
  });

  it("cannot update if any fields are blank", () => {
    cy.get('input[name="zip_code"]')
      .clear()
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.")
      .get('input[name="zip_code"]')
      .type("80221")
      .get('select[name="name"]')
      .select("Select a Garden Name")
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.")
      .get('select[name="name"]')
      .select("Mixed Garden")
      .get('select[name="soil_type"]')
      .select("Select Soil Type")
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.")
      .get('select[name="soil_type"]')
      .select("Silty")
      .get('select[name="sunlight"]')
      .select("Select Sunlight")
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.")
      .get('select[name="sunlight"]')
      .select("Shade")
      .get('select[name="water_needs"]')
      .select("Select Water Needs")
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.")
      .get('select[name="water_needs"]')
      .select("Moderate")
      .get('select[name="purpose"]')
      .select("Select Purpose")
      .get(".edit-save-button")
      .click()
      .get(".error")
      .contains("Please complete all fields before saving or updating.");
  });

  it("cannot save a plant twice", { defaultCommandTimeout: 20000 }, () => {
    cy.get(".search-button").click()
    .get(".plant-cards > :nth-child(1) .button-enabled").contains("Save Plant").click()
    .get(".plant-cards > :nth-child(1) .button-disabled").contains("Plant Saved").should("exist");
  })

  it("handles error during plant saving", { defaultCommandTimeout: 20000 }, () => {
    // Simulate an error during plant saving (e.g., server error)
    cy.intercept("PATCH", "http://localhost:3000/api/v1/1", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("savePlantError");

    // Step 1: Try to save a plant

    cy.get(".search-button").click()
    cy.get(".plant-cards > :nth-child(1) .button-enabled").click()

    // Step 2: Verify the error message is shown on the button
    cy.wait("@savePlantError").then(() => {
      cy.get(".plant-cards > :nth-child(1) .button-enabled")
        .contains("Error Try Again Later")
        .should("not.be.disabled");
    });
  });
});
