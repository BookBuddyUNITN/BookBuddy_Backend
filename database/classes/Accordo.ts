const stato_states = { 
    pending: "pending",
    accepted: "accepted",
    rejected: "rejected"
}

export default class Accordo {
    userID_1: string;
    userID_2: string;
    data: Date;
    libro: string;
    libri_proposti: string[];
    libro_scelto: string;
    stato: string;
    constructor(userID_1: string, userID_2: string, data: Date, libro: string) {
        this.userID_1 = userID_1;
        this.userID_2 = userID_2;
        this.data = data;
        this.libro = libro;
        this.libri_proposti = [];
        this.libro_scelto = "";
        this.stato = stato_states.pending;
    }
    setLibroScelto(libro: number) {
        if(libro < this.libri_proposti.length)
            this.libro_scelto = this.libri_proposti[libro];
        else
            throw new Error("Libro non presente nella lista dei libri proposti");
    }
    setStato(stato: string) {
        if(stato == stato_states.pending || stato == stato_states.accepted || stato == stato_states.rejected)
            this.stato = stato;
        else
            throw new Error("Stato non valido");
    }
    setLibriProposti(libri_proposti: string[]) {
        this.libri_proposti = libri_proposti;
    }
}