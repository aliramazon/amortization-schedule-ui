import { useEffect, useState } from "react";
import { toaster } from "../../../design-system/toaster";
import { getPrimeInterestRate } from "../../../services/get-prime-interest-rate";
import { validators } from "../../../utils/validators";
import type { FormValues, PrimeRateData } from "../types";

type FormErrors = Partial<Record<keyof FormValues, string>>;

export const usePageForm = () => {
    const [values, setValues] = useState<FormValues>({
        loanAmount: "",
        amortizationMonths: "",
        termMonths: "",
        marginAbovePrime: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [primeRateData, setPrimeRateData] = useState<PrimeRateData | null>(
        null
    );
    const [primeRateLoading, setPrimeRateLoading] = useState(true);

    useEffect(() => {
        setPrimeRateLoading(true);
        getPrimeInterestRate()
            .then((data) => setPrimeRateData(data))
            .catch((error) => {
                console.error("Failed to fetch prime rate:", error);
                toaster.create({
                    title: "Failed to Load Prime Rate",
                    description:
                        "Could not fetch current prime rate. Using default rate.",
                    type: "error",
                    duration: 4000,
                });
                setPrimeRateData({ primeRate: 5.5 });
            })
            .finally(() => setPrimeRateLoading(false));
    }, []);

    const handleChange =
        (field: keyof FormValues) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const updatedForm = { ...values, [field]: value };
            setValues(updatedForm);

            const { error } = validators[field](value, updatedForm);
            setErrors((prev) => ({ ...prev, [field]: error }));
        };

    const calculate = () => {
        const newErrors: FormErrors = {};
        (Object.keys(values) as (keyof FormValues)[]).forEach((field) => {
            const { error } = validators[field](values[field], values);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Calculating with:", {
                loanAmount: parseFloat(values.loanAmount),
                amortizationMonths: parseInt(values.amortizationMonths),
                termMonths: parseInt(values.termMonths),
                marginAbovePrime: parseFloat(values.marginAbovePrime),
                primeRate: primeRateData?.primeRate || 5.5,
            });
        }
    };

    return {
        values,
        errors,
        primeRateData,
        primeRateLoading,
        handleChange,
        calculate,
    };
};
