import React from 'react';

const getBranchName = () => {
  return import.meta.env.VITE_BRANCH || 'main';
};

export default function BranchBadge() {
  const branchName = getBranchName();
  return (
    <div className="fixed top-2 right-2 z-50 select-none pointer-events-none">
      <span className="px-2 py-1 text-xs rounded bg-gray-800 text-white shadow-md opacity-80">
        {branchName}
      </span>
    </div>
  );
}


