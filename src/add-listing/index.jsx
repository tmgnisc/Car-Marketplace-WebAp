import Header from "@/components/Header";
import React from "react";

function AddListing() {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add new Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* car details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
