export interface ITipoCard {
  id?: number;
  nombreTipo?: string;
}

export class TipoCard implements ITipoCard {
  constructor(public id?: number, public nombreTipo?: string) {}
}
