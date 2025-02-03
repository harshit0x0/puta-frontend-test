// generate a beautiful loading spinner with a message
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-gray-800 mt-4">Loading...</p>
    </div>
  );
}
