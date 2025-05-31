import { type ColumnDef } from "@tanstack/react-table";

export type Payment = {
  campaign: string;
  status: string;
  subject?: string;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "campaign", header: "Campaign" },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
