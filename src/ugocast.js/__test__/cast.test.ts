import Cast from "../cast";

describe("Cast", () => {
  const cast = new Cast();
  it("should be cast", () => {
    expect(cast).toBeInstanceOf(Cast);
  });
  it("can act", () => {
    expect(cast.act).toBeTypeOf("function");
  });
});

describe("extended Cast", () => {
  class MyCast extends Cast {
    x: number = 0;
    y: number = 0;
    act() {
      this.x += 1;
      this.y += -1;
    }
  }
  const cast = new MyCast();
  it("should act its actions when updated", () => {
    cast.update();
    expect(cast.x).toBe(1);
    expect(cast.y).toBe(-1);
  });
});
