import Button from "../ui/Button.jsx";
import loadingGif from "../../assets/loading.gif";

export default function Form({children, onSubmit, header, buttonText, loading}) {

    return (
        <form onSubmit={onSubmit} className='mt-8 px-8 py-4 bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 rounded-md shadow-md max-w-max mx-auto'>
            <h1 className="text-3xl">{header}</h1>
            <div className="flex flex-col items-center my-4">
                {children}
            </div>

            <Button type="submit" className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                {loading && <img src={loadingGif} alt='loading' className='inline w-6 mr-1'/>}
                {buttonText}
            </Button>
        </form>)
}