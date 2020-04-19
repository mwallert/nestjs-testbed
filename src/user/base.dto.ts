export class BaseDto {
    constructor(base, values) {
        this.pickValues(base, values);
    }

    pickValues(base, values) {
        console.log(base);
        for (let key in base) {
            base[key] = values[key];
        }

        return base;
    }
}