import React from 'react';

interface ProfileSidebarProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="profile-left flex flex-col items-center text-center bg-[#fff9e6] rounded-xl p-8 shadow-sm" style={{ minWidth: 280 }}>
      <div className="profile-image w-[150px] h-[150px] rounded-full bg-white border border-gray-300 mb-5 flex items-center justify-center overflow-hidden">
        <svg
          className="profile-icon w-[80px] h-[80px] opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <div className="profile-action-buttons flex flex-col gap-3 w-full mt-3">
        <button
          className="profile-button py-2 rounded-full bg-yellow-400 text-gray-800 font-medium hover:bg-yellow-500 transition"
          onClick={onEdit}
        >
          แก้ไข
        </button>
        <button
          className="profile-button secondary py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={onDelete}
        >
          ลบ
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
