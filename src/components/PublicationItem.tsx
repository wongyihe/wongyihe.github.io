import React from 'react';

interface PublicationItemProps {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  // role?: string; // Removed unused prop
  tags?: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

export function PublicationItem({ title, authors, venue, year, tags, links }: PublicationItemProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 p-[0px] m-[0px]">
      <div className="flex flex-col gap-2 mx-[0px] my-[10px]">
        <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-black leading-tight">
          {title}
        </h3>
        
        <div className="font-['Inter:Regular',_sans-serif] text-[16px] text-black leading-relaxed">
          {authors.map((author, index) => (
            <span key={index} className={author.includes("Yihe") || author.includes("Wang") ? "font-semibold" : ""}>
              {author}{index < authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-gray-600 font-['Inter:Italic',_sans-serif] italic">
          <span>{venue} {year}</span>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag, index) => (
              <span key={index} className="py-0.5 bg-gray-50 text-gray-600 text-[12px] rounded font-['Inter:Regular',_sans-serif] px-[2px] py-[0px]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex gap-4 m-[0px]">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-black hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
