import { useEmail } from "@/hooks/use-email";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useFilterEmail } from "@/hooks/use-filter-emails";

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const emails = useEmail();
  const filteredEmails = useFilterEmail(searchTerm, filter, emails);

  return (
    <div>
      <div className="my-10 text-center">
        <h2 className="text-2xl font-semibold">Emails</h2>
      </div>
      <Input
        className="my-5"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="my-5">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SENT">Sent</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="OPENED">Opened</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={columns}
        data={!filter && !searchTerm ? emails : filteredEmails}
      />
    </div>
  );
};
