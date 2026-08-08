import useFetch from "@/hooks/useFetch";

export async function userExist() {
    return await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "auth", "", true);
}

export async function login(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "login", request, true);
}

export async function register(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "register", request, false);
}

export async function userToken(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "verifyToken", request, false);
}

export async function sendOTP(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "resendOTP", request, false);
}

export async function reset(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "reset", request, false);
}

export async function verify(request) {
    return await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "verifyOTP", request, false);
}

export async function logout() {
    return await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "logout", "", true);
}