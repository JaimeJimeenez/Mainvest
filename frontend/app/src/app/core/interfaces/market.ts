export interface AssetRequest {
  initial_date: string;
  end_date: string;
  assets: string[];
}

export interface Asset {
  adj_close: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  date: string;
}

export interface AssetData {
  name: string;
  price: number;
  variation: number;
  volume: number;
}
