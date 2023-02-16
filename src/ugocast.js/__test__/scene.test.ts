import Scene from "../scene";

describe("Scene with no args", () => {
  const scene = new Scene();
  it("is scene", () => {
    expect(scene).toBeInstanceOf(Scene);
  });
  it("has children", () => {
    expect(scene.children).toBeInstanceOf(Set<Scene>);
  });
  it("has parent", () => {
    expect(scene).toHaveProperty("parent");
  });

  it("has properties" + scene.props, () => {
    console.log(scene.props);
    expect(scene.props).toBeInstanceOf(Array<String>);
  });

  describe("with parent", () => {
    const parent = new Scene();
    it("can be child of parent and can not be", () => {
      scene.beChildOf(parent);
      expect(parent.children).contain(scene);
      expect(scene.parent).toBe(parent);

      scene.beNotChildOf(parent);
      expect(parent.children.has(scene)).toBeFalsy();
      expect(scene.parent).toBeUndefined();
    });

    describe("Scene with props and parent", () => {
      const sceneWithProps = new Scene({
        props: ["a"],
      });

      it("has children", () => {});
    });
  });
});
