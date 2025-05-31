import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateForm } from "./components/create";
import { ScheduleForm } from "./components/schedule";
import Summary from "./components/summary/summary";

function App() {
  return (
    <div className="w-screen flex justify-center">
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList className="h-10 mt-2 space-x-10">
          <TabsTrigger value="create" className="cursor-pointer">
            Create Campaign
          </TabsTrigger>
          <TabsTrigger value="schedule" className="cursor-pointer">
            Schedule Campaign
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="cursor-pointer">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="summary" className="cursor-pointer">
            Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateForm />
        </TabsContent>
        <TabsContent value="schedule">
          <ScheduleForm />
        </TabsContent>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
