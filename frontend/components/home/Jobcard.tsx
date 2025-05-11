import React from "react";
import { ClockIcon, Layers, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

// Job card type
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

interface JobcardProps {
  loading: boolean;
  displayedJobs: JobCard[];
}

// Function to format relative time
const getRelativeTime = (timeString: string): string => {
  const postDate = new Date(timeString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
};

const Jobcard = ({ loading, displayedJobs }: JobcardProps) => {
  return (
    <div className="flex flex-wrap justify-center w-full py-4 px-4 md:px-8 lg:px-16">
      {loading && (
        <div className="w-full flex justify-center items-center py-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-4 border-[#00aaff] border-t-transparent animate-spin"></div>
            <p className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#555555]">
              Searching...
            </p>
          </div>
        </div>
      )}

      {!loading && displayedJobs.length === 0 && (
        <div className="w-full flex justify-center items-center py-8">
          <p className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#555555] text-lg">
            No jobs available
          </p>
        </div>
      )}

      {!loading && displayedJobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {displayedJobs.map((job) => (
            <Card
              key={job.id}
              className="relative rounded-xl shadow-[0px_0px_14px_#d3d3d326] gap-1 py-0 flex flex-col h-full"
            >
              <CardHeader className="p-0">
                <div className="flex justify-between items-start p-4">
                  <div className="w-[83px] h-[82px] rounded-[13.18px] overflow-hidden [background:linear-gradient(180deg,rgba(254,254,253,1)_0%,rgba(241,241,241,1)_100%)] border border-solid border-white shadow-[0px_0px_10.25px_#94949440]">
                    <Image
                      className="w-[66px] h-[66px] mt-2 mx-auto object-cover"
                      alt="Company logo"
                      src={
                        job.id % 2 === 0
                          ? "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9OSO7DW1aOzl3fCDIAYOUr79t38xxHew5_w&s"
                      }
                      width={66}
                      height={66}
                    />
                  </div>

                  <Badge className="bg-[#afd8ff] text-black hover:bg-[#afd8ff] hover:text-black">
                    <span className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-sm">
                      {getRelativeTime(job.createdAt)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="px-4 flex-grow">
                <h3 className="[font-family:'Satoshi_Variable-Bold',Helvetica] font-bold text-black text-xl truncate">
                  {job.title}
                </h3>
                <p className="[font-family:'Satoshi_Variable-Medium',Helvetica] text-[#5a5a5a] font-medium text-base mt-1 truncate">
                  {job.companyName}
                </p>

                <div className="flex flex-wrap items-center gap-2 justify-between mt-6">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 text-[#5a5a5a]" />
                    <span className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#5a5a5a] text-sm">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4 text-[#5a5a5a]" />
                    <span className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#5a5a5a] text-sm truncate max-w-[80px]">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Layers className="h-4 w-4 text-[#5a5a5a]" />
                    <span className="[font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#5a5a5a] text-sm whitespace-nowrap">
                      ₹
                      {((job.salaryMin + job.salaryMax) / 24 / 1000).toFixed(1)}
                      K /month
                    </span>
                  </div>
                </div>

                <p className="mt-5 [font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-[#555555] text-sm line-clamp-3 mb-6">
                  {job.description
                    .split("\n")
                    .slice(0, 3)
                    .map((line: string, index: number) => (
                      <React.Fragment key={index}>
                        {index > 0 && " "}• {line}
                      </React.Fragment>
                    ))}
                </p>
              </CardContent>

              <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="cursor-pointer w-full bg-[#00aaff] hover:bg-[#00aaff] text-white rounded-[10px] shadow-[0px_0px_14px_#5c5c5c26]">
                  <span className="[font-family:'Satoshi_Variable-Bold',Helvetica] font-bold text-base">
                    Apply Now
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobcard;
