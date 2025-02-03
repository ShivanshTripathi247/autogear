"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
  orientation = "vertical",
  Component
}: {
  items: any[];
  orientation?: "vertical" | "horizontal";
  Component?: React.ComponentType<any>;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerClasses = orientation === "vertical" 
    ? "flex flex-col space-y-4" 
    : "flex flex-row space-x-4";

  return (
    <div className={containerClasses}>
      {items.map((item, idx) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20,
                  transition: {
                    duration: 0.2
                  }
                }}
                className="absolute left-full ml-2 z-50"
              >
                <div className="bg-black text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {Component ? (
            <Component 
              item={item} 
            />
          ) : (
            <Link 
              href={item.href} 
              className="cursor-pointer"
            >
              <div className="text-muted-foreground hover:text-primary">
                {item.Component && <item.Component size={24} />}
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};