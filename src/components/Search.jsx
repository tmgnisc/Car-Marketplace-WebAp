import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from "@/Shared/Data";

function Search() {
  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new" className="bg-white hover:bg-gray-100">New</SelectItem>
          <SelectItem value="old" className="bg-white hover:bg-gray-100">Old</SelectItem>
        </SelectContent>
      </Select>

      {/* Separator */}
      <Separator orientation="vertical" className="hidden md:block" />

      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Company" />
        </SelectTrigger>
        <SelectContent>
          {Data.Company.map((maker) => (
            <SelectItem 
              key={maker.id} 
              value={maker.name} 
              className="bg-white hover:bg-gray-100"
            >
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Separator */}
      <Separator orientation="vertical" className="hidden md:block" />

      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((price) => (
            <SelectItem 
              key={price.id} 
              value={price.amount} 
              className="bg-white hover:bg-gray-100"
            >
              {price.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div>
        <CiSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </div>
    </div>
  );
}

export default Search;
