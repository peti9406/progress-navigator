interface LoadingComponentProps {
    size?: "sm" | "lg"
}

export default function LoadingComponent({size = "lg"} : LoadingComponentProps) {
    const smStyle = 'inline w-6 mr-1';
    const lgStyle = 'w-36 mx-auto';

    return <img src="/loading.gif" alt="Loading..." className={`${size === "lg" ? lgStyle : smStyle}`} />
}