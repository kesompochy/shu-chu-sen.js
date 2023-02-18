interface iProps {
  [K: string]: Function;
}

export interface iArgs {
  children?: Array<Scene>;
  fps?: number;
  props?: iProps;
}

const defaultArgs: iArgs = {
  children: [],
  fps: 60,
  props: {},
};

export default class Scene {
  children: Set<Scene> = new Set();
  parent: Scene | undefined;
  private props: { [K: string]: any } = {};
  fps: number;
  [key: string]: any;
  afterUpdate: () => void = () => {};
  constructor(args: iArgs = {}) {
    const children = args.children || defaultArgs.children!;
    children.map((scene: Scene) => {
      this.children.add(scene);
    });

    this.fps = args.fps || defaultArgs.fps!;

    const props = args.props || defaultArgs.props!;

    for (const key of Object.keys(props)) {
      this.props[key] = props[key];
      Object.defineProperty(this, key, {
        get: function () {
          return this.props[key];
        },
        configurable: true,
      });
    }
  }

  update(): void {
    this.children.forEach((child: Scene) => {
      child.updateSelfProps(this);
      child.update();
    });
    this.afterUpdate();
  }

  updateSelfProps(sourceParent: Scene): void {
    for (const key of Object.keys(this.props)) {
      this.props[key] = sourceParent[key];
    }
  }
  start(): void {}
  stop(): void {}
}
