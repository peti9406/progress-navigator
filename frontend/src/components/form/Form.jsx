import Button from "../ui/Button.jsx";

export default function Form({children, onSubmit, header, buttonText}) {

    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-3xl">{header}</h1>
            <div className="flex flex-col items-center my-4">
                {children}
            </div>

            <Button type="submit" className='bg-blue-800 text-white hover:bg-blue-800/70'>
                {buttonText}
            </Button>
        </form>)
}