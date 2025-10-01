

export abstract class PayloadUserTokenDto {

    constructor(
        readonly id: string, // Must be string because services parse id to number
        readonly email: string,
    ) {}
}