// import React, { useState, type FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProfileForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: 'Test',
//     lastName: 'Project',
//     email: 'test@gmail.com',
//     phone: '0888888888',
//     // age: '21',
//     birthDate: '15/05/1987',
//     height: '170',
//     weight: '64',
//     allergies: 'กุ้ง',
//     diseases: '-',
//     gender: 'ชาย',
//   });

//   //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   //   const { name, value } = e.target;
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     [name]: value
//   //   }));
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     alert('บันทึกข้อมูลเรียบร้อย');
//   };

//   const navigate = useNavigate();

//   const handleCancel = () => {
//     navigate('/show-profile'); 
//   };

//   return (
//     <div className="profile-right flex-1 p-5">
//       <h2 className="profile-title text-gray-700 mb-6 text-2xl font-semibold border-b border-gray-200 text-centerpb-3">
//         ข้อมูลส่วนตัว
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ชื่อจริง</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder="กรุณากรอกชื่อจริง"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">นามสกุล</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder="กรุณากรอกนามสกุล"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">อีเมล</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="อีเมล"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">เบอร์โทร</label>
//             <input
//               type="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="เบอร์โทร"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">วันเกิด</label>
//             <input
//               type="text"
//               name="วันเกิด"
//               value={formData.birthDate}
//               onChange={handleChange}
//               placeholder="วันเกิด"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           {/* <div>
//             <label className="block mb-1 text-gray-600 font-medium">อายุ</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               placeholder="อายุ"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div> */}

//           {/* <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               วันเกิด
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="birthDate"
//                 value={formData.birthDate}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div> */}

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ส่วนสูง (เซนติเมตร)</label>
//             <input
//               type="number"
//               name="height"
//               value={formData.height}
//               onChange={handleChange}
//               placeholder="ส่วนสูง"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">น้ำหนัก (กิโลกรัม)</label>
//             <input
//               type="number"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               placeholder="น้ำหนัก"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ข้อมูลการแพ้อาหาร</label>
//             <input
//               type="text"
//               name="allergies"
//               value={formData.allergies}
//               onChange={handleChange}
//               placeholder="ข้อมูลการแพ้อาหาร"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">โรคประจำตัว</label>
//             <input
//               type="text"
//               name="diseases"
//               value={formData.diseases}
//               onChange={handleChange}
//               placeholder="โรคประจำตัว"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div className="md:col-span-1">
//             <label className="block mb-1 text-gray-600 font-medium">เพศ</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             >
//               <option value="" disabled>
//                 เลือกเพศ
//               </option>
//               <option value="male">ชาย</option>
//               <option value="female">หญิง</option>
//               <option value="other">อื่นๆ</option>
//             </select>
//           </div>
//         </div>

//         <div className="form-actions flex justify-end gap-4 mt-6">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="form-button cancel bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
//           >
//             ยกเลิก
//           </button>
//           <button
//             type="submit"
//             className="form-button save bg-yellow-400 text-gray-800 px-6 py-2 rounded hover:bg-yellow-500 transition"
//           >
//             บันทึก
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;

//================================================================ version ใช้ได้ในปัจจุบัน ====================================================================================================

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import type { UserInterface } from '../../../../interfaces/IUser';
// import type { UserProfileInterface } from '../../../../interfaces/IUserProfile';
// import { GetUserByID, GetUserProfileByID, ListGenders, UpdateUserProfile } from '../../../../service/https';
// import type { GenderInterface } from '../../../../interfaces/IGender';

// const ProfileForm: React.FC = () => {

//   const [user, setUser] = useState<UserInterface | null>(null);
//   const [userProfile, setUserProfile] = useState<UserProfileInterface | null>(null);
//   const [gender, setGender] = useState<GenderInterface[]>([])
//   const navigate = useNavigate();

//   const getUserByID = async (id: string) => {
//     const res = await GetUserByID(id);
//     if(res.status){
//       setUser(res.data)
//     }
//   }

//   const getUserProfileByID = async (id: string) => {
//     const res = await GetUserProfileByID(id)
//     if(res.status){
//       setUserProfile(res.data)
//     }
//   }

//   const getGender = async () => {
//     const res = await ListGenders()
//     if(res.status){
//       setGender(res.data)
//     }
//   }

//   useEffect(() => {
//     localStorage.setItem("userID", "1");
//     const UserID = localStorage.getItem("userID");

//     if (UserID){
//       getUserByID(UserID);
//       getUserProfileByID(UserID);
//       getGender();
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("handleSubmit ถูกเรียกแล้ว");

//     if (!userProfile || !userProfile.ID || !user || !user.ID){
//       alert("ข้อมูลไม่ครบ")
//       return
//     }

