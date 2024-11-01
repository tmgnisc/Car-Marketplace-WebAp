import React from "react";

function UploadImages() {
    const [selectedFileList, setSelectedFileList]= useState([])
  const onFileSelected = (event) => {
    const files = event.target.files;
    for(let i=0; i<files?.length;i++){
        const file = files[i]
        setSelectedFileList((prev)=>[...prev,file])
    }
  };
  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-lg">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
