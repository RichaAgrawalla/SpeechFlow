
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { LineChart } from "@/components/ui/chart";
import { AIChatbot } from "@/components/ai-chatbot";

const AnalyticsPage = () => {
  // Sample data for chart - simplified
  const lineChartData = [
    { name: "Week 1", clarity: 60, pace: 50 },
    { name: "Week 2", clarity: 65, pace: 55 },
    { name: "Week 3", clarity: 70, pace: 65 },
    { name: "Week 4", clarity: 75, pace: 70 },
    { name: "Week 5", clarity: 78, pace: 72 },
    { name: "Week 6", clarity: 82, pace: 78 },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Track your progress and get personalized AI recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="border-2 border-navy-100 dark:border-navy-800">
          <CardHeader>
            <CardTitle>Speaking Progress</CardTitle>
            <CardDescription>
              Your skill development over the last 6 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={lineChartData}
              categories={["clarity", "pace"]}
              index="name"
              colors={["green", "blue"]}
              valueFormatter={(value) => `${value}%`}
              className="h-72"
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-2 border-navy-100 dark:border-navy-800">
          <CardHeader>
            <CardTitle>AI Speech Coach</CardTitle>
            <CardDescription>
              Ask for suggestions and get personalized improvement tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AIChatbot />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
