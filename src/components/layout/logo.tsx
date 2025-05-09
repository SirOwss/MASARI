
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="text-2xl font-bold flex items-center">
        <span className="text-foreground">M</span>
        <span className="relative">
          <span className="text-foreground">S</span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-masari rounded-md text-xs text-white font-medium">
            MASARI
          </div>
        </span>
      </div>
    </Link>
  );
}
