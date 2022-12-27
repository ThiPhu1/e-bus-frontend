import { setCookie, destroyCookie, parseCookies } from "nookies";

export function setCookies(name, value) {
    setCookie(null, name, value, {
        maxAge: 24 * 60 * 60,
    })
}

export function destroyCookies(name) {
    destroyCookie("null", name)
}