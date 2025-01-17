describe("tool tip test", () => {
  it("should display the tool tip on hover", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".info-icon").trigger("mouseover");
    cy.get("#my-tooltip")
      .should("be.visible")
      .and(
        "contain",
        "Please enter a valid 5-digit zip code and select your options from the drop down menus."
      );
  });
});
