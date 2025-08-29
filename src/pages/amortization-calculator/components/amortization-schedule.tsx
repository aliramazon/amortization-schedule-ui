import {
    Box,
    Card,
    Heading,
    HStack,
    Icon,
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
                <HStack gap={6} w="full">
                    <Stat.Root flex="1" borderWidth="1px" p="4" rounded="md">
                        <HStack justify="space-between">
                            <Stat.Label>Total Interest</Stat.Label>
                            <Icon color="fg.muted">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText>
                            ${data.totalInterest.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root flex="1" borderWidth="1px" p="4" rounded="md">
                        <HStack justify="space-between">
                            <Stat.Label>Total Principal</Stat.Label>
                            <Icon color="fg.muted">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText>
                            ${data.totalPrincipal.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root flex="1" borderWidth="1px" p="4" rounded="md">
                        <HStack justify="space-between">
                            <Stat.Label>Total Payments</Stat.Label>
                            <Icon color="fg.muted">
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <Stat.ValueText>
                            ${data.totalPayments.toLocaleString()}
                        </Stat.ValueText>
                    </Stat.Root>
                </HStack>
            </Card.Body>

            <Card.Body>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
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
