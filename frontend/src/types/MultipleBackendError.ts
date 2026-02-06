export type MultipleBackendError = {
    message: string;
    errors: {
        [key: string]: string[];
    }
}
