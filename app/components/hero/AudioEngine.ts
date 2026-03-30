export interface SmoothedValues {
  bass: number;
  mid: number;
  high: number;
  energy: number;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;
  private mediaEl: HTMLAudioElement | null = null;
  private mediaSource: MediaElementAudioSourceNode | null = null;

  private smoothBass = 0;
  private smoothMid  = 0;
  private smoothHigh = 0;

  async init(): Promise<void> {
    this.ctx = new AudioContext();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.connect(this.ctx.destination);

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;

    // Audio element — place stereo-love.mp3 in /public
    this.mediaEl = new Audio("/demo.mp3");
    this.mediaEl.loop = true;
    this.mediaEl.crossOrigin = "anonymous";

    this.mediaSource = this.ctx.createMediaElementSource(this.mediaEl);
    this.mediaSource.connect(this.analyser);
  }

  start(): void {
    if (!this.ctx || !this.mediaEl) return;
    this.ctx.resume();
    this.mediaEl.play().catch(() => {/* autoplay policy — user gesture required */});
  }

  stop(): void {
    this.mediaEl?.pause();
    this.ctx?.suspend();
  }

  getSmoothed(): SmoothedValues {
    if (!this.analyser || !this.dataArray) {
      return { bass: 0, mid: 0, high: 0, energy: 0 };
    }
    this.analyser.getByteFrequencyData(this.dataArray);
    const len = this.dataArray.length;
    let rawBass = 0, rawMid = 0, rawHigh = 0;
    let bc = 0, mc = 0, hc = 0;

    for (let i = 0; i < len; i++) {
      const freq = (i / len) * (this.ctx!.sampleRate / 2);
      const val  = this.dataArray[i] / 255;
      if (freq < 250)       { rawBass += val; bc++; }
      else if (freq < 4000) { rawMid  += val; mc++; }
      else                  { rawHigh += val; hc++; }
    }

    rawBass = bc > 0 ? rawBass / bc : 0;
    rawMid  = mc > 0 ? rawMid  / mc : 0;
    rawHigh = hc > 0 ? rawHigh / hc : 0;

    this.smoothBass = this.smoothBass * 0.75 + rawBass * 0.25;
    this.smoothMid  = this.smoothMid  * 0.80 + rawMid  * 0.20;
    this.smoothHigh = this.smoothHigh * 0.85 + rawHigh * 0.15;

    return {
      bass:   this.smoothBass,
      mid:    this.smoothMid,
      high:   this.smoothHigh,
      energy: this.smoothBass * 0.6 + this.smoothMid * 0.3 + this.smoothHigh * 0.1,
    };
  }

  getFFT(): Uint8Array<ArrayBuffer> {
    if (!this.analyser || !this.dataArray) return new Uint8Array(256) as Uint8Array<ArrayBuffer>;
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
}
