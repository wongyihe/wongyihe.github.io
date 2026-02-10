import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";
import { Bio } from "./components/Bio";
import { Navigation } from "./components/Navigation";
import { PublicationItem } from "./components/PublicationItem";
import { projects } from "./data/projects";
import { publications } from "./data/publications";

export default function App() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach(pub => {
      pub.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []); // Data is static now, no need to depend on publications

  // Filter publications based on selected tag
  const filteredPublications = useMemo(() => {
    if (!selectedTag) return publications;
    return publications.filter(pub => pub.tags?.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-white font-['Inter:Regular',_sans-serif]">
      <Navigation />
      
      <Header />

      <main>
        {/* Projects Section */}
        <section id="projects" className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </section>

        {/* Separator */}
        <div className="max-w-[1568px] mx-auto px-6 md:px-20">
          <div className="border-t border-gray-100" />
        </div>

        {/* Publications Section */}
        <section id="publications" className="max-w-[1568px] mx-auto px-6 md:px-20 py-16 md:py-24">
          <h2 className="font-['Inter:Bold',_sans-serif] font-bold text-[32px] text-black mb-6">Publications</h2>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-[14px] transition-colors border ${
                selectedTag === null
                  ? "bg-black text-white border-black font-medium"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-[14px] transition-colors border ${
                  selectedTag === tag
                    ? "bg-black text-white border-black font-medium"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-4 min-h-[400px]">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub, index) => (
                <PublicationItem key={index} {...pub} />
              ))
            ) : (
              <div className="text-gray-500 italic py-8">No publications found for this tag.</div>
            )}
          </div>
        </section>

        {/* Separator */}
        <div className="max-w-[1568px] mx-auto px-6 md:px-20">
          <div className="border-t border-gray-100" />
        </div>

        {/* Bio/Connect Section */}
        <Bio />
      </main>
    </div>
  );
}
