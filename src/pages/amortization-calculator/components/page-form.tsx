import { Button, Card, Field, Fieldset, HStack, Input } from "@chakra-ui/react";
import { usePageForm } from "../hooks/use-page-form";
import type { FormValues } from "../types";
import { PageFormBanner } from "./page-form-banner";

export const PageForm = ({
    onSubmit,
    loading,
}: {
    onSubmit: (values: FormValues & { primeRate: number }) => void;
    loading: boolean;
}) => {
    const {
        values,
        errors,
        primeRateData,
        primeRateLoading,
        handleChange,
        handleBlur,
        validate,
    } = usePageForm();

    const handleSubmit = () => {
        const result = validate();
        if (!result.submittable || !primeRateData || !result.formData) return;

        onSubmit({
            ...result.formData,
            primeRate: primeRateData?.primeRate,
        });
    };

    return (
        <Card.Root shadow="sm" mt={6}>
            <Card.Body p={6}>
                <PageFormBanner
                    marginAbovePrime={values.marginAbovePrime}
                    primeInterestRate={primeRateData?.primeRate}
                    primeRateLoading={primeRateLoading}
                />

                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <HStack gap={6} align="flex-start">
                            <Field.Root invalid={!!errors.loanAmount} flex="1">
                                <Field.Label
                                    color="gray.700"
                                    fontWeight="semibold"
                                >
                                    Principal Loan Amount ($)
                                </Field.Label>
                                <Input
                                    name="loanAmount"
                                    type="number"
                                    value={values.loanAmount}
                                    onChange={handleChange("loanAmount")}
                                    onBlur={handleBlur("loanAmount")}
                                    placeholder="Enter loan amount"
                                    size="2xl"
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
                                <Field.Label
                                    color="gray.700"
                                    fontWeight="semibold"
                                >
                                    Amortization Months
                                </Field.Label>
                                <Input
                                    name="amortizationMonths"
                                    type="number"
                                    value={values.amortizationMonths}
                                    onChange={handleChange(
                                        "amortizationMonths"
                                    )}
                                    onBlur={handleBlur("amortizationMonths")}
                                    placeholder="Enter amortization months"
                                    size="2xl"
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
                                <Field.Label
                                    color="gray.700"
                                    fontWeight="semibold"
                                >
                                    Term (Months)
                                </Field.Label>
                                <Input
                                    name="termMonths"
                                    type="number"
                                    value={values.termMonths}
                                    onChange={handleChange("termMonths")}
                                    onBlur={handleBlur("termMonths")}
                                    placeholder="Enter term in months"
                                    size="2xl"
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
                                <Field.Label
                                    color="gray.700"
                                    fontWeight="semibold"
                                >
                                    Margin Above Prime (%)
                                </Field.Label>
                                <Input
                                    name="marginAbovePrime"
                                    type="number"
                                    step="0.1"
                                    value={values.marginAbovePrime}
                                    onChange={handleChange("marginAbovePrime")}
                                    onBlur={handleBlur("marginAbovePrime")}
                                    placeholder="Enter margin percentage"
                                    size="2xl"
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
                            onClick={handleSubmit}
                            size="2xl"
                            colorPalette="blue"
                            fontWeight="semibold"
                            py={6}
                            fontSize="lg"
                            disabled={primeRateLoading || loading}
                        >
                            Calculate Amortization Schedule
                        </Button>
                    </HStack>
                </Fieldset.Root>
            </Card.Body>
        </Card.Root>
    );
};
