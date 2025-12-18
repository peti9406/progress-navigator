import Button from "../Button.jsx";

export default function Form({children, onSubmit, header, buttonText}) {

    return (
        <form onSubmit={onSubmit}
        className='mt-6'>
            <h1 className="text-3xl">{header}</h1>
            <div className="flex flex-col items-center my-4">
                {children}
            </div>

            <Button type="submit">
                {buttonText}
            </Button>
        </form>)
}