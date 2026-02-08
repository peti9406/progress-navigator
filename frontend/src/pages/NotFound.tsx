import ReturnHome from "../components/ui/ReturnHome";

export default function NotFound() {

    return (
        <div className='mt-8 px-8 py-4 bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 rounded-md shadow-md max-w-max mx-auto'>
            <h1 className='text-[var(--destructive)] text-3xl mb-4'>404 - This page can not be found</h1>
            <ReturnHome/>
        </div>
    )
}