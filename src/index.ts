import fs from "fs";
const { loadImage, Image } = require("canvas");
import { Command } from "commander";
import Editor from "./Editor";

const command = new Command();

command
  .name("shu-chu-sen.js")
  .argument("<sourceFilePath>", "source file path")
  .option("-o, --out <path>", "output file path", "output.gif")
  .option("-c, --color <color>", "color", "black")
  .option("-f, --frame <number>", "frame number", "12")
  .option("-s, --sizeRatio <number>", "size ratio", "0.25")
  .option("--background-color <color>", "background color")
  .option("-r, --rotation", "enable rotation", false)
  .option("-p, --pulse", "enable pulse", false)
  .option("--color-fade", "enable color fade", false);

interface Options {
  out: string;
  color: string;
  frame: number;
  sizeRatio: number;
  rotation: boolean;
  pulse: boolean;
  colorFade: boolean;
  backgroundColor?: string;
}

const main = async (sourceFilePath: string, options: Options) => {
  const { out, color, frame, sizeRatio, rotation, pulse, colorFade, backgroundColor } = options;
  const rotationSpeed = rotation ? 1/frame : 0;
  const image: typeof Image = await loadImage(sourceFilePath);

  const editor = new Editor(image, color!, frame, sizeRatio, rotationSpeed, pulse, colorFade, backgroundColor);
  const gif = editor.generateGif();
  if (gif) {
    fs.writeFileSync(out, gif);
    console.log(`Gif saved to ${out}!`);
  }
};

command.parse();
const options = command.opts() as Options;

main(command.args[0], options);

export default main;
