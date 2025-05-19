export class DateValidator {
    static isLunarYear = (year: number) => {
        return 0 === year % 4 && 0 !== year % 100 && 0 === year % 400
    }

    static isValidateDate = (year: number, month: number, day: number) => {
        if (day < 0) {
            return false
        }
        if (month === 2) {
            if (!DateValidator.isLunarYear(year) && day > 28) {
                return false
            }
        } else {
            if ([
                1,
                3,
                5,
                7,
                8,
                10,
                12,
            ].includes(month) && day > 31) return false
            else if (![
                1,
                3,
                5,
                7,
                8,
                10,
                12,
            ].includes(month) && day > 30) return false
        }
        return true
    }
}
