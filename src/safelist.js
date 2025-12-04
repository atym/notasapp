// This file exists to prevent Tailwind from "purging" (deleting) these classes.
// Since these strings now live in the database, Tailwind can't see them in our code.
// We list them here so Tailwind knows they are still needed.

export const safelist = [
    // The Colors Lesson
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-400",
    "bg-gray-900",
    "bg-white", "text-gray-900", "border", // For the 'White' card
    "bg-orange-500",
    "bg-purple-600",
    "bg-pink-400",
    "bg-gray-500",
    "bg-amber-800",
    "bg-teal-400",
    
    // Any other dynamic classes from DB can go here
];