//     // //เตรียมข้อมูลที่จะส่งไป backend
//     // const cleanedUser = {
//     //   GenderID: user.GenderID,
//     //   ActivityLevelID: user.ActivityLevelID,
//     //   LevelID: user.LevelID,
//     // }

//     // console.log("กำลังส่งข้อมูลอัปเดต user:", cleanedUser)

//     try {

//       // const userProfileID: string = userProfile?.ID.toString();
//       console.log("🔍 กำลังส่งข้อมูล user:", userProfile);

//       // const userRes = await UpdateUser(user.ID.toString(), cleanedUser)
//       // if (userRes.status === 200){
//       //   alert("อัปเดตข้อมูลสำเร็จ")
//       //   return
//       // }

//       const payload = {
//         FirstName: userProfile.FirstName,
//         LastName: userProfile.LastName,
//         Phone: userProfile.Phone,
//         FoodAllergies: userProfile.FoodAllergies,
//         MedicalConditions: userProfile.MedicalConditions,
//         DateOfBirth: userProfile.DateOfBirth,
//         WeightKg: userProfile.WeightKg,
//         HeightCm: userProfile.HeightCm,
//         GenderID: user.GenderID,
//         ActivityLevelID: user.ActivityLevelID,
//         LevelID: user.LevelID
//       }

//       const response = await UpdateUserProfile(userProfile.ID.toString(), payload);
//       if (response.status === 200) {
//         alert("อัปเดตสำเร็จ");
//         navigate("/show-profile")
//         // setUserProfile(response.data); // อัปเดต state
//       } else {
//         alert("อัปเดตไม่สำเร็จ");
//         console.log("Response status:", response.status);
//         console.log("Response data:", response.data); // ข้อมูล error จาก backend
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("เกิดข้อผิดพลาด");
//     }
//   };

//   // const [formData, setFormData] = useState({
//   //   firstName: 'Test',
//   //   lastName: 'Project',
//   //   email: 'test@gmail.com',
//   //   phone: '0888888888',
//   //   // age: '21',
//   //   birthDate: '15/05/1987',
//   //   height: '170',
//   //   weight: '64',
//   //   allergies: 'กุ้ง',
//   //   diseases: '-',
//   //   gender: 'ชาย',
//   // });

//   //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   //   const { name, value } = e.target;
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     [name]: value
//   //   }));
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;

//     //สำหรับ GenderID, ActivityLevelID, LevelID อยู่ใน user
//     if(["GenderID", "ActivityLevelID", "LevelID"].includes(name)){
//       setUser(prev => ({
//         ...prev!,
//         [name]: Number(value),
//       }))
//     } else {
//       // ที่เหลืออยู่ใน userProfile
//       setUserProfile(prev => ({
//         ...prev!,
//         [name]: name === "WeightKg" || name === "HeightCm" ? Number(value) : value,
//       }))
//     }
//     // setUserProfile(prev => {
//     //   if(!prev) return prev;
//     //   return {
//     //     ...prev,
//     //     [name]: name === "WeightKg" || name === "HeightCm" ? Number(value) : value,
//     //   }
//     // })
//     // setUser(prev => ({
//     //   ...prev!,
//     //   [name]: name === "GenderID" ? Number(value) : value,
//     // }));
//   };

//   // const handleSubmit = (e: FormEvent) => {
//   //   e.preventDefault();
//   //   alert('บันทึกข้อมูลเรียบร้อย');
//   // };

//   const handleCancel = () => {
//     navigate('/show-profile'); 
//   };

//   return (
//     <div className="profile-right flex-1 p-5">
//       <h2 className="profile-title text-gray-700 mb-6 text-2xl font-semibold border-b border-gray-200 text-centerpb-3">
//         ข้อมูลส่วนตัว
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ชื่อจริง</label>
//             <input
//               type="text"
//               name="FirstName"
//               value={userProfile?.FirstName}
//               onChange={handleChange}
//               placeholder="กรุณากรอกชื่อจริง"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">นามสกุล</label>
//             <input
//               type="text"
//               name="LastName"
//               value={userProfile?.LastName}
//               onChange={handleChange}
//               placeholder="กรุณากรอกนามสกุล"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">อีเมล</label>
//             <input
//               type="email"
//               name="Email"
//               value={user?.Email}
//               onChange={handleChange}
//               placeholder="อีเมล"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">เบอร์โทร</label>
//             <input
//               type="phone"
//               name="Phone"
//               value={userProfile?.Phone}
//               onChange={handleChange}
//               placeholder="เบอร์โทร"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">วันเกิด</label>
//             <input
//               type="date"
//               name="DateOfBirth"
//               value={userProfile?.DateOfBirth?.slice(0, 10) || ""}
//               onChange={handleChange}
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />

