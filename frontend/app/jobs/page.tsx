"use client";
import React, { useState, useEffect } from "react";
import { Search, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Jobcard from "@/components/home/Jobcard";

interface JobCard {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryFrom: number;
  salaryTo: number;
  applicationDeadline: string;
  description: string;
  logoSrc: string;
  postedTime: string;
}

const jobCards: JobCard[] = [
  {
    id: 1,
    title: "Node.js Developer",
    companyName: "TechNova Solutions",
    location: "Delhi",
    jobType: "Full time",
    salaryFrom: 1000000,
    salaryTo: 1200000,
    applicationDeadline: "2025-06-30",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5-UbhMyydiZ9iUx5ODhdAvSsb9Rr3DO36Q&s",
    postedTime: "2025-05-10T10:00:00Z",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    companyName: "PixelCraft",
    location: "Hyderabad",
    jobType: "Full time",
    salaryFrom: 800000,
    salaryTo: 1200000,
    applicationDeadline: "2025-07-10",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5-UbhMyydiZ9iUx5ODhdAvSsb9Rr3DO36Q&s",
    postedTime: "2025-05-10T12:00:00Z",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    companyName: "CodeFlow Inc.",
    location: "Hyderabad",
    jobType: "Contract",
    salaryFrom: 1200000,
    salaryTo: 1500000,
    applicationDeadline: "2025-06-25",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
    postedTime: "2025-05-10T15:00:00Z",
  },
  {
    id: 4,
    title: "Frontend Developer",
    companyName: "BrightSoft",
    location: "Remote",
    jobType: "Internship",
    salaryFrom: 10000,
    salaryTo: 15000,
    applicationDeadline: "2025-06-20",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
    postedTime: "2025-05-09T09:00:00Z",
  },
  {
    id: 5,
    title: "Backend Developer",
    companyName: "DataWave",
    location: "Chennai",
    jobType: "Full time",
    salaryFrom: 900000,
    salaryTo: 1100000,
    applicationDeadline: "2025-07-01",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9OSO7DW1aOzl3fCDIAYOUr79t38xxHew5_w&s",
    postedTime: "2025-05-09T11:30:00Z",
  },
  {
    id: 6,
    title: "QA Engineer",
    companyName: "Testyfy",
    location: "Chennai",
    jobType: "Full time",
    salaryFrom: 600000,
    salaryTo: 900000,
    applicationDeadline: "2025-06-18",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-81-1.png",
    postedTime: "2025-05-08T10:00:00Z",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    companyName: "InfraTech",
    location: "Remote",
    jobType: "Full time",
    salaryFrom: 1300000,
    salaryTo: 1600000,
    applicationDeadline: "2025-07-05",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-82-1.png",
    postedTime: "2025-05-08T15:00:00Z",
  },
  {
    id: 8,
    title: "Mobile App Developer",
    companyName: "Appfinity",
    location: "Bangalore",
    jobType: "Full time",
    salaryFrom: 900000,
    salaryTo: 1100000,
    applicationDeadline: "2025-06-28",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-83-1.png",
    postedTime: "2025-05-07T13:45:00Z",
  },
  {
    id: 9,
    title: "AI/ML Engineer",
    companyName: "DeepMind Labs",
    location: "Bangalore",
    jobType: "Full time",
    salaryFrom: 1500000,
    salaryTo: 2000000,
    applicationDeadline: "2025-07-15",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-84-1.png",
    postedTime: "2025-05-06T17:00:00Z",
  },
  {
    id: 10,
    title: "Technical Writer",
    companyName: "DocuMentor",
    location: "Remote",
    jobType: "Part-time",
    salaryFrom: 400000,
    salaryTo: 600000,
    applicationDeadline: "2025-06-22",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-85-1.png",
    postedTime: "2025-05-06T11:00:00Z",
  },
  {
    id: 11,
    title: "Product Manager",
    companyName: "InnoWare",
    location: "Bangalore",
    jobType: "Full time",
    salaryFrom: 1400000,
    salaryTo: 1700000,
    applicationDeadline: "2025-07-08",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-86-1.png",
    postedTime: "2025-05-05T09:30:00Z",
  },
  {
    id: 12,
    title: "Data Analyst",
    companyName: "InsightsAI",
    location: "Chennai",
    jobType: "Full time",
    salaryFrom: 800000,
    salaryTo: 1000000,
    applicationDeadline: "2025-06-27",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-87-1.png",
    postedTime: "2025-05-05T14:15:00Z",
  },
  {
    id: 13,
    title: "System Administrator",
    companyName: "SecureNet",
    location: "Hyderabad",
    jobType: "Full time",
    salaryFrom: 700000,
    salaryTo: 950000,
    applicationDeadline: "2025-06-30",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-88-1.png",
    postedTime: "2025-05-04T10:45:00Z",
  },
  {
    id: 14,
    title: "Cybersecurity Analyst",
    companyName: "CyberVault",
    location: "Remote",
    jobType: "Contract",
    salaryFrom: 1000000,
    salaryTo: 1400000,
    applicationDeadline: "2025-07-12",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-89-1.png",
    postedTime: "2025-05-04T12:00:00Z",
  },
  {
    id: 15,
    title: "Cloud Engineer",
    companyName: "SkyLayer",
    location: "Delhi",
    jobType: "Full time",
    salaryFrom: 1200000,
    salaryTo: 1600000,
    applicationDeadline: "2025-07-01",
    description:
      "A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized",
    logoSrc: "/image-90-1.png",
    postedTime: "2025-05-03T16:30:00Z",
  },
];

export default function Page() {
  const [salaryRange, setSalaryRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedJobs, setDisplayedJobs] = useState(jobCards);

  // Handle search with delay
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      // Filter jobs based on search term, location, job type and salary range
      const filtered = jobCards.filter((job) => {
        const matchesSearch = job.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLocation =
          location === "all" ||
          !location ||
          job.location.toLowerCase() === location.toLowerCase();
        const matchesJobType =
          jobType === "all" ||
          !jobType ||
          job.jobType.toLowerCase() === jobType.toLowerCase();

        // Convert slider values directly to LPA
        const minSalary = salaryRange[0] / 10;
        const maxSalary = salaryRange[1] / 10;

        // Calculate job average salary in LPA
        const jobAvgSalary = (job.salaryFrom + job.salaryTo) / 200000;

        // Filter based on average salary
        const matchesSalary =
          jobAvgSalary >= minSalary && jobAvgSalary <= maxSalary;

        return (
          matchesSearch && matchesLocation && matchesJobType && matchesSalary
        );
      });

      setDisplayedJobs(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, location, jobType, salaryRange]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full bg-white my-2 rounded-lg h-[75px] flex items-center px-16">
        <div className="flex h-6 items-center space-x-4">
          {/* Search Input */}
          <div className="relative w-[324px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4 " />
            <Input
              className="pl-10 text-[#222222] placeholder:text-[#686868] focus:outline-none border-0 hover:border-0 focus:border-0 focus:ring-0 ring-0 ring-offset-0"
              placeholder="Search By Job Title, Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Separator orientation="vertical" />

          {/* Location Dropdown */}
          <div className="relative w-[324px]">
            <Select onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="w-[260px] pl-10 text-[#686868] border-0 shadow-none hover:border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4" />
                <SelectValue placeholder="Preferred Location" />
              </SelectTrigger>
              <SelectContent className="w-[260px]">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" />

          {/* Job Type Dropdown */}
          <div className="relative w-[324px]">
            <Select onValueChange={(value) => setJobType(value)}>
              <SelectTrigger className="w-[260px] pl-10 text-[#686868] border-0 shadow-none hover:border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4" />
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent className="w-[260px]">
                <SelectItem value="all">All Job Types</SelectItem>
                <SelectItem value="Full time">Full Time</SelectItem>
                <SelectItem value="Part-time">Part Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" />

          {/* Salary Range Slider */}
          <div className="flex flex-col gap-2 w-[324px]">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#222222]">
                Salary Per Annum
              </span>
              <span className="text-sm font-medium text-[#222222]">
                ₹{salaryRange[0] / 10} LPA - ₹{salaryRange[1] / 10} LPA
              </span>
            </div>
            <Slider
              defaultValue={[0, 100]}
              min={0}
              max={200}
              step={1}
              value={salaryRange}
              onValueChange={setSalaryRange}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <Jobcard loading={loading} displayedJobs={displayedJobs} />
    </div>
  );
}
