'use client';

import '../main.css';

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set a data attribute to indicate this is preview content - cursors should be enabled
  return (
    <div data-preview="true" data-preview-content="true" suppressHydrationWarning>
      {children}
    </div>
  );
} 