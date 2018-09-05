export class Education {
    id: string;
    institution: string;
    yearEnd: number;
    degree: string;
    location: string;
    note: string;

    constructor (id, institution, year_end, degree, location, note) {
        this.id = id;
        this.institution = institution;
        this.yearEnd = year_end;
        this.degree = degree;
        this.location = location;
        this.note = note;
    }
}
