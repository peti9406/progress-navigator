import axios from "axios";
import {BackendError} from "../types/BackendError";
import {MultipleBackendError} from "../types/MultipleBackendError";

function hasErrors(obj: unknown): obj is MultipleBackendError {
    return typeof obj === "object" && obj !== null && 'errors' in obj;
}

export default function handleError(error: unknown, onError: (errors: string[]) => void, defaultMessage: string = 'Something went wrong') {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as BackendError | MultipleBackendError | undefined;

        if (hasErrors(data)) {
            onError(Object.values(data.errors).flat());
        } else if (data && 'error' in data) {
            onError([data.error])
        } else {
            onError([defaultMessage])
        }
    } else if (error instanceof Error) {
        onError([error.message]);
    } else {
        onError([defaultMessage]);
    }
}