//             {/* <input
//               type="text"
//               name="DateOfBirth"
//               value={userProfile?.DateOfBirth}
//               onChange={handleChange}
//               placeholder="วันเกิด"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             /> */}
//           </div>

//           {/* <div>
//             <label className="block mb-1 text-gray-600 font-medium">อายุ</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               placeholder="อายุ"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div> */}

//           {/* <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               วันเกิด
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="birthDate"
//                 value={formData.birthDate}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div> */}

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ส่วนสูง (เซนติเมตร)</label>
//             <input
//               type="number"
//               name="HeightCm"
//               value={userProfile?.HeightCm}
//               onChange={handleChange}
//               placeholder="ส่วนสูง"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">น้ำหนัก (กิโลกรัม)</label>
//             <input
//               type="number"
//               name="WeightKg"
//               value={userProfile?.WeightKg}
//               onChange={handleChange}
//               placeholder="น้ำหนัก"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">ข้อมูลการแพ้อาหาร</label>
//             <input
//               type="text"
//               name="FoodAllergies"
//               value={userProfile?.FoodAllergies}
//               onChange={handleChange}
//               placeholder="ข้อมูลการแพ้อาหาร"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 font-medium">โรคประจำตัว</label>
//             <input
//               type="text"
//               name="MedicalConditions"
//               value={userProfile?.MedicalConditions}
//               onChange={handleChange}
//               placeholder="โรคประจำตัว"
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             />
//           </div>

//           <div className="md:col-span-1">
//             <label className="block mb-1 text-gray-600 font-medium">เพศ</label>
//             <select
//               name="GenderID"
//               value={user?.GenderID}
//               onChange={handleChange}
//               className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             >
//               <option value="" disabled>
//                 เลือกเพศ
//               </option>
//               {gender.map((gender: GenderInterface) => (
//                 <option key={gender.ID} value={gender.ID}>
//                   {gender.GenderName}
//                 </option>
//               ))}
//               {/* <option value="ชาย">ชาย</option>
//               <option value="หญิง">หญิง</option>
//               <option value="other">อื่นๆ</option> */}
//             </select>
//           </div>
//         </div>

//         <div className="form-actions flex justify-end gap-4 mt-6">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="form-button cancel bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
//           >
//             ยกเลิก
//           </button>
//           <button
//             type="submit"
//             className="form-button save bg-yellow-400 text-gray-800 px-6 py-2 rounded hover:bg-yellow-500 transition"
//           >
//             บันทึก
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;


//=========================================================================================== version มีรูปโปรไฟล์ =======================================================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserInterface } from '../../interfaces/IUser';
import type { UserProfileInterface } from '../../interfaces/IUserProfile';
import { GetUserByID, GetUserProfileByID, ListGenders, UpdateUserProfile } from '../../service/https';
import type { GenderInterface } from '../../interfaces/IGender';

interface ProfileImageProps {
  onImageChange?: (imageUrl: string | null) => void;
  initialImage?: string | null
}

