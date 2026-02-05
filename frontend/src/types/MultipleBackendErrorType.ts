export type MultipleBackendErrorType = {
    message: string;
    errors: {
        [key: string]: string[];
    }
}
