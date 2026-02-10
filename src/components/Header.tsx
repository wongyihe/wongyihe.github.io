import React, { useState } from 'react';
import { updates } from "../data/updates";

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const visibleUpdates = isExpanded ? updates : updates.slice(0, 8);
  const showButton = updates.length > 8;

  return (
    <div className="bg-white w-full relative">
      {/* Main header section */}
      <div className="max-w-[1568px] mx-auto px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-0">
          {/* Left section with name and title */}
          <div className="flex flex-col gap-[16px]">
            <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.4] not-italic text-[14px] text-black">
              <p className="mb-0">PhD Candidate @ UCSC</p>
              <p>HCI Researcher + Engineer</p>
            </div>
          </div>
            
          {/* Right section - Recent updates */}
          <div className="flex flex-col items-end gap-2 mt-0 md:mt-2 max-w-[500px] self-end md:self-auto">
            <div className="font-['Inter:Italic',_sans-serif] font-normal italic leading-[1.4] text-[12px] text-black text-right">
              {visibleUpdates.map((update, index) => (
                <p key={index} className="mb-0">{update}</p>
              ))}
            </div>
            
            {showButton && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-['Inter:Regular',_sans-serif] hover:text-black underline text-[#6a7282ad] text-[10px] m-[0px]"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
