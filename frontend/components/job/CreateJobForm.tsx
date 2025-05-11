"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronsDown, ChevronsRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  location: z.enum(
    ["Delhi", "Bangalore", "Remote", "Mumbai", "Hyderabad", "Chennai"],
    {
      errorMap: () => ({ message: "Please select a location" }),
    }
  ),
  jobType: z.enum([
    "FullTime",
    "PartTime",
    "Contract",
    "Freelance",
    "Internship",
  ]),
  salaryMin: z.coerce.number().min(0, "Minimum salary is required"),
  salaryMax: z.coerce.number().min(0, "Maximum salary is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  deadline: z.date().min(new Date(), "Deadline must be in the future"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateJobForm() {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: undefined,
      description: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/jobs`, data);
      toast.success("Job posted successfully!");
      console.log(response.data);
      setOpen(false);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[30px] bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-white hover:opacity-90 font-semibold cursor-pointer">
          Create Jobs
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[700px] max-w-[700px] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-5">
            Create Job Opening
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-row gap-5">
            <div className="grid gap-2 w-full">
              <label htmlFor="title" className="text-base font-semibold">
                Job Title
              </label>
              <Input
                id="title"
                {...form.register("title")}
                className="w-full h-[50px]"
                placeholder="Full Stack Developer"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="grid gap-2 w-full">
              <label htmlFor="company" className="text-base font-semibold">
                Company Name
              </label>
              <Input
                id="company"
                {...form.register("company")}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full h-[50px]"
              />
              {form.formState.errors.company && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="grid gap-2 w-full">
              <label htmlFor="location" className="text-base font-semibold">
                Location
              </label>
              <Select
                onValueChange={(value) =>
                  form.setValue("location", value as FormValues["location"])
                }
              >
                <SelectTrigger id="location" className="w-full !h-[50px]">
                  <SelectValue placeholder="Choose Preferred Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.location && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div className="grid gap-2 w-full">
              <label
                htmlFor="jobType"
                className="text-base font-semibold w-full"
              >
                Job Type
              </label>
              <Select
                onValueChange={(value) =>
                  form.setValue("jobType", value as FormValues["jobType"])
                }
              >
                <SelectTrigger id="jobType" className="w-full !h-[50px]">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FullTime">Full Time</SelectItem>
                  <SelectItem value="PartTime">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.jobType && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.jobType.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="grid gap-2 w-full">
              <label className="text-base font-semibold">Salary Range</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="₹0"
                    className="h-[50px]"
                    {...form.register("salaryMin", { valueAsNumber: true })}
                  />
                  {form.formState.errors.salaryMin && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.salaryMin.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="₹12,00,000"
                    className="h-[50px]"
                    {...form.register("salaryMax", { valueAsNumber: true })}
                  />
                  {form.formState.errors.salaryMax && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.salaryMax.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2 w-full">
              <label htmlFor="deadline" className="text-base font-semibold">
                Application Deadline
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal h-[50px]",
                      !form.watch("deadline") && "text-muted-foreground"
                    )}
                  >
                    {form.watch("deadline") ? (
                      format(form.watch("deadline"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("deadline")}
                    onSelect={(date) => form.setValue("deadline", date as Date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.deadline && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.deadline.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2 w-full">
            <label htmlFor="description" className="text-base font-semibold">
              Job Description
            </label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Please share a description to let the candidate know more about the job role"
              className="min-h-[120px]"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4 justify-between">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-white border-[#222222] text-black !h-[58px] max-w-[200px] cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center justify-center gap-2">
                <p>Save Draft</p>
                <ChevronsDown className="w-4 h-4" />
              </div>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#00AAFF] text-white hover:bg-[#00AAFF]/90 !h-[58px] max-w-[200px] cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <p>{isSubmitting ? "Publishing..." : "Publish"}</p>
                <ChevronsRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
