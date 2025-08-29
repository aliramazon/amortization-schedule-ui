import {
    Button,
    Card,
    Field,
    Fieldset,
    HStack,
    Icon,
    Input,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { validators } from "../../../utils/validators";
import type { FormValues } from "../types";

type FormErrors = Partial<Record<keyof FormValues, string>>;

export const PageForm = () => {
    const [values, setValues] = useState<FormValues>({
        loanAmount: "",
        amortizationMonths: "",
        termMonths: "",
        marginAbovePrime: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const primeRate = 5.5;
    const effectiveRate =
        primeRate + (parseFloat(values.marginAbovePrime) || 0);

    const handleChange =
        (field: keyof FormValues) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log(`handleChange → ${field}: "${value}"`);

            const updatedForm = { ...values, [field]: value };
            setValues(updatedForm);

            const { error } = validators[field](value, updatedForm);
            setErrors((prev) => ({ ...prev, [field]: error }));
        };

    const handleCalculate = () => {
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
            });
        }
    };

    return (
        <>
            <Card.Root bg="gray.100" shadow="none" mb={6}>
                <Card.Body p={6}>
                    <HStack justify="space-between" align="center">
                        <HStack gap={3}>
                            <Icon color="blue.500">
                                <FaChartLine />
                            </Icon>
                            <Text
                                fontSize="lg"
                                fontWeight="semibold"
                                color="gray.700"
                            >
                                Current Prime Rate
                            </Text>
                        </HStack>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                            {primeRate.toFixed(2)}%
                        </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600" mt={2}>
                        Effective Rate: {effectiveRate.toFixed(2)}% (Prime +{" "}
                        {values.marginAbovePrime || "0"}% margin)
                    </Text>
                </Card.Body>
            </Card.Root>

            <Fieldset.Root size="lg">
                <Fieldset.Content>
                    <HStack gap={6} align="flex-start">
                        <Field.Root invalid={!!errors.loanAmount} flex="1">
                            <Field.Label color="gray.700" fontWeight="semibold">
                                Principal Loan Amount ($)
                            </Field.Label>
                            <Input
                                name="loanAmount"
                                type="number"
                                value={values.loanAmount}
                                onChange={handleChange("loanAmount")}
                                placeholder="Enter loan amount"
                                size="lg"
                            />
                            {errors.loanAmount && (
                                <Field.ErrorText>
                                    {errors.loanAmount}
                                </Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root
                            invalid={!!errors.amortizationMonths}
                            flex="1"
                        >
                            <Field.Label color="gray.700" fontWeight="semibold">
                                Amortization Months
                            </Field.Label>
                            <Input
                                name="amortizationMonths"
                                type="number"
                                value={values.amortizationMonths}
                                onChange={handleChange("amortizationMonths")}
                                placeholder="Enter amortization months"
                                size="lg"
                            />
                            {errors.amortizationMonths && (
                                <Field.ErrorText>
                                    {errors.amortizationMonths}
                                </Field.ErrorText>
                            )}
                        </Field.Root>
                    </HStack>

                    <HStack gap={6} align="flex-start">
                        <Field.Root invalid={!!errors.termMonths} flex="1">
                            <Field.Label color="gray.700" fontWeight="semibold">
                                Term (Months)
                            </Field.Label>
                            <Input
                                name="termMonths"
                                type="number"
                                value={values.termMonths}
                                onChange={handleChange("termMonths")}
                                placeholder="Enter term in months"
                                size="lg"
                            />
                            {errors.termMonths && (
                                <Field.ErrorText>
                                    {errors.termMonths}
                                </Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root
                            invalid={!!errors.marginAbovePrime}
                            flex="1"
                        >
                            <Field.Label color="gray.700" fontWeight="semibold">
                                Margin Above Prime (%)
                            </Field.Label>
                            <Input
                                name="marginAbovePrime"
                                type="number"
                                step="0.1"
                                value={values.marginAbovePrime}
                                onChange={handleChange("marginAbovePrime")}
                                placeholder="Enter margin percentage"
                                size="lg"
                            />
                            {errors.marginAbovePrime && (
                                <Field.ErrorText>
                                    {errors.marginAbovePrime}
                                </Field.ErrorText>
                            )}
                        </Field.Root>
                    </HStack>
                </Fieldset.Content>

                <HStack justify="flex-end" mt={6}>
                    <Button
                        onClick={handleCalculate}
                        size="lg"
                        colorPalette="blue"
                        fontWeight="semibold"
                        py={6}
                        fontSize="lg"
                    >
                        Calculate Amortization Schedule
                    </Button>
                </HStack>
            </Fieldset.Root>
        </>
    );
};
