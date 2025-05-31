import { useEffect, useState } from "react";

export const useRearrangeCampaign = ({
  scheduled,
  unscheduled,
  completed,
}: {
  scheduled: any;
  unscheduled: any;
  completed: any;
}) => {
  const [finalData, setFinalData] = useState<any[]>([]);

  useEffect(() => {
    const scheduledList = scheduled.map((x: any) => {
      //Calculating remaining days
      const remainingDays =
        (new Date(x.endDate).getTime() - new Date().getTime()) / 86400000;
      const type = x.type[0].concat(
        (x.type as string).substring(1).toLowerCase()
      );
      const status = x.status[0].concat(
        (x.status as string).substring(1).toLowerCase()
      );

      return {
        name: x.name,
        type,
        daysRemaining:
          Math.floor(remainingDays) >= 0 ? Math.floor(remainingDays) : 0,
        status,
        performance: Math.floor(Math.random() * 100) + 1,
      };
    });
    const unscheduledList = unscheduled.map((x: any) => {
      //Calculating remaining days
      const remainingDays =
        (new Date(x.endDate).getTime() - new Date().getTime()) / 86400000;
      const type = x.type[0].concat(
        (x.type as string).substring(1).toLowerCase()
      );
      const status = x.status[0].concat(
        (x.status as string).substring(1).toLowerCase()
      );
      return {
        name: x.name,
        type,
        daysRemaining:
          Math.floor(remainingDays) >= 0 ? Math.floor(remainingDays) : 0,
        status,
        performance: Math.floor(Math.random() * 100) + 1,
      };
    });
    const completedList = completed.map((x: any) => {
      //Calculating remaining days
      const remainingDays =
        (new Date(x.endDate).getTime() - new Date().getTime()) / 86400000;
      const type = x.type[0].concat(
        (x.type as string).substring(1).toLowerCase()
      );
      const status = x.status[0].concat(
        (x.status as string).substring(1).toLowerCase()
      );

      return {
        name: x.name,
        type,
        daysRemaining:
          Math.floor(remainingDays) >= 0 ? Math.floor(remainingDays) : 0,
        status,
        performance: Math.floor(Math.random() * 100) + 1,
      };
    });

    setFinalData([...scheduledList, ...unscheduledList, ...completedList]);
  }, [scheduled, unscheduled, completed]);

  return finalData;
};
