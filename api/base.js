import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_URI;

const axiosClient = axios.create({
    baseURL: host,
});

export function baseGet({ endpoint, header }) {
    return axiosClient.get(endpoint, header)
}

export function basePost({ endpoint, header, body }) {
    return axiosClient.post(endpoint, body, header)
}

export function basePatch({ endpoint, header, body }) {
    return axiosClient.patch(endpoint, header, body)
}

export function baseDelete({ endpoint, header }) {
    return axiosClient.delete(endpoint, header)
}

