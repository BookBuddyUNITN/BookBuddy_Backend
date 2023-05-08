

export default class Libro {
    titulo : string;
    autor : string;
    editorial : string;
    constructor(titulo : string, autor : string, editorial : string) {
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial;
    }
    toString() {
        return `${this.titulo} ${this.autor} ${this.editorial}`;
    }
}

