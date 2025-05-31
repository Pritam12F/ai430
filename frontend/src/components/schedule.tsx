import { useCampaigns } from "@/hooks/use-campaign";
import { SelectWrapper } from "./select";
import { useState } from "react";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";
import { Label } from "./ui/label";
import axios from "axios";

export const ScheduleForm = () => {
  const [selectedId, setSelectedId] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { unscheduled } = useCampaigns();

  const handleSchedule = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!selectedId || !startDate || !endDate) {
      toast.info("Please select a campaign and both dates.");
      return;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      toast.error("End date must be after start date.");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/campaign/schedule`,
        {
          campaignId: selectedId,
          startDate: startDate,
          endDate: endDate,
        }
      );

      toast.success("Campaign scheduled successfully!");
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Error scheduling campaign:", error);

      if (axios.isAxiosError(error)) {
        if (error.status === 402) {
          toast.error("Cannot schedule campaign in the past.");
          return;
        }
      }
      toast.error("Failed to schedule the campaign. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-2xl font-semibold text-center">
        Schedule Your Campaign
      </h1>
      <div className="mt-20">
        <div className="ml-6.5">
          <SelectWrapper
            campaigns={unscheduled}
            setSelectedId={setSelectedId}
          />
        </div>
        <div className="mt-4 flex justify-around w-full">
          <div className="space-y-2">
            <Label className="text-sm">Start Date</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">End Date</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>
        <div>
          <Button
            className="my-5 w-11/12 ml-[25px] cursor-pointer"
            onClick={handleSchedule}
          >
            Schedule
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