const ProfileForm: React.FC<ProfileImageProps> = (/*{
  onImageChange,
  initialImage = null
}*/) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileInterface | null>(null);
  const [gender, setGender] = useState<GenderInterface[]>([])
  const navigate = useNavigate();
  // const [profileImage, setProfileImage] = useState<string | null>(initialImage)

  const getUserByID = async (id: string) => {
    const res = await GetUserByID(id);
    if(res.status){
      setUser(res.data)
    }
  }

  const getUserProfileByID = async (id: string) => {
    const res = await GetUserProfileByID(id)
    if(res.status){
      setUserProfile(res.data)
    }
  }

  const getGender = async () => {
    const res = await ListGenders()
    if(res.status){
      setGender(res.data)
    }
  }

  useEffect(() => {
    localStorage.setItem("userID", "1")
    const UserID = localStorage.getItem("userID")

    if (UserID){
      getUserByID(UserID);
      getUserProfileByID(UserID);
      getGender();
    }
  }, []);

  // const fileInputRef = useRef<HTMLInputElement>(null)

  // const triggerImageUpload = (): void => {
  //   fileInputRef.current?.click()
  // }

  // const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
  //   const file = event.target.files?.[0]
  //   if(file && file.type.startsWith('image/')) {
  //     const reader = new FileReader()
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       const result = e.target?.result as string
  //       setProfileImage(result)
  //       onImageChange?.(result)
  //       alert('อัปโหลดรูปภาพสำเร็จ!')
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  // const deleteImage = (): void => {
  //   setProfileImage(null)
  //   onImageChange?.(null)
  //   if (fileInputRef.current){
  //     fileInputRef.current.value = ''
  //   }
  //   alert('ลบรูปภาพสำเร็จ!')
  // }

  // const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
  //   e.preventDefault()
  // }

  // const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
  //   e.preventDefault()
  //   const files = e.dataTransfer.files
  //   if(files.length > 0 && files[0].type.startsWith('image/')) {
  //     const file = files[0]
  //     const reader = new FileReader()
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       const result = e.target?.result as string
  //       setProfileImage(result)
  //       onImageChange?.(result)
  //       alert('อัปโหลดรูปภาพสำเร็จ!')
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit ถูกเรียกแล้ว");

    if (!userProfile || !userProfile.ID || !user || !user.ID){
      alert("ข้อมูลไม่ครบ")
      return
    }

    try {

      // const userProfileID: string = userProfile?.ID.toString();
      console.log("🔍 กำลังส่งข้อมูล user:", userProfile);

      const payload = {
        FirstName: userProfile.FirstName,
        LastName: userProfile.LastName,
        Phone: userProfile.Phone,
        FoodAllergies: userProfile.FoodAllergies,
        MedicalConditions: userProfile.MedicalConditions,
        DateOfBirth: userProfile.DateOfBirth,
        WeightKg: userProfile.WeightKg,
        HeightCm: userProfile.HeightCm,
        GenderID: user.GenderID,
        ActivityLevelID: user.ActivityLevelID,
        LevelID: user.LevelID
      }

      const response = await UpdateUserProfile(userProfile.ID.toString(), payload);
      if (response.status === 200) {
        alert("อัปเดตสำเร็จ");
        navigate("/show-profile")
        // setUserProfile(response.data); // อัปเดต state
      } else {
        alert("อัปเดตไม่สำเร็จ");
        console.log("Response status:", response.status);
        console.log("Response data:", response.data); // ข้อมูล error จาก backend
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    //สำหรับ GenderID, ActivityLevelID, LevelID อยู่ใน user
    if(["GenderID", "ActivityLevelID", "LevelID"].includes(name)){
      setUser(prev => ({
        ...prev!,
        [name]: Number(value),
      }))
    } else {
      // ที่เหลืออยู่ใน userProfile
      setUserProfile(prev => ({
        ...prev!,
        [name]: name === "WeightKg" || name === "HeightCm" ? Number(value) : value,
      }))
    }
  };

  const handleCancel = () => {
    navigate('/show-profile'); 
  };

  return (
    <div className="profile-right flex-1 p-5">
      <h2 className="profile-title text-gray-700 mb-6 text-2xl font-semibold border-b border-gray-200 text-centerpb-3">
        ข้อมูลส่วนตัว
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">ชื่อจริง</label>
            <input
              type="text"
              name="FirstName"
              value={userProfile?.FirstName}
              onChange={handleChange}
              placeholder="กรุณากรอกชื่อจริง"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">นามสกุล</label>
            <input
              type="text"
              name="LastName"
              value={userProfile?.LastName}
              onChange={handleChange}
              placeholder="กรุณากรอกนามสกุล"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">อีเมล</label>
            <input
              type="email"
              name="Email"
              value={user?.Email}
              onChange={handleChange}
              placeholder="อีเมล"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">เบอร์โทร</label>
            <input
              type="phone"
              name="Phone"
              value={userProfile?.Phone}
              onChange={handleChange}
              placeholder="เบอร์โทร"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">วันเกิด</label>
            <input
              type="date"
              name="DateOfBirth"
              value={userProfile?.DateOfBirth?.slice(0, 10) || ""}
              onChange={handleChange}
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">ส่วนสูง (เซนติเมตร)</label>
            <input
              type="number"
              name="HeightCm"
              value={userProfile?.HeightCm}
              onChange={handleChange}
              placeholder="ส่วนสูง"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">น้ำหนัก (กิโลกรัม)</label>
            <input
              type="number"
              name="WeightKg"
              value={userProfile?.WeightKg}
              onChange={handleChange}
              placeholder="น้ำหนัก"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">ข้อมูลการแพ้อาหาร</label>
            <input
              type="text"
              name="FoodAllergies"
              value={userProfile?.FoodAllergies}
              onChange={handleChange}
              placeholder="ข้อมูลการแพ้อาหาร"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">โรคประจำตัว</label>
            <input
              type="text"
              name="MedicalConditions"
              value={userProfile?.MedicalConditions}
              onChange={handleChange}
              placeholder="โรคประจำตัว"
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-gray-600 font-medium">เพศ</label>
            <select
              name="GenderID"
              value={user?.GenderID}
              onChange={handleChange}
              className="form-input w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="" disabled>
                เลือกเพศ
              </option>
              {gender.map((gender: GenderInterface) => (
                <option key={gender.ID} value={gender.ID}>
                  {gender.GenderName}
                </option>
              ))}
              {/* <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="other">อื่นๆ</option> */}
            </select>
          </div>
        </div>

        <div className="form-actions flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="form-button cancel bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="form-button save bg-yellow-400 text-gray-800 px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
