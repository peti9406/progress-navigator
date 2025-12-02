import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../api/axios.js";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();

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
                setStatus("Verification failed");
            }
        }

        verifyEmail();
    }, [searchParams]);

    return (
        <div>
            <h1 className='text-xl font-bold my-2'>{status}</h1>
            <p>Click
                <a className="hover:cursor-pointer text-blue-600 hover:text-blue-300"
                   onClick={() => navigate("/")}> here </a>
                to return to the home page!</p>
        </div>
    )
}