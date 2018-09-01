export class Experience {
    public position: string;
    public years: number;

    constructor (position: string, years?: number) {
        this.position = position;
        this.years = years;
    }
}
