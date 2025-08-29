import type {
    PrimeRateApiResponse,
    PrimeRateData,
} from "../pages/amortization-calculator/types";
import { config } from "./config";

export async function getPrimeInterestRate(): Promise<PrimeRateData> {
    try {
        const res = await fetch(
            `${config.apiBaseUrl}/rates/prime-interest-rate`,
            {
                method: "GET",
            }
        );

        if (!res.ok) {
            const errorBody = await res.json().catch(() => null);
            throw new Error(
                errorBody?.message ||
                    `Failed to fetch prime rate: ${res.status} ${res.statusText}`
            );
        }

        const response: PrimeRateApiResponse = await res.json();

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
            "An unexpected error occurred while fetching prime interest rate"
        );
    }
}
