/// <reference types = "Cypress"/>
import mockingApplication from "../../pages/mockingApplication";
import { userPage2, NextPage } from "../../fixtures/endpoints.json"

const Mocking = new mockingApplication();

describe('Functional Test cases - Mocking service for the application using the API endpoints', () => {

    it('Mocking the MainPage of the Application using API endpoint', () => {
  
        cy.intercept('GET', userPage2, { fixture: 'MainPage.json' }).as('getEndpoint');
        cy.visit('/');
        cy.wait('@getEndpoint')
    })

    it('Mocking the List Page of the Application using the API endpoint', () => {
  
        cy.intercept('GET', NextPage, { fixture: 'singlePage.json' }).as('letEndpoint');
        cy.visit('/');
        Mocking.clickOnSinglPageApplication();
        cy.wait('@letEndpoint')
    })
  
    
  })