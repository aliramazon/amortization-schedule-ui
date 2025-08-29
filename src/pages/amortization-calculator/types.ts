export type FormValues = {
    loanAmount: string;
    amortizationMonths: string;
    termMonths: string;
    marginAbovePrime: string;
};

export interface PrimeRateData {
    primeRate: number;
    effectiveDate?: string;
    lastUpdated?: string;
}

export interface PrimeRateResponse {
    success: true;
    data: PrimeRateData;
    message: string;
}

export interface PrimeRateErrorResponse {
    success: false;
    error: string;
    message: string;
}

export type PrimeRateApiResponse = PrimeRateResponse | PrimeRateErrorResponse;

export type ScheduleEntry = {
    month: number;
    date: string;
    startingBalance: number;
    interestPayment: number;
    principalPayment: number;
    endingBalance: number;
};

export type AmortizationScheduleData = {
    schedule: ScheduleEntry[];
    totalInterest: number;
    totalPrincipal: number;
    totalPayments: number;
};
export type AmortizationScheduleApiResponse = {
    success: boolean;
    data: AmortizationScheduleData;
    error?: string;
    message?: string;
};
