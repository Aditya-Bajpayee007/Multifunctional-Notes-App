import React from "react";

export const ViewNotesCard = ({ title, date, tags, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 h-64 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3a4 4 0 118 0v4m-4 8l-2-2m0 0l-2-2m2 2v6m8-6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
            />
          </svg>
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 mb-3">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
            {content}
          </p>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {(Array.isArray(tags) ? tags : [tags])
              .slice(0, 3)
              .map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 max-w-[80px] truncate"
                >
                  #{typeof tag === "string" ? tag.replace(/^#/, "") : tag}
                </span>
              ))}
            {(Array.isArray(tags) ? tags : [tags]).length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{(Array.isArray(tags) ? tags : [tags]).length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Public Note
          </div>
        </div>
      </div>
    </div>
  );
};
