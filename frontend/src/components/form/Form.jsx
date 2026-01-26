import Button from "../ui/Button.jsx";
import loadingGif from "../../assets/loading.gif";

export default function Form({children, onSubmit, header, buttonText, loading}) {

    return (
        <form onSubmit={onSubmit} className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40
         mt-8 px-2 md:px-8 py-4 rounded-md shadow-md mx-auto
         w-full md:max-w-min'>
            {header && <h1 className="text-3xl">{header}</h1>}
            <div className="flex flex-col items-center my-4 w-full">
                {children}
            </div>

            <Button type="submit" className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                {loading && <img src={loadingGif} alt='loading' className='inline w-6 mr-1'/>}
                {buttonText}
            </Button>
        </form>)
}