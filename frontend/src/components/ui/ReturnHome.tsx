import {Link} from "react-router-dom";

export default function ReturnHome() {
    return (
        <p>Click
            <Link className="text-[var(--primary)] hover:text-[var(--primary)]/70"
                  to='/'> here </Link>
            to return to the home page!</p>
    )
}