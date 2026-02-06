import type {User} from "../../types/User";

interface UserCardProps {
    user: User
}

export default function UserCard({user}: UserCardProps) {

    return (
        <div className='flex flex-col gap-1 border-b-1 md:grid md:grid-cols-4 items-center w-full font-bold py-2'>
            <span className='truncate'>
                {user.name}
            </span>

            <span className='truncate'>
                {user.email}
            </span>

            <span className='truncate'>
                {user['created_at'].split('T')[0]}
            </span>

            <span className='truncate'>
                {user['goals_count']}
            </span>

        </div>)
}