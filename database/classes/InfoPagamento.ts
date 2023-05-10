import {Data} from "./Data"

export default class InfoPagamento{
    metodoPagamento: string;
    dataUltimoPagamento: string;

    constructor(metodoPagamento:string, dataUltimoPagamento:Data) {
        this.metodoPagamento = metodoPagamento;
        this.dataUltimoPagamento = dataUltimoPagamento;
    }

    compraPremium(){
        // implementa funzionalità di pagamento
    }
}