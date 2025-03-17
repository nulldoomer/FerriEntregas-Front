export interface DelieveryStatus {
    id?: string;
    name: string;
    }
    export interface DelieveryStatusResult {    
        result: DelieveryStatus;
        errors?: string;
        code: number;
        success: boolean;
    }
    export interface DelieveryStatusResults {
        result: [DelieveryStatus];
        errors?: string;
        code: number;
        success: boolean;
    }
     