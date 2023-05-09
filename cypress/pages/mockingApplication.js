/// <reference types = "Cypress"/>

const singlePageCSS = '[data-id="users-single"]';

export default class mockingApplication {
    
    // Getter Methods
    getSingleUserPage() {
        return cy.get(singlePageCSS);
    }

    //Action Methods
    clickOnSinglPageApplication() {
        this.getSingleUserPage().should('be.visible').click();
    }
}