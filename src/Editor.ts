import { createCanvas, Image, Canvas, CanvasRenderingContext2D } from "canvas";
import GifEncoder from "gifencoder";

export default class Editor {
  image: Image;
  color: string;
  canvas: Canvas | undefined;
  ctx: CanvasRenderingContext2D | undefined;
  frameNumber: number;
  sizeRatio: number;
  constructor(image: Image, color: string, frameNumber: number, sizeRatio: number) {
    this.color = color;

    this.image = image;
    this.frameNumber = frameNumber;
    this.sizeRatio = sizeRatio;

    this.createCanvas();
  }
  private createCanvas() {
    const width = this.image?.width * this.sizeRatio;
    const height = this.image?.height * this.sizeRatio;
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
    encoder.setDelay(33);
    encoder.setQuality(10);

    for (let i = 0; i < this.frameNumber; i++) {
      const ctx = this.generateFrameWithFocusLine(i);
      if (ctx) {
        encoder.addFrame(ctx as any);
      }
    }

    const gif = encoder.out.getData();

    return gif;
  }

  generateFrameWithFocusLine(i: number): CanvasRenderingContext2D | undefined {
    const canvas = this.canvas;
    const ctx = this.ctx;
    if (!canvas || !ctx || !this.image) {
      return;
    }

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // スケールを計算（周期的に変化）
    const scale = 1 + 0.1 * Math.sin(i * Math.PI / this.frameNumber);

    // 画像の中心位置を計算
    const imageCenterX = canvas.width / 2;
    const imageCenterY = canvas.height / 2;

    // 画像の描画開始位置を計算
    const drawX = imageCenterX - (this.image.width * scale * this.sizeRatio) / 2;
    const drawY = imageCenterY - (this.image.height * scale * this.sizeRatio) / 2;

    // 画像をスケーリングして描画
    ctx.drawImage(this.image, drawX, drawY, this.image.width * scale * this.sizeRatio, this.image.height * scale * this.sizeRatio);

    // フィルター効果を適用する色を計算（ここでは例として赤色を強調）
    const r = Math.floor(100 + 155 * Math.abs(Math.sin(i * 0.7 * Math.PI / this.frameNumber)));
    const color = `rgba(${r}, 100, 100, 0.3)`; // 赤色を半透明で重ねる

    // ブレンドモードを設定
    ctx.globalCompositeOperation = 'source-atop';

    // 色をキャンバス全体に適用
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ブレンドモードをデフォルトに戻す
    ctx.globalCompositeOperation = 'source-over';

    // 集中線の中心点（例として画像の中心を使用）
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 集中線の設定
    const lineCount = 140 + Math.random() * 20; // 三角形の数
    const lineColor = this.color; // 線（三角形）の色
    const maxRadius = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2;

    for (let i = 0; i < lineCount; i++) {
      const angle = 2 * Math.PI * Math.random(); // 三角形ごとの角度
      const nextAngle = angle + Math.PI * (0.005 + 0.001 * Math.random()); // 次の三角形の角度
      const angleAverage = (angle + nextAngle) / 2; // 三角形の中心点の角度
      const radius = maxRadius * (0.3 + 0.2 * Math.random()); // 三角形の中心点の半径
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
