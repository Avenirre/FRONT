export class Language {
    id: number;
    nameLang: string;
    available: boolean;

    constructor(id, nameLang) {
        this.id = id;
        this.nameLang = nameLang;
        this.available = true;
    }
}
