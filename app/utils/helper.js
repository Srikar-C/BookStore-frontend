import { FaTruckMoving } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { ImHome } from "react-icons/im";

export function getDeliveryStatus(deliveryDate) {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    today.setHours(0, 0, 0, 0);
    delivery.setHours(0, 0, 0, 0);

    if (delivery > today) {
        return {
            text: "On the Way",
            icon: <FaTruckMoving className="text-xl text-blue-700" />
        }
    } else if (delivery.getTime() === today.getTime()) {
        return {
            text: "Deliver Today",
            icon: <ImHome className="text-xl text-orange-500" />
        }
    } else {
        return {
            text: "Order Delivered",
            icon: <FcShipped className="text-xl" />
        }
    }
}

export function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}


export function getDeliveryDate(setDate, orderedBooks) {
    const today = new Date();
    let daysToAdd;
    if (orderedBooks.length < 5) {
        daysToAdd = Math.floor(Math.random() * 3) + 3;
    } else {
        daysToAdd = Math.ceil(orderedBooks.length / 2);
    }
    today.setDate(today.getDate() + daysToAdd);
    setDate(today);
}