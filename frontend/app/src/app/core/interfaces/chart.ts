export interface ChartAsset {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PredictedChart {
  value: number;
  time: string;
}
