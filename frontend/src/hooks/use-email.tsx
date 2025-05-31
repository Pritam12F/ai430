import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useEmail = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/campaign/emails`
      );

      const emailsData = res.data.emails;

      const rearrangedEmails = emailsData.map((email: any) => ({
        campaign: email.campaign.name,
        subject: email.subject,
        status: email.status,
      }));

      setEmails(rearrangedEmails);
    } catch (err) {
      console.error("Error fetching emails:", err);
      return;
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, []);

  return emails;
};
