export class Template {
    type: number;
    colorScheme: number;
    id: number;

    constructor (id, type, color_scheme) {
        this.id = id;
        this.type = type;
        this.colorScheme = color_scheme;
    }
}
