import type { z } from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCampaignFormSchema } from "@/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CreateForm = () => {
  const form = useForm<z.infer<typeof createCampaignFormSchema>>({
    resolver: zodResolver(createCampaignFormSchema),
    defaultValues: {
      name: "",
      target: "",
      type: "EMAIL",
    },
  });

  async function onSubmit(values: z.infer<typeof createCampaignFormSchema>) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/campaign/create`,
        {
          name: values.name,
          target: values.target,
          type: values.type,
          startDate: values.startDate?.toISOString(),
          endDate: values.endDate?.toISOString(),
        }
      );

      toast.success("Created campaign");
    } catch (err) {
      console.error(err);
      toast.error("Could not create campaign");
    }
  }
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-semibold text-center">Create Campaign</h2>
      <div className="flex flex-col justify-center mb-32 mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter campaign name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target audience</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter target audience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of campaign" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="SOCIAL">Socials</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};
