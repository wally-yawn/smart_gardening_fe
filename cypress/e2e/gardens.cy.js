describe("Gardens Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", { fixture: "plants" }).as("getPlants");
    cy.intercept("DELETE", "http://localhost:3000/api/v1/gardens/1/plants/*", { statusCode: 200 }).as("deletePlant");
    cy.visit("http://localhost:3001/mygarden");
    cy.wait("@getPlants");
  });

  describe("Garden Display", () => {
    it("should display garden name and plants", () => {
      cy.get('[data-testid="garden-section"]').should("be.visible");
      cy.get(".garden-name").should("not.be.empty");
      cy.get(".all-plant-cards").should("exist");
    });

    it("should show empty state when no plants exist", () => {
      cy.intercept("GET", "http://localhost:3000/api/v1/1/plants", { body: { plants: [] } }).as("emptyGarden");
      cy.visit("http://localhost:3001/mygarden");
      cy.wait("@emptyGarden");
      cy.get('[data-testid="empty-garden"]').should("be.visible").and("contain", "No Plants Saved Yet");
    });
  });

  describe("Plant Management", () => {
    it("should successfully delete a plant", () => {
      cy.get(".all-plant-cards").first().within(() => {
        cy.get('button[aria-label="Delete plant"]').click();
      });
      cy.wait("@deletePlant");
    });

    it("should handle delete plant error", () => {
      cy.intercept("DELETE", "http://localhost:3000/api/v1/gardens/1/plants/*", { statusCode: 500 }).as("deletePlantError");
      cy.get(".all-plant-cards").first().within(() => {
        cy.get('button[aria-label="Delete plant"]').click();
      });
      cy.wait("@deletePlantError");
      cy.get('[data-testid="error-message"]').should("be.visible").and("contain", "Failed to delete plant");
    });

    it("should handle a network error on delete", () => {
      cy.intercept("DELETE", "http://localhost:3000/api/v1/gardens/1/plants/*", { forceNetworkError: true }).as("deletePlantNetworkError");
      cy.get(".all-plant-cards").first().within(() => {
        cy.get('button[aria-label="Delete plant"]').click();
      });
      cy.wait("@deletePlantNetworkError");
      cy.get('[data-testid="error-message"]').should("be.visible").and("contain", "Network error. Please check your connection.");
    });
  });

  describe("Loading States", () => {
    it("should show loading state during operations", () => {
      cy.intercept("DELETE", "http://localhost:3000/api/v1/gardens/1/plants/*", { delay: 1000, statusCode: 200 }).as("slowDelete");
      cy.get(".all-plant-cards").first().within(() => {
        cy.get('button[aria-label="Delete plant"]').click();
      });
      cy.get('[data-testid="loading"]').should("be.visible");
      cy.wait("@slowDelete");
    });
  });
});
