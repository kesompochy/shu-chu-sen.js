import fs from "fs";
const { loadImage, Image } = require("canvas");
import Editor from "./Editor";

const main = async (sourceFilePath: string, outFilePath?: string, color?: string) => {
  color = color || "black";
  outFilePath = outFilePath || "output.gif";

  const image: typeof Image = await loadImage(sourceFilePath);

  const editor = new Editor(image, color!);
  const gif = editor.generateGif();
  if (gif) {
    fs.writeFileSync(outFilePath!, gif);
  }
};

const sourceFilePath = process.argv[2];
const outFilePath = process.argv[3];
const color = process.argv[4];

main(sourceFilePath, outFilePath, color);

export default main;
