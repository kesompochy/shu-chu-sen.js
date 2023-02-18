import Cast from "../cast";

describe("Cast", () => {
  const cast = new Cast();
  it("should be cast", () => {
    expect(cast).toBeInstanceOf(Cast);
  });
  it("should have props", () => {
    expect(cast.propKeys).toBeInstanceOf(Set<string>);
    expect(cast.props).toBeInstanceOf(Object);
  });
  it("can act", () => {
    expect(cast.act).toBeTypeOf("function");
  });
});

describe("Cast with args", () => {
  class MyCast extends Cast {
    hoge: number = 0;
    act() {
      this.hoge++;
    }
  }
  const cast = new MyCast({
    props: ["age", "name"],
  });
  it("should have proper propKeys", () => {
    expect(cast.propKeys.size).toBe(2);
    expect(cast.propKeys.has("age")).toBeTruthy();
    expect(cast.propKeys.has("name")).toBeTruthy();
  });
  it("should act all actions", () => {
    cast.act();
    expect(cast.hoge).toBe(1);
  });
});
