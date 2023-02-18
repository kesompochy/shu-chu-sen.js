import Scene from "../scene";

describe("Scene with no args", () => {
  const scene = new Scene();
  it("is scene", () => {
    expect(scene).toBeInstanceOf(Scene);
  });
  it("has children", () => {
    expect(scene.children).toBeInstanceOf(Set<Scene>);
  });

  it("can update", () => {
    expect(scene.update).toBeDefined();
  });
  it("can start", () => {
    expect(scene.start).toBeDefined();
  });
  it("can stop", () => {
    expect(scene.stop).toBeDefined;
  });
  it("should execute afterUpdateAction after it updates", () => {
    let a = 0;
    scene.afterUpdate = () => {
      a += 1;
    };
    scene.update();
    expect(a).toBe(1);
  });
});

describe("Scene with args", () => {
  const child = new Scene({
    props: {
      name: String,
      age: Number,
    },
  });
  const scene = new Scene({
    children: [child],
    fps: 60,
  });
  scene.age = 30;
  scene.name = "myname";

  it("should have children", () => {
    expect(scene.children.has(child)).toBeTruthy();
  });

  it("should have fps 60", () => {
    expect(scene.fps).toBe(60);
  });

  it("props should be accessed by props name", () => {
    expect(child.name).toBeDefined();
  });

  describe("when it updated", () => {
    scene.update();
    it("child should have updated prop", () => {
      expect(child.name).toBe("myname");
      expect(child.age).toBe(30);
    });
  });
});
