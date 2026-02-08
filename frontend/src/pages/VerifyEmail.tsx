import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import api from "../api/axios";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import ReturnHome from "../components/ui/ReturnHome";
import handleError from "../utils/HandleError";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function verifyEmail() {
            const id = searchParams.get("id");
            const hash = searchParams.get("hash");

            if (!id || !hash) {
                setError(["Invalid verification link"]);
                return;
            }

            setLoading(true);
            try {
                await api.get(`/api/email/verify/${id}/${hash}`);
            } catch (error) {
                handleError(error, setError);
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
                        ? (<ErrorComponent messages={error}/>)
                        : (<h1 className='text-xl font-bold my-2'>Email verification successful.</h1>)}
                    <ReturnHome/>
                </>)}
        </div>)
}