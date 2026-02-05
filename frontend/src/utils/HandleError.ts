import axios from "axios";

export default function handleError(error: unknown, onError: (errors: string[]) => void) {
    if (axios.isAxiosError<BackendErrorType>(error)) {
        onError(error.response?.data.errors
            ? Object.values(error.response.data.errors).flat()
            : ['Something went wrong']
        );
    } else if (error instanceof Error) {
        onError([error.message]);
    } else {
        onError(['Something went wrong']);
    }
}