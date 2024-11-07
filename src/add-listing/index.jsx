import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import Header from "@/components/Header";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarListing } from "./../../configs/schema";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { CarImages } from "./../../configs/schema";

function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, checked) => {
    setFeaturesData((prevData) => {
      if (checked) {
        return [...prevData, name];
      } else {
        return prevData.filter((feature) => feature !== name);
      }
    });
  };

  const onUploadComplete = (urls) => {
    setImageUrls(urls);
  };

  function hasCircularReferences(obj) {
    const seenObjects = new Set();
  
    function detect(obj) {
      if (obj && typeof obj === 'object') {
        if (seenObjects.has(obj)) {
          return true;
        }
        seenObjects.add(obj);
        
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (detect(obj[key])) {
              return true;
            }
          }
        }
      }
      return false;
    }
    
    return detect(obj);
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Features Data:", featuresData);
    console.log("Image URLs:", imageUrls);

    const formDataWithFeatures = {
      ...formData,
      features: JSON.stringify(featuresData),
    };

    console.log("Data before orderSelectedFields:", formDataWithFeatures);

    console.log("Checking for circular references:", hasCircularReferences(formDataWithFeatures));
    if (hasCircularReferences(formDataWithFeatures)) {
      console.error("Circular reference detected in form data!");
      toast.error("Error: Circular reference detected!");
      return;
    }

    const orderedFormData = orderSelectedFields(formDataWithFeatures);

    console.log("Ordered Form Data:", orderedFormData);

    try {
      const carListingResult = await db
        .insert(CarListing)
        .values({
          ...orderedFormData,
        })
        .returning("id");

      if (!carListingResult || !carListingResult[0]) {
        throw new Error("Failed to insert car listing.");
      }

      const carListingId = carListingResult[0].id;
      console.log("Car Listing ID:", carListingId);

      if (imageUrls.length > 0) {
        for (const url of imageUrls) {
          await db.insert(CarImages).values({
            imageUrl: url,
            carListingId: carListingId,
          });
        }
      }

      toast.success("Car Listing saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving Car Listing!");
    }
  };

  function orderSelectedFields(data, depth = 0) {
    try {
      console.log("Inside orderSelectedFields with depth:", depth, "and data:", data);

      if (depth > 5) {
        console.warn("Maximum recursion depth reached!");
        return data;
      }

      if (Array.isArray(data)) {
        console.log("Data is an array, processing array items...");
        return data.map(item => {
          console.log("Processing item in array:", item);
          return item;
        });
      }

      if (data === null || typeof data !== 'object') {
        console.log("Data is a primitive, returning directly:", data);
        return data;
      }

      if (data && typeof data === 'object') {
        console.log("Data is an object, handling object fields...");
        
        const orderedData = {};
        Object.keys(data).forEach((key) => {
          orderedData[key] = orderSelectedFields(data[key], depth + 1);
        });

        console.log("Ordered object data:", orderedData);
        return orderedData;
      }

      return data;
    } catch (error) {
      console.error("Error in orderSelectedFields:", error);
      return data;
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />

      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add new Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onsubmit}>
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item.required && <span className="text-red-600">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(checked) =>
                      handleFeatureChange(item.name, checked)
                    }
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <UploadImages onUploadComplete={onUploadComplete} />

          <div className="mt-10 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
