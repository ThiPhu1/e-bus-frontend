import { setCookie, destroyCookie, parseCookies } from "nookies";

export function setCookies(name, value, lifespan) {
    setCookie(null, name, value, {
        maxAge: (lifespan || 15) * 60,
        httpOnly: true,
    })
}

export function setCookiesSV(ctx, name, value, lifespan) {
    setCookie(ctx, name, value, {
        maxAge: (lifespan || 15) * 60,
        httpOnly: true,
    })
}


export function destroyCookies(name) {
    destroyCookie("null", name)
}