export interface IAlert {
  id : number,
  username : string,
  id_transmitter : 0,
  message : string,
  read : boolean,
  liked : boolean
}

export interface IAlertPrice {
  id : number,
  id_user : number,
  asset : string,
  price : number,
  reached : boolean
}
