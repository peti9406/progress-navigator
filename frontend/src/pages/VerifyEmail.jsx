import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import api from "../api/axios.js";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        async function verifyEmail() {
            const id = searchParams.get("id");
            const hash = searchParams.get("hash");

            if (!id || !hash) {
                setStatus("Invalid verification link");
                return;
            }

            try {
                const {data} = await api.get(`/api/email/verify/${id}/${hash}`);
                setStatus(data.message);
            } catch (error) {
                setStatus(error.response?.data?.message || error.message);
            }
        }

        verifyEmail();
    }, [searchParams]);

    return (
        <div>
            <h1 className='text-xl font-bold my-2'>{status}</h1>
            <p>Click
                <Link className="text-blue-600 hover:text-blue-300"
                   to='/'> here </Link>
                to return to the home page!</p>
        </div>
    )
}