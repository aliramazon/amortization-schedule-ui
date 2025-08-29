import { Box } from "@chakra-ui/react";
import { useState } from "react";

import { toaster } from "../../design-system/toaster";
import { getAmortizationSchedule } from "../../services/get-amortization-schedule";
import { AmortizationSchedule } from "./components/amortization-schedule"; // 👈 import it
import { PageForm } from "./components/page-form";
import { PageHeader } from "./components/page-header";
import type { AmortizationScheduleData, FormValues } from "./types";

export const AmortizationCalculator = () => {
    const [data, setData] = useState<AmortizationScheduleData | null>(null);
    const [loading, setLoading] = useState(false);

    const submitForm = async (values: FormValues & { primeRate: number }) => {
        setLoading(true);
        try {
            const data = await getAmortizationSchedule(
                values,
                values.primeRate
            );
            setData(data);
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

    return (
        <Box
            minH="100vh"
            bg="gray.50"
            py={8}
            display="flex"
            justifyContent="center"
        >
            <Box maxW="60rem" w="full" px={4}>
                <PageHeader />
                <PageForm onSubmit={submitForm} loading={loading} />

                {data && <AmortizationSchedule data={data} />}
            </Box>
        </Box>
    );
};
