'use client';
import { useState } from 'react';

export default function ConfigPage() {
  const [test, setTest] = useState("hello");
  
  return (
    <main className="min-h-screen">
      <div>{test}</div>
    </main>
  );
} 