import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Processing Cap Table...
      </p>
    </div>
  );
};

export default Loading;
