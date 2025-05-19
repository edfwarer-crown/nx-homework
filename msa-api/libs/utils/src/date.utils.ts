import {DateTimeFormatter, nativeJs, ZonedDateTime, ZoneId} from "@js-joda/core"
import "@js-joda/timezone"

export class DateUtils {
    static format(date: Date, pattern: string) {
        return nativeJs(date, ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern(pattern))
    }

    static isBetween(target: ZonedDateTime, start: ZonedDateTime | null, end: ZonedDateTime | null, inclusive: boolean = false): boolean {
        if (start === null && end === null) return true
        if (start === null) return inclusive ? target.equals(end!) || target.isBefore(end!) : target.isBefore(end!)
        if (end === null) return inclusive ? target.equals(start) || target.isAfter(start) : target.isAfter(start)

        if (inclusive) {
            return (target.isAfter(start) || target.equals(start)) && (target.isBefore(end) || target.equals(end))
        }
        return target.isAfter(start) && target.isBefore(end)
    }
}
