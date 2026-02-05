import TableBody from "../components/table/TableBody.tsx";
import UserTableHeader from "../components/table/UserTableHeader.tsx";
import React, {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent.tsx";
import api from "../api/axios.ts";
import ErrorComponent from "../components/ErrorComponent.tsx";
import UserCard from "../components/table/UserCard.tsx";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import useAuth from "../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import MobileUserHeader from "../components/table/MobileUserHeader.tsx";
import handleError from "../utils/HandleError.js";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        async function getUsers() {
            if (!user?.isAdmin) {
                navigate("/");
                return;
            }

            setError([]);
            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/admin/users?page=' + page);
                setUsers(data.data);
                setPage(data['current_page']);
                setLastPage(data['last_page'])
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
            {/*<p className='m-4 font-bold'>No users found.</p>*/}
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