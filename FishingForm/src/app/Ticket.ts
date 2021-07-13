export interface Ticket {
    id?: number,
    firstName: string,
    middleName: string,
    lastName: string,
    idCardNumber: Number,
    IdentificationNumber: Number,
    phoneNumber: Number,
    email: string,
    address: {
        country: string,
        area: string,
        municipality: string,
        city: string,
        street: string
    }
    ticket: {
        duration: string,
        type: string,
        price: number
    }
}