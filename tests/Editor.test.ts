import Editor from "../src/Editor";
import { loadImage, Image, Canvas } from "canvas";

describe("Editor", () => {
  let editor: Editor;
  beforeAll(async () => {
    const path = __dirname + "/images/test1.png";
    const color = "black";
    const image = await loadImage(path);
    editor = new Editor(image, color);
  });
  /* describe("constructor", () => {
    it("should return an instance of Editor", () => {
      expect(editor).toBeInstanceOf(Editor);
    });
    it("should have an image property", () => {
      expect(editor.image).toBeInstanceOf(Image);
    });
    it("should have a color property", () => {
      expect(editor.color).toBe("black");
    });
    it("should have a canvas property", () => {
      expect(editor.canvas).toBeInstanceOf(Canvas);
    });
  });*/

  describe("generateGif", () => {
    it("should return a gif", () => {
      //const gif = editor.generateGif();
      //expect(gif).toBeInstanceOf(Buffer);
    });
  });
});
