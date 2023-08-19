import Stores from "../api/Stores";
const stores = new Stores();
describe("Swagger store API Tests", () => {
  beforeEach(() => {
    stores.createOrder();
  });
  it("Verify that user can get Inventory through swagger Api .  ", () => {
    stores.getStoreInventory();
  });

  it("Verify that user can get order through swagger Api . ", () => {
    stores.getOrder();
  });
  it("Verify that user can delete order through swagger Api . ", () => {
    stores.deleteOrder();
  });
});
