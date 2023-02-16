import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_URI;

const axiosClient = axios.create({
    baseURL: host,
});

export function baseGet({ endpoint, headers }) {
    return axiosClient.get(endpoint, { headers })
}

export function basePost({ endpoint, headers, body }) {
    return axiosClient.post(endpoint, body, { headers })
}

export function basePut({ endpoint, headers, body }) {
    return axiosClient.put(endpoint, body, {headers})
}

export function baseDelete({ endpoint, headers }) {
    return axiosClient.delete(endpoint, {headers})
}

