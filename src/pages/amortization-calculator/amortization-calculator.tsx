import { Box } from "@chakra-ui/react";
import { AmortizationSchedule } from "./components/amortization-schedule";
import { PageForm } from "./components/page-form";
import { PageHeader } from "./components/page-header";
import { useAmortizationSchedule } from "./hooks/use-amortization-schedule";

export const AmortizationCalculator = () => {
    const { data, loading, submitForm } = useAmortizationSchedule();

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
