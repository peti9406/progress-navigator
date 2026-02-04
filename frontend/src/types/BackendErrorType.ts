interface BackendErrorType {
    message: string;
    errors: {
        [key: string]: string[];
    };
}