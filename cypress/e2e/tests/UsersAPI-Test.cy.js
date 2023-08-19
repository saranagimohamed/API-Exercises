import Users from "../api/Users";
const users = new Users();
describe("Swagger Users API Tests", () => {
  beforeEach(() => {
    users.createUser();
  });

  it("Verify that user can login using Swagger Api. ", () => {
    users.loginUser();
  });
  it("Verify that user can logout after login using Swagger Api. ", () => {
    users.loginUser();
    cy.wait(10).then(() => {
      users.logoutUser();
    });
  });
  it("Verify that user get user data using Swagger Api.  ", () => {
    users.getUserData();
  });
  it("Verify that user can delete user using Swagger Api.  ", () => {
    users.deleteUser();
  });
});
