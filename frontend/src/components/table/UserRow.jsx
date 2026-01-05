export default function UserRow({user}) {

    return (
        <div className='grid grid-cols-4 items-center w-full font-bold py-2 rounded-md'>
            <span>
                {user.name}
            </span>

            <span>
                {user.email}
            </span>

            <span>
                {user['created_at'].split('T')[0]}
            </span>

            <span>
                {user['goals_count']}
            </span>

        </div>)
}