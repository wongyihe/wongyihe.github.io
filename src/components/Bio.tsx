import { bioData } from "../data/bio";

export function Bio() {
  return (
    <div
      id="connect"
      className="max-w-[1568px] mx-auto px-6 md:px-20 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-y-8 md:gap-16">
        {/* Left: Photo */}
        <div className="w-full">
          <div className="w-full aspect-square bg-[#d5e1e1]/60 rounded-[12px] relative overflow-hidden">
            <img
              src={bioData.portrait.src}
              alt={bioData.portrait.alt}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
          </div>
        </div>

        {/* Center: Bio Text */}
        <div className="space-y-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[1.3] text-[20px] text-black mx-[0px] mt-[0px] mb-[10px]">
            {bioData.header}
          </h2>

          <div className="space-y-6 font-['Inter:Regular',_sans-serif] font-normal leading-[1.5] text-[16px] text-black">
            {bioData.description.map((paragraph, index) => (
              <p
                className="mx-[0px] mt-[0px] mb-[10px]"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Connect Info */}
        <div className="space-y-4 flex flex-col items-start md:items-end">
          <h3 className="font-['Inter:Bold',_sans-serif] font-bold text-[20px] text-black w-full text-left md:text-right">
            {bioData.connect.title}
          </h3>
          <div className="flex flex-col gap-2 font-['Inter:Regular',_sans-serif] text-[16px] text-black items-start md:items-end w-full">
            {bioData.connect.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="hover:underline w-fit text-left md:text-right"
                target={
                  link.type === "external"
                    ? "_blank"
                    : undefined
                }
                rel={
                  link.type === "external"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}