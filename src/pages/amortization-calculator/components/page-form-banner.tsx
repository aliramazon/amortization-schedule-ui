import { Card, HStack, Icon, Spinner, Text } from "@chakra-ui/react";
import { FaChartLine } from "react-icons/fa";

type PageFormBannerProps = {
    primeInterestRate: number | undefined;
    marginAbovePrime: string;
    primeRateLoading?: boolean;
};

export const PageFormBanner = ({
    primeInterestRate,
    marginAbovePrime,
    primeRateLoading = false,
}: PageFormBannerProps) => {
    const effectiveRate =
        (primeInterestRate || 0) + (Number(marginAbovePrime) || 0);

    return (
        <Card.Root bg="gray.100" shadow="none" mb={6}>
            <Card.Body p={6}>
                <HStack justify="space-between" align="center">
                    <HStack gap={3}>
                        <Icon color={"blue.500"}>
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
                    <HStack gap={2} align="center">
                        {primeRateLoading && (
                            <Spinner size="sm" color="blue.500" />
                        )}
                        {primeInterestRate && (
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={"blue.600"}
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
            </Card.Body>
        </Card.Root>
    );
};
