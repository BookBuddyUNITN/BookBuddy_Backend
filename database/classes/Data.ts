export default class Data {
    anno: number;
    mese: number;
    giorno: number;
    ora: number;
    minuti: number;

    constructor(anno: number, mese: number, giorno: number, ora: number, minuti: number) {
        this.anno = anno;
        this.mese = mese;
        this.giorno = giorno;
        this.ora = ora;
        this.minuti = minuti;
    }
}