import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileForm from './ProfileForm';
import NavBar from '../../../../component/navbar/NavBar';

const ProfilePage: React.FC = () => {
  const handleEdit = () => {
    alert('กดปุ่มแก้ไข');
  };

  const handleDelete = () => {
    alert('กดปุ่มลบ');
  };

  return (
    <div style={{ fontFamily: "'Sarabun', sans-serif" }}>
      <NavBar />
      
      <div className="profile-page flex gap-6 p-10 bg-gray-100 min-h-screen">
        <ProfileSidebar onEdit={handleEdit} onDelete={handleDelete} />
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;

