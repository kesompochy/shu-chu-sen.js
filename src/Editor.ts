import { createCanvas, Image, Canvas, CanvasRenderingContext2D } from "canvas";
import GifEncoder from "gifencoder";

export default class Editor {
  image: Image;
  color: string;
  canvas: Canvas | undefined;
  ctx: CanvasRenderingContext2D | undefined;
  frameNumber: number = 3;
  constructor(image: Image, color: string) {
    this.color = color;

    this.image = image;
    this.createCanvas();
  }
  private createCanvas() {
    const width = this.image?.width;
    const height = this.image?.height;
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
  }

  generateGif(): Buffer | undefined {
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    if (!this.ctx) {
      return;
    }
    if (!this.image) {
      return;
    }

    const encoder = new GifEncoder(canvas.width, canvas.height);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1);
    encoder.setQuality(50);

    for (let i = 0; i < this.frameNumber; i++) {
      const ctx = this.generateFrameWithFocusLine();
      if (ctx) {
        encoder.addFrame(ctx as any);
      }
    }

    const gif = encoder.out.getData();

    return gif;
  }

  generateFrameWithFocusLine(): CanvasRenderingContext2D | undefined {
    const canvas = this.canvas;
    const ctx = this.ctx;
    if (!canvas || !ctx || !this.image) {
      return;
    }

    // 画像を描画
    ctx.drawImage(this.image, 0, 0);

    // 集中線の中心点（例として画像の中心を使用）
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 集中線の設定
    const lineCount = 70 + Math.random() * 20; // 三角形の数
    const lineColor = this.color; // 線（三角形）の色
    const maxRadius = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2;

    for (let i = 0; i < lineCount; i++) {
      const angle = 2 * Math.PI * Math.random(); // 三角形ごとの角度
      const nextAngle = angle + Math.PI * (0.005 + 0.01 * Math.random()); // 次の三角形の角度
      const angleAverage = (angle + nextAngle) / 2; // 三角形の中心点の角度
      const radius = maxRadius * (0.5 + 0.1 * Math.random()); // 三角形の中心点の半径
      const focusX = centerX + Math.cos(angleAverage) * (maxRadius - radius); // 三角形の中心点のX座標
      const focusY = centerY + Math.sin(angleAverage) * (maxRadius - radius); // 三角形の中心点のY座標

      // 三角形を描画
      ctx.beginPath();
      ctx.moveTo(focusX, focusY); // 中心点
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius); // 三角形の一つ目の頂点
      ctx.lineTo(centerX + Math.cos(nextAngle) * maxRadius, centerY + Math.sin(nextAngle) * maxRadius); // 三角形の次の頂点
      ctx.closePath(); // パスを閉じることで三角形が完成
      ctx.fillStyle = lineColor;
      ctx.fill(); // 三角形を塗りつぶし
    }

    return ctx;
  }
}
