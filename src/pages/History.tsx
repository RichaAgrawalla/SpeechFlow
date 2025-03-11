
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Play, Download, MoreVertical, Search, Filter, Calendar, CheckCircle2, XCircle } from "lucide-react";

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for speech history
  const speechHistory = [
    {
      id: 1,
      title: "Project Presentation",
      date: "May 15, 2023",
      duration: "4:32",
      type: "Uploaded",
      rating: "Good",
      fillerCount: 12,
      clarity: 75,
      pace: 68
    },
    {
      id: 2,
      title: "Team Meeting",
      date: "May 18, 2023",
      duration: "8:45",
      type: "Real-time",
      rating: "Excellent",
      fillerCount: 8,
      clarity: 82,
      pace: 76
    },
    {
      id: 3,
      title: "Interview Practice",
      date: "May 22, 2023",
      duration: "12:20",
      type: "Uploaded",
      rating: "Needs Work",
      fillerCount: 24,
      clarity: 60,
      pace: 55
    },
    {
      id: 4,
      title: "Sales Pitch",
      date: "May 25, 2023",
      duration: "6:15",
      type: "Real-time",
      rating: "Good",
      fillerCount: 15,
      clarity: 72,
      pace: 70
    },
    {
      id: 5,
      title: "Conference Talk",
      date: "May 30, 2023",
      duration: "15:47",
      type: "Uploaded",
      rating: "Excellent",
      fillerCount: 5,
      clarity: 88,
      pace: 82
    },
    {
      id: 6,
      title: "Practice Speech",
      date: "June 2, 2023",
      duration: "3:28",
      type: "Real-time",
      rating: "Good",
      fillerCount: 10,
      clarity: 74,
      pace: 72
    },
    {
      id: 7,
      title: "Customer Presentation",
      date: "June 5, 2023",
      duration: "9:12",
      type: "Uploaded",
      rating: "Excellent",
      fillerCount: 7,
      clarity: 86,
      pace: 80
    }
  ];
  
  // Filter speech history based on search term
  const filteredHistory = speechHistory.filter(speech => 
    speech.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Badge color based on rating
  const getRatingBadgeColor = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "bg-green-500 hover:bg-green-600";
      case "Good":
        return "bg-blue-500 hover:bg-blue-600";
      case "Needs Work":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "";
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Speech History</h1>
        <p className="text-muted-foreground">
          Review your past recordings and track your improvement over time
        </p>
      </div>

      <Card className="border-2 border-navy-100 dark:border-navy-800 mb-8">
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or content"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Types</DropdownMenuItem>
                <DropdownMenuItem>Uploaded</DropdownMenuItem>
                <DropdownMenuItem>Real-time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Time</DropdownMenuItem>
                <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Rating
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Ratings</DropdownMenuItem>
                <DropdownMenuItem>Excellent</DropdownMenuItem>
                <DropdownMenuItem>Good</DropdownMenuItem>
                <DropdownMenuItem>Needs Work</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-navy-100 dark:border-navy-800">
        <CardHeader>
          <CardTitle>Speech Recordings</CardTitle>
          <CardDescription>
            {filteredHistory.length} recordings found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((speech) => (
                  <TableRow key={speech.id}>
                    <TableCell className="font-medium">{speech.title}</TableCell>
                    <TableCell>{speech.date}</TableCell>
                    <TableCell>{speech.duration}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={speech.type === "Uploaded" ? "text-blue-600" : "text-green-600"}>
                        {speech.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRatingBadgeColor(speech.rating)}>
                        {speech.rating}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" title="Play">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View Analysis</DropdownMenuItem>
                            <DropdownMenuItem>Compare</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredHistory.length} of {speechHistory.length} recordings
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HistoryPage;
