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
import axios from "axios";

interface JobCard {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  deadline: string;
  description: string;
  logoSrc: string;
  createdAt: string;
}

export default function Page() {
  const [salaryRange, setSalaryRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState<JobCard[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<JobCard[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("API URL:", apiUrl);
        const response = await axios.get(`${apiUrl}/jobs`);
        console.log("API Response:", response);
        setAllJobs(response.data.data);
        setDisplayedJobs(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle filtering with delay
  useEffect(() => {
    if (allJobs.length === 0) return;

    setLoading(true);

    const timer = setTimeout(() => {
      // Filter jobs based on search term, location, job type and salary range
      const filtered = allJobs.filter((job) => {
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
          job.jobType.toLowerCase().replace(/\s+/g, "") ===
            jobType.toLowerCase().replace(/\s+/g, "");

        // Convert slider values to monthly salary in thousands
        const minSalaryMonthly = salaryRange[0] * 1000; // 10k monthly per slider unit
        const maxSalaryMonthly = salaryRange[1] * 1000; // 10k monthly per slider unit

        // Calculate job average monthly salary
        const jobAvgSalaryMonthly = (job.salaryMin + job.salaryMax) / 24; // Convert annual to monthly

        // Filter based on average monthly salary
        const matchesSalary =
          jobAvgSalaryMonthly >= minSalaryMonthly &&
          jobAvgSalaryMonthly <= maxSalaryMonthly;

        return (
          matchesSearch && matchesLocation && matchesJobType && matchesSalary
        );
      });

      setDisplayedJobs(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, location, jobType, salaryRange, allJobs]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full bg-white my-2 rounded-lg flex flex-col lg:flex-row lg:h-[75px] py-4 lg:py-0 items-start lg:items-center px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:h-6 gap-4 lg:gap-0 w-full lg:items-center lg:space-x-4 lg:justify-between">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-[324px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4 " />
            <Input
              className="pl-10 text-[#222222] placeholder:text-[#686868] focus:outline-none border-0 hover:border-0 focus:border-0 focus:ring-0 ring-0 ring-offset-0"
              placeholder="Search By Job Title, Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden lg:block">
            <div className="bg-gray-200 w-[1px] h-6"></div>
          </div>

          {/* Location Dropdown */}
          <div className="relative w-full lg:max-w-[324px] mt-4 lg:mt-0">
            <Select onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="w-full lg:w-[260px] pl-10 text-[#686868] border-0 shadow-none hover:border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4" />
                <SelectValue placeholder="Preferred Location" />
              </SelectTrigger>
              <SelectContent className="w-full lg:w-[260px]">
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

          <div className="hidden lg:block">
            <div className="bg-gray-300 w-[1px] h-6"></div>
          </div>

          {/* Job Type Dropdown */}
          <div className="relative w-full lg:max-w-[324px] mt-4 lg:mt-0">
            <Select onValueChange={(value) => setJobType(value)}>
              <SelectTrigger className="w-full lg:w-[260px] pl-10 text-[#686868] border-0 shadow-none hover:border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#686868] h-4 w-4" />
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent className="w-full lg:w-[260px]">
                <SelectItem value="all">All Job Types</SelectItem>
                <SelectItem value="Full time">Full Time</SelectItem>
                <SelectItem value="Part time">Part Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden lg:block">
            <div className="bg-gray-200 w-[1px] h-6"></div>
          </div>

          {/* Salary Range Slider */}
          <div className="flex flex-col gap-2 w-full lg:max-w-[324px] mt-4 lg:mt-0">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#222222]">
                Salary Per Month
              </span>
              <span className="text-sm font-medium text-[#222222]">
                ₹{salaryRange[0]}K - ₹{salaryRange[1]}K
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

      {error && <div className="text-center p-4 text-red-500">{error}</div>}

      <Jobcard loading={loading} displayedJobs={displayedJobs} />
    </div>
  );
}
