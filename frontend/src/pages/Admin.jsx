import TableBody from "../components/table/TableBody.jsx";
import UserTableHeader from "../components/table/UserTableHeader.jsx";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent.jsx";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import UserRow from "../components/table/UserCard.jsx";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import useAuth from "../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import UserCard from "../components/table/UserCard.jsx";
import MobileUserHeader from "../components/table/MobileUserHeader.jsx";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        async function getUsers() {
            if (!user?.isAdmin) {
                navigate("/");
                return;
            }

            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/admin/users?page=' + page);
                setUsers(data.data);
                setPage(data['current_page']);
                setLastPage(data['last_page'])
            } catch (error) {
                setError(error?.response?.data?.message || error.message || 'Something went wrong.');
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

    return (<div className='my-8 text-sm md:text-base md:px-50 mx-auto max-w-full'>
        <UserTableHeader/>

        <TableBody>
            {loading ? <LoadingComponent/>
                : users.length > 0 ? (
                        users.map(user => (<div className='flex flex-row'>
                            <MobileUserHeader />
                            <UserCard key={user.id} user={user}/>
                        </div>
                        ))
                    ) :
                    <ErrorComponent message={error}/>
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