import { useCampaigns } from "@/hooks/use-campaign";
import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { useRearrangeCampaign } from "@/hooks/use-rearrange-campaign";

const Summary: React.FC = () => {
  const { scheduled, unscheduled, completed } = useCampaigns();
  const finalData = useRearrangeCampaign({ scheduled, unscheduled, completed });

  return (
    <div>
      <div className="my-10 text-center">
        <h2 className="text-2xl font-semibold">Campaign Summary</h2>
      </div>
      <DataTable columns={columns} data={finalData} />
    </div>
  );
};

export default Summary;
