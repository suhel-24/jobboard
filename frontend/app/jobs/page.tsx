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
        const response = await axios.get("http://localhost:3001/jobs");
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
          job.jobType.toLowerCase() === jobType.toLowerCase();

        // Convert slider values directly to LPA
        const minSalary = salaryRange[0] / 10;
        const maxSalary = salaryRange[1] / 10;

        // Calculate job average salary in LPA
        const jobAvgSalary = (job.salaryMin + job.salaryMax) / 200000;

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
  }, [searchTerm, location, jobType, salaryRange, allJobs]);

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

      {error && <div className="text-center p-4 text-red-500">{error}</div>}

      <Jobcard loading={loading} displayedJobs={displayedJobs} />
    </div>
  );
}
