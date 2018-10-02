export class Education {
    id: number;
    institution: string;
    yearEnd: number;
    degree: string;
    note: string;

    constructor (id, institution, year_end, degree, note) {
        this.id = id;
        this.institution = institution;
        this.yearEnd = year_end;
        this.degree = degree;
        this.note = note;
    }
}
