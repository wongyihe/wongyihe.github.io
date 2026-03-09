import React from 'react';

/**
 * Converts markdown text to React nodes, handling markdown links [text](url)
 * @param text - The markdown text to convert
 * @returns React node(s) with links converted to anchor elements
 */
export function markdownToReact(text: string): React.ReactNode {
  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(textBefore);
      }
    }
    
    // Add the link as a React anchor element
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-600"
      >
        {linkText}
      </a>
    );
    
    lastIndex = linkRegex.lastIndex;
  }
  
  // Add remaining text after the last link
  if (lastIndex < text.length) {
    const textAfter = text.substring(lastIndex);
    if (textAfter) {
      parts.push(textAfter);
    }
  }
  
  // If no links were found, return the original text
  if (parts.length === 0) {
    return text;
  }
  
  // Return a fragment containing all parts
  return <>{parts}</>;
}

/**
 * Parses markdown content and converts each line to React nodes, skipping headers and empty lines
 * @param markdownContent - The markdown content to parse
 * @returns Array of React.ReactNode, one for each non-empty, non-header line
 */
export function parseUpdatesMarkdown(markdownContent: string): React.ReactNode[] {
  // Split by newlines
  const lines = markdownContent.split('\n');
  
  const updates: React.ReactNode[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and lines starting with #
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }
    
    // Convert each line using markdownToReact
    const reactNode = markdownToReact(trimmedLine);
    updates.push(reactNode);
  }
  
  return updates;
}
