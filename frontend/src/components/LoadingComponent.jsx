import loadingGif from '../assets/loading.gif'

export default function LoadingComponent() {
    return <img src={loadingGif} alt="Loading..." className='w-36 mx-auto' />
}