exports.setEnv = () => {
  Cypress.config("baseUrl", `https://petstore.swagger.io/`);
  Cypress.config("APIURL", `https://petstore.swagger.io/v2`);
};
