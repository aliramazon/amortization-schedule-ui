export type FormValues = {
    loanAmount: string;
    amortizationMonths: string;
    termMonths: string;
    marginAbovePrime: string;
};

export interface PrimeRateData {
    primeRate: number;
    effectiveDate: string;
    lastUpdated: string;
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
