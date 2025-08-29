import { useState } from "react";
import { toaster } from "../../../design-system/toaster";
import { getAmortizationSchedule } from "../../../services/get-amortization-schedule";
import type { AmortizationScheduleData, FormValues } from "../types";

export const useAmortizationSchedule = () => {
    const [data, setData] = useState<AmortizationScheduleData | null>(null);
    const [loading, setLoading] = useState(false);

    const submitForm = async (values: FormValues & { primeRate: number }) => {
        setLoading(true);
        try {
            const result = await getAmortizationSchedule(
                values,
                values.primeRate
            );
            setData(result);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to fetch amortization schedule";

            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                duration: 4000,
            });

            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        submitForm,
    };
};
