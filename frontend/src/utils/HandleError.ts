import axios from "axios";
import {BackendErrorType} from "../types/BackendErrorType";
import {MultipleBackendErrorType} from "../types/MultipleBackendErrorType";

function hasErrors(obj: unknown): obj is MultipleBackendErrorType {
    return typeof obj === "object" && obj !== null && 'errors' in obj;
}

export default function handleError(error: unknown, onError: (errors: string[]) => void, defaultMessage: string = 'Something went wrong') {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as BackendErrorType | MultipleBackendErrorType | undefined;

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