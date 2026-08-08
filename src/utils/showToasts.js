import toast from "react-hot-toast";
import { FcApproval, FcInfo } from "react-icons/fc";
import { TiWarning } from "react-icons/ti";

export function showSuccess(message) {
    toast(message, {
        icon: <FcApproval size={24} />
    })
}

export function showError(message) {
    toast.error(message);
}

export function showWarning(message) {
    toast(message, {
        icon: <TiWarning size={24} />,
    })
}

export function showInfo(message) {
    toast(message, {
        icon: <FcInfo size={24} />
    });
}


export function showToast(result) {
    switch (result.kind) {
        case "error":
            showError(result.message);
            break;

        case "warning":
            // showWarning(result.message);
            console.log(result.message);
            break;

        case "info":
            showInfo(result.message);
            break;

        default:
            showSuccess(result.message);
    }
}