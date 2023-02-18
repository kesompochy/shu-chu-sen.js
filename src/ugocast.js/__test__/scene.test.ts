import Cast from "../cast";
import Scene from "../scene";

describe("Scene with no args", () => {
  const scene = new Scene();
  it("should be scene", () => {
    expect(scene).toBeInstanceOf(Scene);
  });
  it("should have casts", () => {
    expect(scene.casts).toBeInstanceOf(Set<Scene>);
  });
  it("should have notes", () => {
    expect(scene.notes).toBeInstanceOf(Object);
  });

  it("can update", () => {
    expect(typeof scene.update).toBe("function");
  });
  it("can start", () => {
    expect(typeof scene.start).toBe("function");
  });
  it("can stop", () => {
    expect(typeof scene.stop).toBe("function");
  });
});

describe("Scene with casts", () => {
  class MyCast extends Cast {
    name: string;
    action() {
      this.name = this.props.hoge;
    }
  }
  const cast = new MyCast({
    props: ["hoge", "fuga"],
  });
  const scene = new Scene({
    casts: [cast],
    notes: {
      hoge: "me",
      fuga: 30,
    },
    fps: 60,
  });

  it("should have children", () => {
    expect(scene.casts.has(cast)).toBeTruthy();
  });

  it("should have fps 60", () => {
    expect(scene.fps).toBe(60);
  });

  it("props should be accessed by note name", () => {
    expect(scene.notes.hoge).toBe("me");
  });

  describe("when it updated", () => {
    scene.update();
    it("cast should have updated prop", () => {
      expect(cast.props.hoge).toBe("me");
      expect(cast.props.fuga).toBe(30);
    });
  });

  describe("Scene timestamp", () => {
    const sceneProto = Object.getPrototypeOf(scene);
    it("should return 1 when elapsed time is 16ms", () => {
      expect(sceneProto.calcDelta(16.6, 0, 60)).toBeCloseTo(1);
    });
  });
});

describe("cast with loop", () => {
  const requestAnimationFrame = vi.spyOn(window, "requestAnimationFrame");
  const setTimeout = vi.spyOn(window, "setTimeout");
  class MyCast extends Cast {
    loop: 0;
    actions() {
      this.loop++;
    }
  }
  const cast = new MyCast();
  const scene = new Scene({
    cast: [cast],
  });

  it("should have ticking id", () => {
    scene.start();
    expect(scene.ticking).toBeDefined();
  });

  it("loop count should be more than 2 after 50ms", () => {
    scene.start();

    setTimeout(() => {
      expect(cast.loop).toBeGreaterThan(2);
    }, 50);
  });

  it("should stopped after it stopped", () => {
    scene.start();
    scene.stop();
    expect(scene.looping).toBe(false);
  });
});
