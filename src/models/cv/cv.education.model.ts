export class Education {
    id: string;
    institution: string;
    year_end: number;
    degree: string;
    location: string;
    note: string;

    constructor (id, institution, year_end, degree, location, note) {
        this.id = id;
        this.institution = institution;
        this.year_end = year_end;
        this.degree = degree;
        this.location = location;
        this.note = note;
    }
}
