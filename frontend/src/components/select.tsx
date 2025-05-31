import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectWrapper = ({
  campaigns,
  setSelectedId,
}: {
  campaigns: any[];
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select onValueChange={(value) => setSelectedId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Campaigns" />
      </SelectTrigger>
      <SelectContent>
        {campaigns.map((campaign) => (
          <SelectItem key={campaign.id} value={campaign.id}>
            {campaign.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
