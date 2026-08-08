import { showError, showToast } from "@/utils/showToasts";
import { login, logout, register, reset, sendOTP, userToken, verify } from "@/utils/userUtils";

export async function loginUser(request, setFieldState) {
    try {
        const response = await login(request);
        const result = response?.data;
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
        }
        return result;
    } catch (error) {
        console.log("Error ", error);
        return {
            success: false,
            message: "Unable to login. Please try again.",
            kind: "error",
            object: null,
        };
    }
}

export async function registerUser(request, setFieldState) {
    try {
        const response = await register(request);
        const result = response?.data;
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
        }
        return result;
    } catch (error) {
        console.log("Error ", error);
    }
}

export async function getUserFromToken(token, setDtls) {
    try {
        const response = await userToken(token);
        const result = response?.data;
        console.log(result);
        if (!result.success) {
            showError(result.message);
        }
        else {
            setDtls((prev) => ({
                ...prev,
                email: result.object.email,
            }))
        }
    } catch (error) {
        console.log("Error ", error);
    }
}


export async function resendOTP(request, setFieldState) {
    try {
        const response = await sendOTP(request);
        const result = response?.data;
        const errors = result.object;
        if (!result.success) {
            if (errors != null) {
                setFieldState({
                    email: {
                        message: errors?.email || "",
                        kind: errors?.email ? result.kind : "",
                    },
                });
            }
        }
        return result;
    } catch (error) {
        console.log("Error ", error);
    }
}

export async function resetPassword(request, setFieldState) {
    try {
        const response = await reset(request);
        const result = response?.data;
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
        }
        return result;
    } catch (error) {
        console.log("Error ", error);
    }
}

export async function verifyOTP(request) {
    try {
        const response = await verify(request);
        const result = response?.data;
        return result;
    } catch (error) {
        console.log("Error ", error);
    }
}


export async function userLogout() {
    try {
        const response = await logout();
        const result = response.data;
        return result;
    } catch (error) {
        console.log("Error ", error);
    }
}