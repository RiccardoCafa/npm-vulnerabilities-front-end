
export interface npmStatus {
    id: string | null;
    application: string | null;
    result: any | null;
    status: string;
}

export interface npmHistory {
    id: string | null;
    application: string | null;
    result: any | null;
    totalVulnerability: number;
    status: string;
}