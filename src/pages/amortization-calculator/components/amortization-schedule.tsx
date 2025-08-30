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
    const stats = [
        {
            data: data.totalInterest,
            title: "Total Interest",
        },
        {
            data: data.totalPrincipal,
            title: "Total Principal",
        },
        { data: data.totalPayments, title: "Total Payments" },
    ];
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
                    {stats.map((stat) => {
                        return (
                            <Stat.Root
                                flex="1"
                                p="4"
                                rounded="md"
                                bg="blue.50"
                                border="none"
                                key={stat.title}
                            >
                                <HStack justify="space-between">
                                    <Stat.Label color="gray.600">
                                        {stat.title}
                                    </Stat.Label>
                                    <Icon color="gray.500">
                                        <LuDollarSign />
                                    </Icon>
                                </HStack>
                                <Stat.ValueText color="gray.700">
                                    ${stat.data.toLocaleString()}
                                </Stat.ValueText>
                            </Stat.Root>
                        );
                    })}
                </Stack>
            </Card.Body>

            <Card.Body>
                <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
                    <Table.Root size="lg">
                        <Table.Header>
                            <Table.Row bg="gray.100">
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
                                <Table.Row
                                    key={row.month}
                                    _even={{ bg: "gray.50" }}
                                >
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
