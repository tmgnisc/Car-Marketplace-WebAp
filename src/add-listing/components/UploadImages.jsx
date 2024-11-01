import React from "react";

function UploadImages() {
  return (
    <div>
        <h2 className="font-medium text-xl my-3">Upload car Images</h2>
      <div>
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10">
            <h2 className="text-lg">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
