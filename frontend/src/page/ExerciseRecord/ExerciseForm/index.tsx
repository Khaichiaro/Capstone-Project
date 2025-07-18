// ExerciseForm.tsx
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

// import { ArrowLeft } from 'lucide-react';
import { GetExercisesByExerciseTypeID, CreateExerciseActivity, UpdateExerciseActivityByID } from '../../../services/https';
import type { IExercise } from '../../../interfaces/IExercise';
import type { IExerciseActivity } from '../../../interfaces/IExerciseActivity';
import NavBar from '../../../component/navbar/NavBar';

const ExerciseForm = () => {
  const [searchParams] = useSearchParams();
  const typeId = Number(searchParams.get("typeId"));
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id") || "";  // ดึง userId จาก localStorage (หรือจะใช้วิธีอื่นก็ได้)

  console.log("user_id:", userId);


  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [formData, setFormData] = useState({
    exerciseId: "",
    date: "",
    duration: "",
    calories: ""
  });

  const location = useLocation();
  const editingActivity = location.state?.editingActivity as IExerciseActivity | null;


  // ดึงข้อมูล exercises ตามประเภท
  useEffect(() => {
    const fetch = async () => {
      const res = await GetExercisesByExerciseTypeID(typeId);
      if (res?.data) setExercises(res.data);
    };
    if (typeId) fetch();
  }, [typeId]);

  useEffect(() => {
    if (editingActivity) {
    setFormData({
      exerciseId: editingActivity.ExerciseID.toString(),
      date: editingActivity.Date.split("T")[0], // ตัดเวลาออก
      duration: editingActivity.Duration.toString(),
      calories: editingActivity.CaloriesBurned.toString(),
    });
    }
  }, [editingActivity]);

  const calculateCalories = () => {
    const selectedExercise = exercises.find((e) => e.ID === Number(formData.exerciseId));
    if (selectedExercise && formData.duration) {
      const cal = selectedExercise.CaloriesBurnPerMinute * parseInt(formData.duration);
      setFormData({ ...formData, calories: cal.toString() });
    }
  };

const handleSubmit = async () => {
  const payload = {
    ExerciseID: Number(formData.exerciseId),
    Date: new Date(formData.date).toISOString(),
    Duration: Number(formData.duration),
    CaloriesBurned: Number(formData.calories),
    UserID: Number(userId),
  };

  let res;
  if (editingActivity) {
    res = await UpdateExerciseActivityByID(editingActivity.ID.toString(), payload);
  } else {
    res = await CreateExerciseActivity(payload);
  }

  console.log("📦 res:", res);

  if (res?.status === 200 || res?.status === 201) {
    navigate("/exerciseactivityrecord");
  } else {
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
        <NavBar />

      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
            {editingActivity ? 'แก้ไข' : 'บันทึก'}กิจกรรม
        </h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">กิจกรรม</label>
            <select
              value={formData.exerciseId}
              onChange={(e) => setFormData({ ...formData, exerciseId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">เลือกกิจกรรม</option>
              {exercises.map((ex) => (
              <option key={ex.ID} value={ex.ID}>{ex.Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">วันที่</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลา (นาที)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">แคลอรี</label>
              <button
                onClick={calculateCalories}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                คำนวณแคลอรี
              </button>
            </div>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-400 to-yellow-200 text-white rounded-lg"
            >
              {editingActivity ? 'อัปเดต' : 'บันทึก'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center hover:bg-gray-200 transition-colors "
        >
          <ArrowLeft className="w-8 h-8 text-white" />
        </button>
      </div>  

      
    </div>
  );
};

export default ExerciseForm;
