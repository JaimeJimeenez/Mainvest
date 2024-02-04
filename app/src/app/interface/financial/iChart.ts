import { Time } from "lightweight-charts"

export interface IChart {
  time : string,
  open : number,
  high : number,
  low : number,
  close : number
}

export interface IPredictedChart {
  value : number
  time : Time,
}
