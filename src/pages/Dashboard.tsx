
import { Link } from "react-router-dom";
import { Upload, Mic, BarChart3, History, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const featuredCards = [
    {
      title: "Upload Speech",
      description: "Upload a speech recording for in-depth analysis",
      icon: Upload,
      link: "/upload",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-800 dark:text-blue-200"
    },
    {
      title: "Real-time Analysis",
      description: "Get instant feedback as you speak",
      icon: Mic,
      link: "/analysis",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-800 dark:text-green-200"
    },
    {
      title: "Analytics",
      description: "View detailed reports and track progress",
      icon: BarChart3,
      link: "/analytics",
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-800 dark:text-purple-200"
    },
    {
      title: "History",
      description: "Review your past speech recordings",
      icon: History,
      link: "/history",
      color: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-800 dark:text-amber-200"
    }
  ];

  const statCards = [
    {
      title: "Weekly Progress",
      value: "32%",
      icon: TrendingUp,
      description: "Improvement from last week",
      color: "text-green-600"
    },
    {
      title: "Filler Words",
      value: "Reduced by 15%",
      icon: CheckCircle2,
      description: "Fewer 'um's and 'uh's",
      color: "text-blue-600"
    }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Continue improving your speaking skills with AI-powered coaching.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {featuredCards.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-navy-200 dark:hover:border-navy-800">
              <CardHeader className={`rounded-t-md ${card.color}`}>
                <div className={`p-2 rounded-full ${card.color} inline-flex items-center justify-center`}>
                  <card.icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription className="mt-2">
                  {card.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start px-0">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-2 border-transparent hover:border-navy-200 dark:hover:border-navy-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-navy-200 dark:border-navy-800">
        <CardHeader>
          <CardTitle>Your Speaking Goals</CardTitle>
          <CardDescription>Track your progress towards becoming a better speaker</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Reduce filler words</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Improve pace</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Enhance clarity</span>
              <span className="text-sm font-medium">60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
