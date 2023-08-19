import { faker } from "@faker-js/faker";
var PetID;

export default class Pets {
  /*Get avaiable pets and check status */
  getPets() {
    cy.request(
      "GET",
      `${Cypress.config("APIURL")}/pet/findByStatus?status=available`
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  }
  /*Create pet and check data after creation also check status */
  /*In test cases , used create function as pre step for all other tests */
  createPet() {
    PetID = faker.datatype.number({
      min: 1,
      max: 10,
    });
    const PetInfo = {
      id: PetID,
      category: {
        id: faker.datatype.number({
          min: 1,
          max: 5,
        }),
        name: faker.random.word(),
      },
      name: faker.random.word(),
      photoUrls: ["https://example.com/buddy.jpg"],
      tags: [
        {
          id: faker.datatype.number({
            min: 1,
            max: 5,
          }),
          name: faker.random.word(),
        },
      ],
      status: "available",
    };

    cy.request("POST", `${Cypress.config("APIURL")}/pet`, PetInfo).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(PetInfo.id);
        expect(response.body.tags.id).to.eq(PetInfo.tags.id);
        expect(response.body.tags.name).to.eq(PetInfo.tags.name);
        expect(response.body.name).to.eq(PetInfo.name);
        expect(response.body.status).to.eq(PetInfo.status);
      }
    );
  }
  /* check updating data using api and check status*/
  updatePet() {
    const PET_UPDATED = {
      id: PetID,
      name: faker.random.word(),
      category: {
        id: 1,
        name: faker.random.word(),
      },
      tags: [
        {
          id: 0,
          name: faker.random.word(),
        },
      ],
      status: "available",
    };
    cy.request("PUT", `${Cypress.config("APIURL")}/pet`, PET_UPDATED).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  }
  /*Getting pets using status */
  findPetwithStatus() {
    cy.request(
      "GET",
      `${Cypress.config("APIURL")}/pet/findByStatus?status=available`
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  }
  /*delete pets and check status */
  deletePet() {
    cy.request("DELETE", `${Cypress.config("APIURL")}/pet/${PetID}`).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  }
  /*update pet with photo */
  updateWithPhoto() {
    cy.readFile("cypress/fixtures/cat.jpg", "binary").then((photo) => {
      const blob = Cypress.Blob.binaryStringToBlob(photo);
      const payload = new FormData();
      payload.append("file", blob, "cat.jpg");
      cy.request({
        method: "POST",
        url: `${Cypress.config("APIURL")}/pet/${PetID}/uploadImage`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        type: "string",
        body: payload,
        encoding: "binary",
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  }
}
