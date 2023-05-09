/// <reference types = "Cypress"/>

describe('Non- Functional: Performance Testing for the API & UI Application', () => {

  it('UI Performance Testing - Calculating the max and avg. time to load Requests with max users for a specific test duration', () => {

    const numUsers = 10;
    const testDuration = 5000; // 5 seconds

    const startTime = Date.now();
    let responseTimes = [];

    cy.intercept('GET', '/api/users/').as('getEndpoint');

    for (let i = 0; i < numUsers; i++) {
      cy.visit('/');
      cy.wait('@getEndpoint').then((response) => {
        responseTimes.push(Date.now() - startTime - response.duration);
      })
    }

    cy.wait(testDuration).then(() => {
      const averageResponseTime = responseTimes.reduce((acc, val) => acc + val, 0) / responseTimes.length;
      const maxResponseTime = Math.max(...responseTimes);
      cy.log(`Average response time: ${averageResponseTime}ms`);
      cy.log(`Max response time: ${maxResponseTime}ms`);
    });
  })

  it('API Performance Testing - Calculating the max and avg. time to verify the API endpoint can handle high volume requests', () => {

    const numUsers = 100;
    const testDuration = 2000; // 5 seconds

    const startTime = Date.now();
    let responseTimes = [];


    // Send GET requests in a loop for the defined test duration
    // const startTime = Date.now();
    for (let i = 0; i < numUsers; i++) {
      cy.request('GET', '/api/users/').then((response) => {
        responseTimes.push(Date.now() - startTime - response.duration);
      })
    }

    cy.wait(testDuration).then(() => {
      const averageResponseTime = responseTimes.reduce((acc, val) => acc + val, 0) / responseTimes.length;
      const maxResponseTime = Math.max(...responseTimes);
      cy.log(`Average response time: ${averageResponseTime}ms`);
      cy.log(`Max response time: ${maxResponseTime}ms`);
    });
  })
})