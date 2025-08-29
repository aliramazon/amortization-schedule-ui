import { Card, HStack, Icon, Spinner, Text } from "@chakra-ui/react";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

type PageFormBannerProps = {
    primeInterestRate: number | undefined;
    marginAbovePrime: string;
    primeRateLoading?: boolean;
    primeRateError?: string | null;
};

export const PageFormBanner = ({
    primeInterestRate,
    marginAbovePrime,
    primeRateLoading = false,
    primeRateError = null,
}: PageFormBannerProps) => {
    const effectiveRate =
        (primeInterestRate || 0) + (Number(marginAbovePrime) || 0);

    return (
        <Card.Root bg="gray.100" shadow="none" mb={6}>
            <Card.Body p={6}>
                <HStack justify="space-between" align="center">
                    <HStack gap={3}>
                        <Icon color={primeRateError ? "red.500" : "blue.500"}>
                            {primeRateError ? (
                                <FaExclamationTriangle />
                            ) : (
                                <FaChartLine />
                            )}
                        </Icon>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color="gray.700"
                        >
                            Current Prime Rate
                            {primeRateError && " (Using Default)"}
                        </Text>
                    </HStack>
                    <HStack gap={2} align="center">
                        {primeRateLoading && (
                            <Spinner size="sm" color="blue.500" />
                        )}
                        {primeInterestRate && (
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={
                                    primeRateError ? "orange.600" : "blue.600"
                                }
                            >
                                {primeInterestRate.toFixed(2)}%
                            </Text>
                        )}
                    </HStack>
                </HStack>
                <Text fontSize="sm" color="gray.600" mt={2}>
                    Effective Rate: {effectiveRate.toFixed(2)}% (Prime +{" "}
                    {marginAbovePrime || "0"}% margin)
                </Text>
                {primeRateError && (
                    <Text fontSize="xs" color="red.600" mt={1}>
                        {primeRateError}
                    </Text>
                )}
            </Card.Body>
        </Card.Root>
    );
};
