import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, Plus, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import dayjs from "dayjs";
import 'dayjs/locale/th';
import NavBar from '../../../component/navbar/NavBar';
import type { IExercise } from '../../../interfaces/IExercise';
import type { IExerciseType } from '../../../interfaces/IExerciseType';
import type { IExerciseActivity } from '../../../interfaces/IExerciseActivity';
import { GetExerciseActivityByUserID, DeleteExerciseActivityByID, ListExerciseTypes, GetExercisesByExerciseTypeID } from '../../../services/https';
dayjs.locale('th');
const ExerciseActivityRecord = () => {
  // State ที่ใช้
  const [exerciseActivities, setExerciseActivities] = useState<IExerciseActivity[]>([]);
  const [showMenuId, setShowMenuId] = useState<number | null>(null);
  const [exerciseTypes, setExerciseTypes] = useState<IExerciseType[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('record');
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id") || "";  // ดึง userId จาก localStorage (หรือจะใช้วิธีอื่นก็ได้)

  console.log("userId:", userId);

  // ดึงข้อมูล Exercise Activities
  useEffect(() => {
    const fetchActivities = async () => {
      const res = await GetExerciseActivityByUserID(userId);
      console.log("Fetched activities:", res?.data); // เพิ่มบรรทัดนี้
      if (res?.data) {
        setExerciseActivities(res.data);
      }
    };
    fetchActivities();
  }, [userId]);

  // ดึงข้อมูล Exercise Types
  useEffect(() => {
    const fetchTypes = async () => {
      const res = await ListExerciseTypes();
      if (res?.data) {
        setExerciseTypes(res.data);
      }
    };
    fetchTypes();
  }, []);

  // ดึง Exercises ตาม ExerciseTypeID ที่เลือก (ตัวอย่างดึงทั้งหมด หรือจะดัดแปลงตามต้องการ)
  useEffect(() => {
    const fetchExercises = async () => {
      let allExercises: IExercise[] = [];
      for (const type of exerciseTypes) {
        const res = await GetExercisesByExerciseTypeID(type.ID);
        if (res?.data) {
          allExercises = allExercises.concat(res.data);
        }
      }
      setExercises(allExercises);
    };

    if (exerciseTypes.length > 0) {
      fetchExercises();
    }
  }, [exerciseTypes]);

  // ฟังก์ชันจัดการลบกิจกรรม
  const handleDelete = async (id: number) => {
    await DeleteExerciseActivityByID(id.toString());
    setExerciseActivities(prev => prev.filter(a => a.ID !== id));
    setShowMenuId(null);
  };

  // ฟังก์ชันแก้ไขกิจกรรม
const handleEdit = (activity: IExerciseActivity) => {
  const exerciseTypeId = exercises.find((ex) => ex.ID === activity.ExerciseID)?.ExerciseTypeID;
  navigate(`/exercise-form?typeId=${exerciseTypeId}`, { state: { editingActivity: activity } });
};

  // ฟังก์ชันดูรายละเอียด
  const handleViewDetails = (activity: IExerciseActivity) => {
    const exercise = exercises.find((ex) => ex.ID === activity.ExerciseID);
    const type = exerciseTypes.find((et) => et.ID === exercise?.ExerciseTypeID);
    alert(
      `รายละเอียดกิจกรรม:\n\nกิจกรรม: ${exercise?.Name}\nประเภท: ${type?.Name}\nวันที่: ${activity.Date}\nระยะเวลา: ${activity.Duration} นาที\nแคลอรี: ${activity.CaloriesBurned} แคลอรี`
    );
    setShowMenuId(null);
  };

  // if (currentPage !== "record") {
  //   // TODO: ใส่เงื่อนไขแสดงหน้าอื่น ๆ เช่น form ได้ที่นี่
  //   return <div>หน้าฟอร์มบันทึกกิจกรรม (ยังไม่ทำ)</div>;
  // }

  useEffect(() => {
    if (currentPage !== "record") {
      navigate("/selectexercisetype");
    }
  }, [currentPage, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
        <NavBar />

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <SummaryCard title="วัน" value={exerciseActivities.length} />
          <SummaryCard title="นาที" value={exerciseActivities.reduce((s, a) => s + a.Duration, 0)} color="text-green-600" />
          <SummaryCard title="แคลอรี" value={exerciseActivities.reduce((s, a) => s + a.CaloriesBurned, 0)} color="text-green-800" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">กิจกรรมล่าสุด</h2>

        {/* Activity List */}
        {exerciseActivities.map((activity) => {
          const exercise = exercises.find(e => e.ID === activity.ExerciseID);
          return (
            <div key={activity.ID} className="bg-[#FCF2DD] p-4 rounded-xl shadow-sm p-4 relative mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{exercise?.Name}</h3>
                  <p className="text-sm text-gray-500">
                    {exerciseTypes.find((et) => et.ID === exercise?.ExerciseTypeID)?.Name}
                  </p>
                </div>
                <div className="text-right pr-4">
                  <p className="text-sm text-gray-500">{dayjs(activity.Date).format("D MMM YYYY เวลา HH:mm")}</p>
                  <div className="flex gap-2 text-sm text-gray-600 mt-1  justify-end">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {activity.Duration} นาที
                    <Flame className="w-4 h-4 text-red-400 ml-2" />
                    {activity.CaloriesBurned}
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              <div className="absolute top-2 right-2">
                <button onClick={() => setShowMenuId(showMenuId === activity.ID ? null : activity.ID)}>
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showMenuId === activity.ID && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded z-10">
                    <button onClick={() => handleViewDetails(activity)} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" /> ดูรายละเอียด
                    </button>
                    <button onClick={() => handleEdit(activity)} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2">
                      <Edit2 className="w-4 h-4" /> แก้ไข
                    </button>
                    <button onClick={() => handleDelete(activity.ID)} className="w-full px-4 py-2 text-left hover:bg-red-50 text-sm text-red-600 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" /> ลบ
                    </button>
                  </div>
                )}
              </div>

              {/* Click outside to close */}
              {showMenuId === activity.ID && (
                <div className="fixed inset-0 z-0" onClick={() => setShowMenuId(null)} />
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Activity */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setCurrentPage('activity-type')}
          className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-800 rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseActivityRecord;

// SummaryCard component
const SummaryCard: React.FC<{ title: string; value: number; color?: string }> = ({ title, value, color }) => (
  <div className="bg-[#FCF2DD] p-4 rounded-xl shadow-sm text-center">
    <div className={`text-2xl font-bold ${color || 'text-gray-900'}`}>{value}</div>
    <div className="text-sm text-gray-500">{title}</div>
  </div>
);
