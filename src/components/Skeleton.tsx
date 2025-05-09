import React from "react";

export const Skeleton = () => {
      return (
            <div className="min-h-screen bg-white px-4 sm:px-10 py-8 sm:py-12">
                  <div className="grid grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {/* Left Content - Blog Text Skeleton */}
                        <div className="col-span-12 md:col-span-8">
                              <div className="bg-gray-300 h-10 w-3/4 mb-4 rounded"></div>
                              <div className="bg-gray-300 h-6 w-1/2 mb-6 rounded"></div>
                              <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                              <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                              <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                        </div>

                        {/* Right Content - Author Info Skeleton */}
                        <div className="col-span-12 md:col-span-4 md:pl-6 lg:pl-10">
                              <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                    <div className="flex flex-col gap-2 w-full">
                                          <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                                          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                                          <div className="bg-gray-200 h-4 w-full rounded"></div>
                                          <div className="bg-gray-200 h-4 w-full rounded"></div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
