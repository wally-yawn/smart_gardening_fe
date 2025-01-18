describe("tool tip test", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/gardens/1',{
      fixture: 'gardens'
    })

    cy.intercept('GET', 'http://localhost:3000/api/v1/1/plants', {
      fixture: 'plants'
    })

    cy.intercept('GET', 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.39.0/dist/dotlottie-player.wasm', {
      fixture: 'lottie'
    })

    cy.intercept('GET', 'https://lottie.host/2d329e8e-3849-48e2-a940-4939e1314e4c/M1alAvpStN.lottie', {
      fixture: 'lottie'
    })

    cy.intercept('GET', 'https://unpkg.com/@lottiefiles/dotlottie-web@0.39.0/dist/dotlottie-player.wasm', {
      fixture: 'lottie'
    })
  })

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
