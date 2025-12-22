import Button from "../ui/Button.jsx";

export default function Form({children, onSubmit, header, buttonText}) {

    return (
        <form onSubmit={onSubmit} className='mt-8 px-8 py-4 bg-white/20 border-1 border-white/40 rounded-md shadow-md max-w-max mx-auto'>
            <h1 className="text-3xl">{header}</h1>
            <div className="flex flex-col items-center my-4">
                {children}
            </div>

            <Button type="submit" className='bg-blue-800 text-white hover:bg-blue-800/70'>
                {buttonText}
            </Button>
        </form>)
}