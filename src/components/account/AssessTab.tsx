
import React from "react";

const AssessTab = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Assessment Summary</h3>
      <div className="space-y-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="font-medium mb-2">Struggles</h4>
          <p className="text-gray-600">I'm passionate about mental health and community support.</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="font-medium mb-2">Interests</h4>
          <p className="text-gray-600">Wellness, meditation, helping others, community building</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center h-8 w-8 bg-yellow-200 rounded-full text-lg">
              😐
            </div>
            <h4 className="font-medium">Current Mood</h4>
          </div>
          <p className="text-gray-600">Neutral</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-white">
              ✓
            </div>
            <span>Seeking Support</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-white">
              ✓
            </div>
            <span>Giving Others</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessTab;
