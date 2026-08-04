import { TbSum } from "react-icons/tb";

export default function PaymentPreview({ data }) {
    return (
        <>
            <div className="head grid grid-flow-col grid-cols-7 gap-1 *:font-semibold items-center text-center border-b-2 border-[color:var(--foreground)] py-1 px-3 uppercase">
                <span>Book</span>
                <span></span>
                <span>Price</span>
                <span></span>
                <span>Quantity</span>
                <span></span>
                <span>Subtotal</span>
            </div>

            <div className="body max-h-[300px] overflow-y-auto p-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-flow-col grid-cols-7 gap-3 items-center text-center border-b border-gray-300 hover:bg-[color:var(--orderhover)] dark:hover:bg-[color:var(--orderbg)] transition-colors"
                    >
                        <span className="py-2 text-left px-2 font-medium capitalize col-span-2">
                            {item.bookName}
                        </span>
                        <span>₹ {item.bookPrice}</span>
                        <span>×</span>
                        <span>{item.bookCount}</span>
                        <span>=</span>
                        <span className="font-semibold">
                            ₹ {item.bookPrice * item.bookCount}
                        </span>
                    </div>
                ))}
            </div>
            <div className="foot grid grid-flow-col grid-cols-7 text-start *:font-semibold border-t-2 border-[color:var(--foreground)] pt-3">
                <div className="heading col-span-3 col-start-2 flex items-center gap-0.5">
                    <TbSum className="text-xl" />
                    <p>Grand Total</p>
                </div>
                <span className="col-span-3">₹{" "}
                    {data.reduce(
                        (sum, item) =>
                            sum + item.bookPrice * item.bookCount,
                        0
                    )}
                </span>
            </div>
        </>
    )
}