/// <reference types = "Cypress"/>
import { Name, Number } from "../../fixtures/helpers/randomNameGenerator"
import { createPostRequest, usersEndpoint, NextPage } from "../../fixtures/endpoints.json"

const bodyDetails = {
  "name": `Name ${Name} ${Name}`,
  "job": `Job No. ${Number}`
}

const bodyDetailsUpdated = {
  "name": `Name Updated ${Name} ${Name}`,
  "job": `Job No. Updated ${Number}`
}

let Id;

describe('Functional Test cases - API CRUD Operations', () => {

  it('Create a new resource successfully', () => {

    cy.request('POST', createPostRequest, bodyDetails).then((response) => {

      Id = response.body.id
      cy.log(response.body.id)

      // Assert API's - for the name, status and job
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(bodyDetails.name)
      expect(response.body.job).to.eq(bodyDetails.job)
    })

  })

  it('Retrieve the created or existing user details', () => {

    cy.request('GET', `${NextPage}`).then((response) => {

      // Assert API's - status
      expect(response.status).to.eq(200);
    })

  })

  it('Update the existing user details', () => {

    cy.request('PUT', `${usersEndpoint}${Id}`, bodyDetailsUpdated).then((response) => {

      // Assert API's - for the name, status and job with updated details
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(bodyDetailsUpdated.name)
      expect(response.body.job).to.eq(bodyDetailsUpdated.job)
    })

  })

  it('Delete the user details', () => {

    cy.request('DELETE', `${usersEndpoint}${Id}`).then((response) => {

      // The resource is deleted successfully
      expect(response.status).to.eq(204);
    })

  })

})