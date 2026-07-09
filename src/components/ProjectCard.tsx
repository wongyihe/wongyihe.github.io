import { Link } from "../router";
import type { Project } from "../data/projects";

// Card accepts the full Project shape; `detail` is optional and, when present,
// enables the "Read more" link to the project's dedicated page.
type ProjectCardProps = Project;

export function ProjectCard({ title, dates, category, details, media, links, detail }: ProjectCardProps) {
  return (
    <div className="max-w-[1568px] mx-auto px-6 md:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_58%] gap-y-8 md:gap-16">
        {/* Left side - Content */}
        <div className="space-y-8 flex flex-col h-full">
          <div className="flex justify-start items-start">
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[1.3] text-[20px] text-black text-left">
              {category}
            </span>
          </div>

          <div className="space-y-4 font-['Inter:Regular',_sans-serif] font-normal leading-[1.5] text-[16px] text-black flex-grow">
            {details.map((detail, index) => (
              <p className="text-left" key={index}>{detail}</p>
            ))}
          </div>

          {links && links.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="inline-flex items-center justify-center px-3 py-1 border border-black rounded-full text-[12px] font-['Inter:Regular',_sans-serif] text-black transition-colors hover:bg-black hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Link to the project's dedicated case-study page, when one exists. */}
          {detail && (
            <div className="pt-1">
              <Link
                to={`/projects/${detail.slug}/`}
                className="font-['Inter:Regular',_sans-serif] text-[14px] text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                Read more →
              </Link>
            </div>
          )}
        </div>

        {/* Right side - Media and title */}
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[1.3] text-[20px] text-black">
              {title}
            </h2>
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[1.3] text-[20px] text-black">
              {dates}
            </span>
          </div>
          
          <div className="aspect-[16/9] w-full bg-gray-50 rounded-lg overflow-hidden">
            {media.type === 'image' ? (
              <img 
                src={media.src} 
                alt={media.alt || title}
                className="w-full h-full object-contain"
              />
            ) : (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain"
                controlsList="nodownload"
              >
                <source src={media.src} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
