import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import supabase from "../../../configs/Supabaseconfig";

function UploadImages({ onUploadComplete }) {
  const [selectedFileList, setSelectedFileList] = useState([]);

  // Handle file selection
  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
  };

  const uploadImages = async () => {
    const uploadedImageUrls = [];

    try {
      console.log("Uploading images...");

      await Promise.all(
        selectedFileList.map(async (file) => {
          const fileName = `${Date.now()}_${file.name}`;
          console.log(`Uploading file: ${fileName}`);

          const { data, error } = await supabase.storage
            .from("images") 
            .upload(fileName, file);

          if (error) {
            console.error("Upload error:", error.message);
            return;
          }

          console.log("Upload data for", file.name, data);

          if (data) {
            const publicUrl = `https://shcuswjblrdzqmogxqhi.supabase.co/storage/v1/object/public/images/${data.path}`;
            console.log(`Public URL for ${file.name}:`, publicUrl);

           
            uploadedImageUrls.push(publicUrl);
          }
        })
      );

      if (uploadedImageUrls.length > 0) {
        onUploadComplete(uploadedImageUrls);
        console.log("Uploaded image URLs:", uploadedImageUrls);
      } else {
        console.error("No images were uploaded successfully.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt="preview"
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-lg">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
      <button
        onClick={uploadImages}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Upload Images
      </button>
    </div>
  );
}

export default UploadImages;
