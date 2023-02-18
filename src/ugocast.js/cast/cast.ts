import Scene from "../scene";

import { iArgs } from "../scene/scene";

interface iCastArgs extends iArgs {}

const defaultArgs: iCastArgs = {};

export default class Cast extends Scene {
  afterUpdate = this.act;
  constructor(args: iCastArgs = {}) {
    super(args);
  }
  act(): void {}
}
