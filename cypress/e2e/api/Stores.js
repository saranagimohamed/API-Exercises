import { faker } from "@faker-js/faker";
import moment from "moment";
var ID;

export default class Stores {
  /*get store inentory and check status */
  getStoreInventory() {
    cy.request("GET", `${Cypress.config("APIURL")}/store/inventory `).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
      }
    );
  }
  /* create order and check data after creation also check status */
  /*In test cases , used create function as pre step for all other tests */

  createOrder() {
    ID = faker.datatype.number({
      min: 10,
      max: 50,
    });
    const OrderInfo = {
      id: ID,
      petId: faker.datatype.number({
        min: 1,
        max: 5,
      }),
      quantity: faker.datatype.number({
        min: 1,
        max: 5,
      }),
      shipDate: moment().format(),
      status: "approved",
      complete: true,
    };

    cy.request({
      method: "POST",
      url: `${Cypress.config("APIURL")}/store/order`,
      body: OrderInfo,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(ID);
      expect(response.body.status).to.equal("approved");
      expect(response.body.quantity).to.equal(OrderInfo.quantity);
      expect(response.body.petId).to.equal(OrderInfo.petId);
      expect(moment(response.body.shipDate).format("DD/MM/YYYY")).to.equal(
        moment(OrderInfo.shipDate).format("DD/MM/YYYY")
      );
    });
  }
  /*get order using id and check status*/
  getOrder() {
    cy.request("GET", `${Cypress.config("APIURL")}/store/order/${ID}`).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(ID);
      }
    );
  }
  /*delete order and check status */
  deleteOrder() {
    cy.request("DELETE", `${Cypress.config("APIURL")}/store/order/${ID}`).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  }
}
