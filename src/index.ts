import fs from "fs";
const { loadImage, Image } = require("canvas");
import Editor from "./Editor";

const main = async (sourceFilePath: string, outFilePath?: string, color?: string, frameNumber?: number, sizeRatio?: number, rotation: boolean = true) => {
  color = color || "black";
  outFilePath = outFilePath || "output.gif";
  frameNumber = frameNumber || 12;
  sizeRatio = sizeRatio || 0.25;
  const rotationSpeed = rotation ? 1/frameNumber : 0;
  const image: typeof Image = await loadImage(sourceFilePath);

  const editor = new Editor(image, color!, frameNumber!, sizeRatio, rotationSpeed);
  const gif = editor.generateGif();
  if (gif) {
    fs.writeFileSync(outFilePath!, gif);
    console.log(`Gif saved to ${outFilePath}!`);
  }
};

const sourceFilePath = process.argv[2];
const outFilePath = process.argv[3];
const color = process.argv[4];

main(sourceFilePath, outFilePath, color);

export default main;
