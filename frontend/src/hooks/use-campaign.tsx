import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useCampaigns = () => {
  const [scheduled, setScheduled] = useState([]);
  const [unsheduled, setUnscheduled] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetch = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/campaign/summary/all`
      );

      const campaigns = res.data;
      const scheduledCampaigns = campaigns.filter(
        (campaign: any) => campaign.status === "SCHEDULED"
      );
      const unscheduledCampaigns = campaigns.filter(
        (campaign: any) => campaign.status === "UNSCHEDULED"
      );

      const completedCampaigns = campaigns.filter(
        (campaign: any) => campaign.status === "COMPLETED"
      );
      setScheduled(scheduledCampaigns);
      setUnscheduled(unscheduledCampaigns);
      setCompleted(completedCampaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      return;
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return { scheduled, unsheduled, completed };
};
