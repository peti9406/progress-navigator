import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";
import ReturnHome from "../components/ui/ReturnHome.jsx";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function verifyEmail() {
            const id = searchParams.get("id");
            const hash = searchParams.get("hash");

            if (!id || !hash) {
                setError("Invalid verification link");
                return;
            }

            setLoading(true);
            try {
                await api.get(`/api/email/verify/${id}/${hash}`);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }

        verifyEmail();
    }, [searchParams]);

    return (
        <div
            className="mt-8 px-8 pt-2 pb-6 bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 rounded-lg shadow-md max-w-max mx-auto">
            {loading
                ? (<LoadingComponent/>)
                : (<>
                    {error
                        ? (<ErrorComponent message={error}/>)
                        : (<h1 className='text-xl font-bold my-2'>Email verification successful.</h1>)}
                    <ReturnHome/>
                </>)}
        < /div>)
}