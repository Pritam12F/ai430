import { type ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: string;
  daysRemaining: number;
  type: string;
  status: string;
  performance: number;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "daysRemaining",
    header: "Days Remaining",
  },
  {
    accessorKey: "performance",
    header: "Performance (%)",
  },
];
