// SkeletonFilters.jsx
import React from 'react';

const SkeletonFilters = ({ layout, taxonomy }) => {
  return (
    <ul className={layout === 'two-column' ? 'grid grid-cols-1 1630:grid-cols-2 gap-4' : 'space-y-2'}>
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index} className={layout === 'two-column' ? 'flex items-center space-x-2' : ''}>
          <label className="inline-flex items-center mt-[10px] mb-[10px] cursor-pointer w-full animate-pulse">
            <div className="min-w-[30px] h-[30px] mr-[15px] bg-gray-300 rounded"></div>

            {taxonomy === 'cor' && (
              <div className="mr-[10px]">
                <div className="min-w-[20px] w-[20px] h-[20px] rounded-full bg-gray-300 border border-[#707070]"></div>
              </div>
            )}

            {taxonomy === 'marca' ? (
              <div className="w-[80%] 1630:w-[238px] h-[40px] bg-gray-300 rounded"></div>
            ) : (
              <div className="h-[20px] bg-gray-300 rounded w-[100px]"></div>
            )}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonFilters;
