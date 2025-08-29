import { Box } from "@chakra-ui/react";
import { PageForm } from "./components/page-form";
import { PageHeader } from "./components/page-header";

export const AmortizationCalculator = () => {
    return (
        <Box
            minH="100vh"
            bg="gray.50"
            py={8}
            display="flex"
            justifyContent="center"
        >
            <Box maxW="56rem" w="full" px={4}>
                <PageHeader />
                <PageForm />
            </Box>
        </Box>
    );
};
