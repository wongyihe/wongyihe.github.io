const fs = require('fs');
const path = require('path');

/**
 * Converts markdown links [text](url) to React JSX format
 * @param {string} text - Text that may contain markdown links
 * @returns {string} - String representation of React component
 */
function convertMarkdownLinks(text) {
  // Pattern to match markdown links: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  let lastIndex = 0;
  const parts = [];
  let match;
  let hasLinks = false;

  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText.trim()) {
        parts.push({ type: 'text', content: beforeText });
      }
    }
    
    // Add the link as JSX
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push({ type: 'link', text: linkText, url: linkUrl });
    
    lastIndex = linkPattern.lastIndex;
    hasLinks = true;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    const afterText = text.substring(lastIndex);
    if (afterText.trim()) {
      parts.push({ type: 'text', content: afterText });
    }
  }

  // If no links found, return the original text as a string
  if (!hasLinks) {
    return `"${text.trim()}"`;
  }

  // If links found, return JSX fragment with text and links
  // In TSX, text can be written directly in fragments without quotes
  // Build the JSX by concatenating text and link elements
  const jsxParts = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.type === 'text') {
      // Text content goes directly in the fragment (TSX will handle it as a text node)
      jsxParts.push(part.content);
    } else if (part.type === 'link') {
      jsxParts.push(`<a href="${part.url}" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">${part.text}</a>`);
    }
    
    // Add spacing between parts (except after last)
    if (i < parts.length - 1) {
      jsxParts.push('{" "}');
    }
  }
  
  return `<>${jsxParts.join('')}</>`;
}

/**
 * Parses markdown file and converts to TypeScript format
 */
function convertUpdates() {
  const markdownPath = path.join(__dirname, '../src/data/updates.md');
  const outputPath = path.join(__dirname, '../src/data/updates.ts');

  // Read the markdown file
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  
  // Split by lines
  const lines = markdownContent.split('\n');
  
  const updates = [];
  let currentDate = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and the main header
    if (!line || line === '# Updates') {
      continue;
    }
    
    // Check if it's a date header (## Date format)
    if (line.startsWith('## ')) {
      // Save previous update if exists
      if (currentDate && currentContent.length > 0) {
        const content = currentContent.join(' ').trim();
        // Convert markdown links first
        const converted = convertMarkdownLinks(content);
        // Append date - if it's JSX, add it to the fragment, otherwise append to string
        let finalContent;
        if (converted.startsWith('<>')) {
          // Remove closing </> and add date as text before it
          // Date goes directly in the fragment (no quotes needed)
          finalContent = converted.replace('</>', `{" "} - ${currentDate}</>`);
        } else {
          // It's a plain string, append date inside quotes
          finalContent = converted.slice(0, -1) + ` - ${currentDate}"`;
        }
        updates.push({
          date: currentDate,
          content: finalContent
        });
        currentContent = [];
      }
      
      // Extract date (everything after ## )
      currentDate = line.substring(3).trim();
    } else if (currentDate) {
      // Accumulate content for current date
      currentContent.push(line);
    }
  }

  // Don't forget the last update
  if (currentDate && currentContent.length > 0) {
    const content = currentContent.join(' ').trim();
    // Convert markdown links first
    const converted = convertMarkdownLinks(content);
    // Append date - if it's JSX, add it to the fragment, otherwise append to string
    let finalContent;
    if (converted.startsWith('<>')) {
      // Remove closing </> and add date as text before it
      // Date goes directly in the fragment (no quotes needed)
      finalContent = converted.replace('</>', `{" "} - ${currentDate}</>`);
    } else {
      // It's a plain string, append date inside quotes
      finalContent = converted.slice(0, -1) + ` - ${currentDate}"`;
    }
    updates.push({
      date: currentDate,
      content: finalContent
    });
  }

  // Generate TypeScript file
  const tsContent = `import React from 'react';

export const updates: React.ReactNode[] = [
${updates.map(update => `  ${update.content},`).join('\n')}
];
`;

  // Write the TypeScript file
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  
  console.log(`✓ Converted ${updates.length} updates from markdown to TypeScript`);
  console.log(`✓ Output written to: ${outputPath}`);
}

// Run the converter
if (require.main === module) {
  try {
    convertUpdates();
  } catch (error) {
    console.error('Error converting updates:', error);
    process.exit(1);
  }
}

module.exports = { convertUpdates };
