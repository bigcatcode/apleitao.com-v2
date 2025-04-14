import React from 'react';

const SliderSkeleton = () => {
  return (
    <div className="relative flex justify-center">
      <div className="w-full max-w-[1000px]">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center animate-pulse space-y-2">
              <div className="w-full h-[56px] bg-gray-300 rounded-md" />
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Navigation buttons placeholders */}
        <div className="absolute top-[-60px] w-full flex justify-between px-4 max-w-[1000px]">
          <div className="h-[60px] w-[60px] bg-gray-300 rounded-full animate-pulse" />
          <div className="h-[60px] w-[60px] bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SliderSkeleton;
