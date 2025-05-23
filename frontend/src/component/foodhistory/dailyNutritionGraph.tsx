// components/DailyNutritionGraph.tsx
import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { type FoodEntryData } from '../../component/foodhistory/types';

interface DailyNutritionGraphProps {
    entryId: string;
    onClose: () => void;
}

const DailyNutritionGraph: React.FC<DailyNutritionGraphProps> = ({ entryId, onClose }) => {
    const [graphType, setGraphType] = useState<'bar' | 'pie'>('bar');
    const [entryData, setEntryData] = useState<FoodEntryData | null>(null);

    useEffect(() => {
        // ในโค้ดจริง จะดึงข้อมูลจาก API หรือ store
        // นี่เป็นข้อมูลตัวอย่าง
        const mockEntry: FoodEntryData = {
            id: entryId,
            date: '10 ก.พ. 2565',
            breakfast: {
                name: 'ข้าวไข่เจียว',
                calories: 153,
                image: '/images/kai-jeaw.png'
            },
            lunch: {
                name: 'ก๋วยเตี๋ยว',
                calories: 178,
                image: '/images/noodle.png'
            },
            dinner: {
                name: 'โค๊ก',
                calories: 150,
                image: '/images/coke.png'
            },
            nutritionData: {
                calories: 481,
                fat: 15,
                carbs: 65,
                protein: 20
            }
        };

        setEntryData(mockEntry);
    }, [entryId]);

    if (!entryData) {
        return <div className="loading">กำลังโหลด...</div>;
    }

    // ข้อมูลสำหรับกราฟแท่ง
    const barData = [
        { name: 'แคลอรี่', value: entryData.nutritionData.calories, unit: 'kcal', color: '#FF8042' },
        { name: 'ไขมัน', value: entryData.nutritionData.fat, unit: 'g', color: '#FFBB28' },
        { name: 'คาร์โบไฮเดรต', value: entryData.nutritionData.carbs, unit: 'g', color: '#00C49F' },
        { name: 'โปรตีน', value: entryData.nutritionData.protein, unit: 'g', color: '#0088FE' }
    ];

    // ข้อมูลสำหรับกราฟวงกลม
    const pieData = [
        { name: 'ไขมัน', value: entryData.nutritionData.fat, color: '#FFBB28' },
        { name: 'คาร์โบไฮเดรต', value: entryData.nutritionData.carbs, color: '#00C49F' },
        { name: 'โปรตีน', value: entryData.nutritionData.protein, color: '#0088FE' }
    ];

    // Custom tooltip สำหรับกราฟแท่ง
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].name}: ${payload[0].value}${payload[0].payload.unit}`}</p>
                </div>
            );
        }
        return null;
    };

    const totalCalories = entryData.nutritionData.calories;
    const totalFat = entryData.nutritionData.fat;
    const totalCarbs = entryData.nutritionData.carbs;
    const totalProtein = entryData.nutritionData.protein;

    return (
        <div className="nutrition-graph-container">
            <div className="nutrition-graph-header">
                <h2>สรุปโภชนาการ {entryData.date}</h2>
                <div className="graph-controls">
                    <button
                        className={`graph-button ${graphType === 'bar' ? 'active' : ''}`}
                        onClick={() => setGraphType('bar')}
                    >
                        กราฟแท่ง
                    </button>
                    <button
                        className={`graph-button ${graphType === 'pie' ? 'active' : ''}`}
                        onClick={() => setGraphType('pie')}
                    >
                        กราฟวงกลม
                    </button>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>
            </div>

            <div className="nutrition-summary flex flex-wrap gap-4 justify-center">
                <div className="nutrition-box rounded-xl shadow-md border border-gray-200 p-4 bg-white w-40 text-center">
                    <p className="nutrition-label text-gray-600">แคลอรี่</p>
                    <p className="nutrition-value calories text-2xl font-bold text-orange-500">{totalCalories}</p>
                    <p className="nutrition-unit text-gray-500">kcal</p>
                </div>
                <div className="nutrition-box rounded-xl shadow-md border border-gray-200 p-4 bg-white w-40 text-center">
                    <p className="nutrition-label text-gray-600">ไขมัน</p>
                    <p className="nutrition-value fat text-2xl font-bold text-red-400">{totalFat}</p>
                    <p className="nutrition-unit text-gray-500">กรัม</p>
                </div>
                <div className="nutrition-box rounded-xl shadow-md border border-gray-200 p-4 bg-white w-40 text-center">
                    <p className="nutrition-label text-gray-600">คาร์โบไฮเดรต</p>
                    <p className="nutrition-value carbs text-2xl font-bold text-blue-400">{totalCarbs}</p>
                    <p className="nutrition-unit text-gray-500">กรัม</p>
                </div>
                <div className="nutrition-box rounded-xl shadow-md border border-gray-200 p-4 bg-white w-40 text-center">
                    <p className="nutrition-label text-gray-600">โปรตีน</p>
                    <p className="nutrition-value protein text-2xl font-bold text-green-500">{totalProtein}</p>
                    <p className="nutrition-unit text-gray-500">กรัม</p>
                </div>
            </div>


            <div className="graph-container">
                <ResponsiveContainer width="100%" height={300}>
                    {graphType === 'bar' ? (
                        <BarChart
                            data={barData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="value">
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} กรัม`, '']} />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div className="meal-nutrient-breakdown">
                <h3>สัดส่วนสารอาหารแต่ละมื้อ</h3>
                <div className="meal-breakdown-items">
                    <div className="meal-item">
                        <h4>มื้อเช้า: {entryData.breakfast.name}</h4>
                        <div className="meal-nutrients">
                            <span className="meal-nutrient">แคลอรี่: {entryData.breakfast.calories} kcal</span>
                            <span className="meal-nutrient">ไขมัน: {Math.round(totalFat * 0.3)} g</span>
                            <span className="meal-nutrient">คาร์โบไฮเดรต: {Math.round(totalCarbs * 0.35)} g</span>
                            <span className="meal-nutrient">โปรตีน: {Math.round(totalProtein * 0.3)} g</span>
                        </div>
                    </div>
                    <div className="meal-item">
                        <h4>มื้อเที่ยง: {entryData.lunch.name}</h4>
                        <div className="meal-nutrients">
                            <span className="meal-nutrient">แคลอรี่: {entryData.lunch.calories} kcal</span>
                            <span className="meal-nutrient">ไขมัน: {Math.round(totalFat * 0.45)} g</span>
                            <span className="meal-nutrient">คาร์โบไฮเดรต: {Math.round(totalCarbs * 0.4)} g</span>
                            <span className="meal-nutrient">โปรตีน: {Math.round(totalProtein * 0.45)} g</span>
                        </div>
                    </div>
                    <div className="meal-item">
                        <h4>มื้อเย็น: {entryData.dinner.name}</h4>
                        <div className="meal-nutrients">
                            <span className="meal-nutrient">แคลอรี่: {entryData.dinner.calories} kcal</span>
                            <span className="meal-nutrient">ไขมัน: {Math.round(totalFat * 0.25)} g</span>
                            <span className="meal-nutrient">คาร์โบไฮเดรต: {Math.round(totalCarbs * 0.25)} g</span>
                            <span className="meal-nutrient">โปรตีน: {Math.round(totalProtein * 0.25)} g</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyNutritionGraph;