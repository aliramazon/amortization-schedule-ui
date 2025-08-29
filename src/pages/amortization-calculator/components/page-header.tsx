import { Box, Heading, Text } from "@chakra-ui/react";

export const PageHeader = () => {
    return (
        <Box textAlign="center" mb={8}>
            <Heading as="h1" size="3xl" color="gray.900" mb={4}>
                Term Loan Amortization Calculator
            </Heading>
            <Text
                fontSize="lg"
                color="gray.600"
                lineHeight="relaxed"
                maxW="4xl"
            >
                Generate precise amortization schedules for term loans with
                real-time Federal Reserve prime rates. Calculate monthly
                payments, interest, and principal allocations with professional
                accuracy.
            </Text>
        </Box>
    );
};
