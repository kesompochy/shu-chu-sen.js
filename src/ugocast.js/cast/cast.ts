interface iArgs {
  props?: string[];
}
const defaultArgs: iArgs = {
  props: [],
};

export default class Cast {
  props: { [K: string]: any };
  propKeys: Set<string>;
  action: (delta: number) => void = () => {};
  constructor(args: iArgs = {}) {
    const propKeys = args.props || defaultArgs.props!;
    this.propKeys = new Set(propKeys);
    this.props = {};
  }

  act(delta: number = 1): void {
    this.action(delta);
  }
}
