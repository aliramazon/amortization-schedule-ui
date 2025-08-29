import { type FormValues } from "../pages/amortization-calculator/types";

export type ValidationResult = {
    isValid: boolean;
    error: string;
};

export const validateLoanAmount = (loanAmount: string): ValidationResult => {
    if (!loanAmount.trim()) {
        return { isValid: false, error: "Loan amount is required" };
    }

    const num = Number(loanAmount);
    if (num <= 0) {
        return { isValid: false, error: "Loan amount must be greater than 0" };
    }

    return { isValid: true, error: "" };
};

export const validateAmortizationMonths = (
    amortizationMonths: string
): ValidationResult => {
    if (!amortizationMonths.trim()) {
        return { isValid: false, error: "Amortization months are required" };
    }

    const num = Number(amortizationMonths);
    if (num <= 0) {
        return {
            isValid: false,
            error: "Amortization months must be greater than 0",
        };
    }

    return { isValid: true, error: "" };
};

export const validateTermMonths = (
    termMonths: string,
    form: FormValues
): ValidationResult => {
    if (!termMonths.trim()) {
        return { isValid: false, error: "Term is required" };
    }

    const termNum = Number(termMonths);
    if (termNum <= 0) {
        return { isValid: false, error: "Term must be greater than 0" };
    }

    const amortNum = Number(form.amortizationMonths);
    if (form.amortizationMonths && !isNaN(amortNum) && termNum >= amortNum) {
        return {
            isValid: false,
            error: "Term must be less than the amortization period",
        };
    }

    return { isValid: true, error: "" };
};

export const validateMarginAbovePrime = (
    marginAbovePrime: string
): ValidationResult => {
    if (!marginAbovePrime.trim()) {
        return { isValid: false, error: "Margin is required" };
    }

    const num = Number(marginAbovePrime);
    if (num < 0) {
        return { isValid: false, error: "Margin cannot be negative" };
    }

    return { isValid: true, error: "" };
};

export const validators: Record<
    keyof FormValues,
    (value: string, form: FormValues) => ValidationResult
> = {
    loanAmount: validateLoanAmount,
    amortizationMonths: validateAmortizationMonths,
    termMonths: validateTermMonths,
    marginAbovePrime: validateMarginAbovePrime,
};
