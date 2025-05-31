import { useEffect, useState } from "react";

export const useFilterEmail = (
  searchTerm: string,
  filter: string,
  emails: any
) => {
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (!filter && searchTerm) {
      const filteredEmails = emails.filter((x: any) =>
        (x.campaign as string).includes(searchTerm)
      );

      setFiltered(filteredEmails);

      return;
    } else if (filter && !searchTerm) {
      const filteredEmails = emails.filter((x: any) => x.status === filter);

      setFiltered(filteredEmails);

      return;
    } else if (filter && searchTerm) {
      const filteredEmails = emails.filter(
        (x: any) =>
          x.status === filter && (x.campaign as string).includes(searchTerm)
      );

      setFiltered(filteredEmails);

      return;
    }
  }, [searchTerm, filter, emails]);

  return filtered;
};
