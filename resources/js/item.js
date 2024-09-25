export default class Item {
    constructor(nom, qte, format) {
        this.nom = nom;
        this.qte = qte;
        this.format = format;
    }

    addQte() {
        this.qte = this.qte + 1
    }
}
