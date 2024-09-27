"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { getTransactionsAction } from "@/actions/user-actions";
import { useAuth } from "@/context/AuthContext";
// import { useAllTransactions } from "@/hooks/useTransactions";
// import { transactions } from "@/data/Transactions";

// export const data = transactions;

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "recipientBank",
    header: "Recipient Bank",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function Transactions<TData, TValue>({
  columns,
}: {
  columns: ColumnDef<TData, TValue>[];
}) {
  const { refreshAccess, user, setError } = useAuth();
  const [data, setData] = React.useState<TData[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (user !== null && !token === null) {
      async () => {
        await refreshAccess();
      };
    }
    const trans = async () => {
      const res = await getTransactionsAction(token!);
      if (res.data) {
        setData(res.data);
        setError(null);
      } else if (res.error) {
        setData([]);
        setError(res.error);
      }
    };
    trans();
  }, []);

  const table = useReactTable({
    data, //also good to use a fallback array that is defined outside of the component (stable reference)
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="bg-gray-100 w-full">
      <CardHeader className="flex items-center gap-2 space-y-y-0 border-b py-4 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transactions</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
