import TableBody from "../components/table/TableBody";
import UserTableHeader from "../components/table/UserTableHeader";
import React, {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";
import api from "../api/axios";
import ErrorComponent from "../components/ErrorComponent";
import UserCard from "../components/table/UserCard";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import MobileUserHeader from "../components/table/MobileUserHeader";
import handleError from "../utils/HandleError";
import {User} from "../types/User";
import {UsersResponseSchema} from "../types/responses/UsersResponse";

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();
    const {user, token} = useAuth();

    useEffect(() => {
        async function getUsers() {
            if (!user?.is_admin) {
                navigate("/");
                return;
            }

            setError([]);
            setLoading(true);
            try {
                const {data} = await api.get('/api/admin/users?page=' + page, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const parsed = UsersResponseSchema.safeParse(data);

                if (parsed.success) {
                    setUsers(data.data);
                    setPage(parsed.data.current_page);
                    setLastPage(parsed.data.last_page);
                } else {
                    setError(['Something went wrong']);
                }
            } catch (error) {
                handleError(error, setError);
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, [page, user, navigate]);

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        setPage(page - 1);
    }

    function toLastPage() {
        setPage(lastPage)
    }

    function toFirstPage() {
        setPage(1);
    }

    return (<div className='my-8 text-sm md:text-base md:px-[clamp(4rem,10vw,16rem)] mx-auto max-w-full'>
        <UserTableHeader/>

        <TableBody>
            {error.length > 0 && <ErrorComponent messages={error}/>}

            {error.length === 0 && loading && <LoadingComponent/>}

            {error.length === 0 && !loading && users.length > 0 && (
                users.map(user => (
                    <div className='flex flex-row' key={user.id}>
                        <MobileUserHeader/>
                        <UserCard user={user}/>
                    </div>
                )))
            }
        </TableBody>

        <div className='flex justify-center space-x-2 m-4'>
            <ChevronsLeft className={`cursor-pointer ${page === 1 ? 'invisible' : ''}`} onClick={toFirstPage}/>
            <ChevronLeft className={`cursor-pointer ${page === 1 ? 'invisible' : ''}`} onClick={prevPage}/>

            <p className='font-bold'>Page {page} / {lastPage} </p>

            <ChevronRight className={`cursor-pointer ${page === lastPage ? 'invisible' : ''}`} onClick={nextPage}/>
            <ChevronsRight className={`cursor-pointer ${page === lastPage ? 'invisible' : ''}`} onClick={toLastPage}/>
        </div>
    </div>)
}