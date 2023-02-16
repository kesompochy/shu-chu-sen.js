interface Arg {
  props?: string[];
}

export default class Scene {
  children: Set<Scene> = new Set();
  parent: Scene | undefined;
  props: string[] = [];
  constructor(args: Arg = {}) {
    const { props } = args;
    this.props = props || [];
  }

  beChildOf(parent: Scene) {
    this.parent = parent;
    parent.children.add(this);
  }
  beNotChildOf(parent: Scene) {
    if (this.parent == parent) {
      this.parent = undefined;
      parent.children.delete(this);
    }
  }
}
