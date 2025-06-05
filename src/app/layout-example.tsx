"use client";

import React from "react";
import CursorProvider from "@/components/CursorProvider";

// Example layout component
export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CursorProvider>
      <div className="min-h-screen">
        {/* Your header, navigation, etc. would go here */}
        <main>{children}</main>
        {/* Your footer would go here */}
      </div>
    </CursorProvider>
  );
}

// INSTRUCTIONS FOR INTEGRATION:
// 1. Import the CursorProvider in your main layout file
// 2. Wrap your layout content with the CursorProvider
// 3. The ripple cursor effect will automatically apply to the entire app
//
// To customize the cursor, you can modify the settings in:
// src/components/CursorProvider.tsx
