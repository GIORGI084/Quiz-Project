import React from "react";

const RightSidebar = () => {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Properties</h3>

      <div className="space-y-4">
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Select a block to edit its properties</p>
        </div>
        <div className="hidden">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Options
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Option 1"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Option 2"
                />
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  + Add option
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Required question</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export { RightSidebar };
