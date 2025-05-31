import { useCampaigns } from "@/hooks/use-campaign";
import React, { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { useRearrangeCampaign } from "@/hooks/use-rearrange-campaign";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Summary: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const { scheduled, unscheduled, completed } = useCampaigns();
  const finalData = useRearrangeCampaign({ scheduled, unscheduled, completed });

  useEffect(() => {
    const filtered = finalData.filter((x) => x.status === filter);
    console.log(filtered);
    setFiltered(filtered);
  }, [filter, finalData]);

  return (
    <div>
      <div className="my-10 text-center">
        <h2 className="text-2xl font-semibold">Campaign Summary</h2>
        <Select onValueChange={(e) => setFilter(e)}>
          <SelectTrigger className="w-[180px] mt-10">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Unscheduled">Unscheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={filter ? filtered : finalData} />
    </div>
  );
};

export default Summary;
