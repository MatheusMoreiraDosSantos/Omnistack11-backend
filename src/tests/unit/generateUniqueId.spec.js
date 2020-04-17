const generateUniqueId = require("../../utils/generateUniqueId");
describe("Generate Unique ID", () => {
  it("should generate an Unique Id", () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});
