import main from "../src/index";
import fs from "fs";

describe("e2e test", () => {
  describe("normal case", () => {
    it("should output gif", async () => {
      await main(__dirname + "/images/test1.png", __dirname + "/images/output.gif");
      const image = fs.readFileSync(__dirname + "/images/output.gif");
      expect(image).toBeInstanceOf(Buffer);
    });
  });

  afterAll(() => {
    fs.unlinkSync(__dirname + "/images/output.gif");
  });
});
