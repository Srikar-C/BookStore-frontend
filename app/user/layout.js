import { UserContent } from "../utils/FunctionaliUtils";

export default function User({ children }) {
    return (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] w-[90%] lg:w-[80%] my-10 lg:my-auto mx-auto shadow-md shadow-[color:var(--foreground)] rounded-2xl">
            <UserContent />
            {children}
        </div>
    )
}