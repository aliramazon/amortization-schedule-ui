import type {
    AmortizationScheduleApiResponse,
    AmortizationScheduleData,
    FormValues,
} from "../pages/amortization-calculator/types";
import { config } from "./config";

export const getAmortizationSchedule = async (
    formData: FormValues,
    primeRate: number
): Promise<AmortizationScheduleData> => {
    try {
        const params = new URLSearchParams({
            loanAmount: formData.loanAmount,
            amortizationMonths: formData.amortizationMonths,
            termMonths: formData.termMonths,
            marginAbovePrime: formData.marginAbovePrime,
            primeRate: primeRate.toString(),
        });

        const res = await fetch(
            `${config.apiBaseUrl}/payment-schedule/amortization-schedule?${params}`
        );

        if (!res.ok) {
            const errorBody = await res.json().catch(() => null);
            throw new Error(
                errorBody?.error ||
                    `Failed to fetch amortization schedule: ${res.status} ${res.statusText}`
            );
        }

        const response: AmortizationScheduleApiResponse = await res.json();

        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || response.error);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(
            "An unexpected error occurred while fetching amortization schedule"
        );
    }
};
