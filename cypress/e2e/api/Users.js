import { faker } from "@faker-js/faker";
var UserName, Password;
export default class Users {
  /*Create user */
  /*In test cases , used create function as pre step for all other tests */

  createUser() {
    UserName = faker.name.firstName();
    Password = faker.phone.phoneNumber();
    const UserInfo = {
      id: faker.datatype.number({
        min: 1,
        max: 10,
      }),
      username: UserName,
      firstName: faker.name.lastName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: Password,
      phone: faker.phone.phoneNumber(),
      userStatus: faker.datatype.number({
        min: 1,
        max: 10,
      }),
    };
    cy.request({
      method: "POST",
      url: `${Cypress.config("APIURL")}/user`,
      body: UserInfo,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  } /*login with right data for user */
  loginUser() {
    cy.request(
      "GET",
      `${Cypress.config(
        "APIURL"
      )}/user/login?username=${UserName}&password=${Password}`
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  } /*log out */
  logoutUser() {
    cy.request("GET", `${Cypress.config("APIURL")}/user/logout`).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  }
  /*get user data */
  getUserData() {
    cy.request("GET", `${Cypress.config("APIURL")}/user/${UserName}`).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body.username).to.equal(UserName);
      }
    );
  }
  /* delete user  */

  deleteUser() {
    cy.request("DELETE", `${Cypress.config("APIURL")}/user/${UserName}`).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  }
}
