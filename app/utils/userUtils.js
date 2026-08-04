import useFetch from "../hooks/useFetch";
import { showError, showInfo, showSuccess, showWarning } from "./showToasts";

export async function registerUser(register, setFieldState, router) {
    console.log("Request sent to backend: ", register);
    const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "register", register, false);
    const result = response.data;
    console.log("result ", result, response);
    if (!result.success) {
        const errors = result.object;
        if (errors != null) {
            setFieldState({
                name: {
                    message: errors?.name || "",
                    kind: errors?.name ? result.kind : "",
                },
                email: {
                    message: errors?.email || "",
                    kind: errors?.email ? result.kind : "",
                },
                phone: {
                    message: errors?.phone || "",
                    kind: errors?.phone ? result.kind : "",
                },
                password: {
                    message: errors?.password || "",
                    kind: errors?.password ? result.kind : "",
                },
            });
        }
        if (result.kind == "error") {
            showError(result.message);
        }
        else if (result.kind == "warning") {
            showWarning(result.message);
        }
        else if (result.kind == "info") {
            showInfo(result.message);
        }
    }
    else {
        showSuccess(result.message);
        localStorage.setItem("mode", "register");
        router.replace(`/verify/${result.object.token}`);
    }

}

export async function loginUser(login, setFieldState, initialize, router) {
    console.log("Request sent to backend: ", login);
    const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "login", login, true);
    const result = response.data;
    console.log("result ", result, response);
    if (!result.success) {
        const errors = result.object;
        if (errors != null) {
            setFieldState({
                name: {
                    message: errors?.name || "",
                    kind: errors?.name ? result.kind : "",
                },
                password: {
                    message: errors?.password || "",
                    kind: errors?.password ? result.kind : "",
                },
            });
        }

        if (result.kind == "error") {
            showError(result.message);
        }
        else if (result.kind == "warning") {
            showWarning(result.message);
        }
        else if (result.kind == "info") {
            showInfo(result.message);
            console.log("Info: ", result.message);
        }
    }
    else {
        if (result.kind == "info") {
            showSuccess(result.message);
            router.replace(`/verify/${result.object.token}`);
        }
        else {
            await initialize();
            showSuccess(result.message);
            router.replace("/bookstore");
        }
    }
}

export async function resetPassword(reset, setFieldState, router) {
    console.log("Request sent to backend: ", reset);
    const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "reset", reset, false);
    const result = response.data;
    console.log("result ", result, response);
    if (!result.success) {
        const errors = result.object;
        if (errors != null) {
            setFieldState({
                password: {
                    message: errors?.password || "",
                    kind: errors?.password ? result.kind : "",
                },
                cfnpassword: {
                    message: errors?.cfnpassword || "",
                    kind: errors?.cfnpassword ? result.kind : "",
                },
            });
        }

        if (result.kind == "error") {
            showError(result.message);
        }
        else if (result.kind == "warning") {
            showWarning(result.message);
        }
        else if (result.kind == "info") {
            showInfo(result.message);
            console.log("Info: ", result.message);
        }
    }
    else {
        showSuccess(result.message);
        router.replace("/user/login");
    }
}

export async function sendOTP(forgot, setFieldState, router) {
    console.log("Request sent to backend: ", forgot);
    const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "resendOTP", forgot, false);
    const result = response.data;
    console.log("result ", result, response);
    if (!result.success) {
        const errors = result.object;
        if (errors != null) {
            setFieldState({
                email: {
                    message: errors?.email || "",
                    kind: errors?.email ? result.kind : "",
                },
            });
        }
        if (result.kind == "error") {
            showError(result.message);
        }
        if (result.kind == "warning") {
            showWarning(result.message);
        }
        else if (result.kind == "info") {
            showInfo(result.message);
            console.log("Info: ", result.message);
        }
    }
    else {
        showSuccess(result.message);
        setTimeout(() => {
            localStorage.setItem("mode", "resetpassword");
            router.push(`/verify/${result.object.token}`);
        }, 1500)
    }
}

export async function verifyOTP(dtls, setDtls, mode, router, setUser) {
    console.log("Request sent to backend: ", dtls);
    const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "verifyOTP", dtls, false);
    const result = response.data;
    console.log("result ", result, response);
    if (!result.success) {
        setDtls((prev) => ({
            ...prev,
            otp: ""
        }))
        if (result.kind == "error") {
            showError(result.message);
        }
        else if (result.kind == "warning") {
            showWarning(result.message);
        }
        else if (result.kind == "info") {
            showInfo(result.message);
            console.log("Info: ", result.message);
        }
    }
    else {
        showSuccess(result.message);
        if (mode == "register") {
            router.replace("/user/login");
        }
        else {
            setUser(dtls);
            router.replace("/user/resetPassword");
        }
    }
}

export async function logout(router, resetContext) {
    const logoutResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "logout", "", true)
    const logoutResult = logoutResponse.data;
    if (logoutResult.success) {
        resetContext();
        router.replace("/");
        showSuccess(logoutResult.message);
    }
    else {
        showError("Error in logout");
    }
}