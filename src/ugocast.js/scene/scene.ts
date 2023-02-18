import Cast from "../cast";

export interface iArgs {
  casts?: Array<Cast>;
  fps?: number;
  notes?: { [K: string]: any };
}

const defaultArgs: iArgs = {
  casts: [],
  fps: 60,
  notes: {},
};

export default class Scene {
  casts: Set<Cast> = new Set();
  notes: { [K: string]: any } = {};
  propsType: { [K: string]: Function } = {};
  fps: number;
  private _looping: boolean;
  private ticking: number;
  get looping() {
    return this._looping;
  }
  private previousTimeStamp: number = 0;
  afterUpdate: () => void = () => {};
  constructor(args: iArgs = {}) {
    const casts = args.casts || defaultArgs.casts!;
    casts.map((cast: Cast) => {
      this.casts.add(cast);
    });

    this.fps = args.fps || defaultArgs.fps!;

    const notes = args.notes || defaultArgs.notes!;
    this.notes = notes;
  }

  update(delta: number = 1): void {
    this.casts.forEach((cast: Cast) => {
      cast.propKeys.forEach((key) => {
        cast.props[key] = this.notes[key];
      });
      cast.act(delta);
    });
  }

  private loop(timestamp: number) {
    const delta = this.calcDelta(timestamp, this.previousTimeStamp, this.fps);
    this.update(delta);
    this.ticking = window.requestAnimationFrame(this.loop.bind(this));
  }

  private calcDelta(
    timestamp: number,
    previousTimeStamp: number,
    fps: number
  ): number {
    const MILLI_SEC = 1000;
    const elapsed = timestamp - previousTimeStamp;
    this.previousTimeStamp = timestamp;
    const delta = elapsed / (MILLI_SEC / fps);
    return delta;
  }

  start(): void {
    if (!this.looping) {
      this.ticking = window.requestAnimationFrame(this.loop.bind(this));
      this._looping = true;
    }
  }
  stop(): void {
    if (this.looping) {
      window.cancelAnimationFrame(this.ticking);
      this._looping = false;
    }
  }
}
