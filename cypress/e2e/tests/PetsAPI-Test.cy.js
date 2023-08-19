import Pets from "../api/Pets";
const pets = new Pets();
describe("Swagger Pets API Tests", () => {
  beforeEach(() => {
    pets.createPet();
  });

  it("Verify that user can retrive pets through swagger Api . ", () => {
    pets.getPets();
  });
  it("Verify that user can update pet's data through swagger Api . ", () => {
    pets.updatePet();
  });
  it("Verify that user can find pet with status'Availble' through swagger Api . ", () => {
    pets.findPetwithStatus();
  });
  it("Verify that user can update pet's info with photo through swagger Api .", () => {
    pets.updateWithPhoto();
  });
  it("Verify that user can delete pet through swagger Api .  ", () => {
    pets.deletePet();
  });
});
