import {
    Box,
    Card,
    Heading,
    HStack,
    Icon,
    Stack,
    Stat,
    Table,
} from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";
import type { AmortizationScheduleData } from "../types";

export const AmortizationSchedule = ({
    data,
}: {
    data: AmortizationScheduleData;
}) => {
    return (
        <Card.Root shadow="sm" mt={8}>
            <Card.Header>
                <Heading size="md">Amortization Schedule</Heading>
            </Card.Header>

            <Card.Body>
                <Stack
                    gap={6}
                    w="full"
                    direction={{ base: "column", md: "row" }}
                >
                    <Stat.Root
                        flex="1"
                        borderWidth="1px"
                        p="4"
                        rounded="md"
                        bg="blue.50"
                        borderColor="blue.200"
                    >
                        <HStack justify="space-between">
                            <Stat.Label color="blue.600">
                                Total Interest
                            </Stat.Label>
                            <Icon color="blue.500">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText color="blue.700">
                            ${data.totalInterest.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root
                        flex="1"
                        borderWidth="1px"
                        p="4"
                        rounded="md"
                        bg="green.50"
                        borderColor="green.200"
                    >
                        <HStack justify="space-between">
                            <Stat.Label color="green.600">
                                Total Principal
                            </Stat.Label>
                            <Icon color="green.500">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText color="green.700">
                            ${data.totalPrincipal.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root
                        flex="1"
                        borderWidth="1px"
                        p="4"
                        rounded="md"
                        bg="purple.50"
                        borderColor="purple.200"
                    >
                        <HStack justify="space-between">
                            <Stat.Label color="purple.600">
                                Total Payments
                            </Stat.Label>
                            <Icon color="purple.500">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText color="purple.700">
                            ${data.totalPayments.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>
                </Stack>
            </Card.Body>

            <Card.Body>
                <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
                    <Table.Root size="lg" striped>
                        <Table.Header bg="gray.100">
                            <Table.Row>
                                <Table.ColumnHeader>Month</Table.ColumnHeader>
                                <Table.ColumnHeader>Date</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    Starting Balance
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    Interest
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    Principal
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="right">
                                    Ending Balance
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.schedule.map((row) => (
                                <Table.Row key={row.month}>
                                    <Table.Cell>{row.month}</Table.Cell>
                                    <Table.Cell>{row.date}</Table.Cell>
                                    <Table.Cell textAlign="right">
                                        ${row.startingBalance.toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell textAlign="right">
                                        ${row.interestPayment.toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell textAlign="right">
                                        ${row.principalPayment.toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell textAlign="right">
                                        ${row.endingBalance.toLocaleString()}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Card.Body>
        </Card.Root>
    );
};
