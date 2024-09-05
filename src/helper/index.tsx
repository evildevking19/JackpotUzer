import dayjs from "dayjs"

export function convertDayObjToDateString(obj: dayjs.Dayjs | null) {
    if (obj === null) return '01/01/2000'
    let dateObj = obj.toDate()
    let y = dateObj.getFullYear()
    let m = dateObj.getMonth()+1 < 10 ? '0'+(dateObj.getMonth()+1) : dateObj.getMonth()+1
    let d = dateObj.getDate() < 10 ? '0'+dateObj.getDate() : dateObj.getDate()
    return y + '-' + m + '-' + d
}

export function convertDayObjToTimeString(obj: dayjs.Dayjs | null) {
    if (obj === null) return '2000-01-01T00:00'
    let dateObj = obj.toDate()
    let h = dateObj.getHours() < 10 ? '0'+dateObj.getHours() : dateObj.getHours()
    let m = dateObj.getMinutes() < 10 ? '0'+dateObj.getMinutes() : dateObj.getMinutes()
    return '2000-01-01T' + h + ':' + m
}

export function getTodayPt() {
    const today = new Date()
    let y = today.getFullYear()
    let m = today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : today.getMonth()+1
    let d = today.getDate() < 10 ? '0'+today.getDate() : today.getDate()
    return d + "/" + m + "/" + y
}

export function getFormattedCurrencyString(value: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: "currency",
        currency: "BRL"
    })
    return formatter.format(value)
}