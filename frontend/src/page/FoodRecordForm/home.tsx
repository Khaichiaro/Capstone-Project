import React, { useState } from 'react';
import FoodHistory from '../../component/foodhistory/foodhistory';
import DailyNutritionGraph from '../../component/foodhistory/dailyNutritionGraph';
import './home.css';
import NavBar from '../../component/navbar/NavBar';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showNutritionGraph, setShowNutritionGraph] = useState<boolean>(false);
  const [activeFoodEntryId, setActiveFoodEntryId] = useState<string | null>(null);

  // Handler for search button
  const handleSearch = () => {
    // ในโค้ดจริงอาจมีการเรียก API หรือกรองข้อมูลตามวันที่เลือก
    console.log('Searching for:', { selectedDate, selectedMonth, selectedYear });
  };

  // Handler for when a food entry is clicked
  const handleFoodEntryClick = (id: string) => {
    setActiveFoodEntryId(id);
    setShowNutritionGraph(true);
  };



    const handleToSavefood = () => {
    navigate('/foodintake');
  };

  return (
    <div className="app-container">
      <NavBar />
      
      <div className="search-container">
        <div className="search-inputs">
          <div className="select-wrapper">
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-select"
              style={{
                  borderStyle: 'solid',
                  height: '50px',
                  borderWidth: '3px',
                  borderColor: '#FFF9E9',
                  borderRadius: '10px',     
                  padding: '5px'           
                }}
            >
              <option value="">วันที่</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={`day-${day}`} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="select-wrapper">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="month-select"
                            style={{
                  borderStyle: 'solid',
                  height: '50px',
                  borderWidth: '3px',
                  borderColor: '#FFF9E9',
                  borderRadius: '10px',     
                  padding: '5px'           
                }}
            >
              <option value="">เดือน</option>
              <option value="1">มกราคม</option>
              <option value="2">กุมภาพันธ์</option>
              <option value="3">มีนาคม</option>
              <option value="4">เมษายน</option>
              <option value="5">พฤษภาคม</option>
              <option value="6">มิถุนายน</option>
              <option value="7">กรกฎาคม</option>
              <option value="8">สิงหาคม</option>
              <option value="9">กันยายน</option>
              <option value="10">ตุลาคม</option>
              <option value="11">พฤศจิกายน</option>
              <option value="12">ธันวาคม</option>
            </select>
          </div>
          <div className="select-wrapper">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-select"
                            style={{
                  borderStyle: 'solid',
                  height: '50px',
                  borderWidth: '3px',
                  borderColor: '#FFF9E9',
                  borderRadius: '10px',     
                  padding: '5px'           
                }}
            >
              <option value="">ปี</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={`year-${year}`} value={year}>{year + 543}</option> // แปลงเป็นปี พ.ศ.
              ))}
            </select>
          </div>
          <button className="search-button" 
            onClick={handleSearch}
            style={{ 
                background: '#CCE98B',
                borderRadius: '10px',
            }}>
            
            ค้นหา
          </button>
        </div>
      </div>

      {/* Add Food Entry Button */}
      <div className="add-food-entry-container" style={{ 
        textAlign: 'center', 
        margin: '20px 0',
        padding: '0 20px'
      }}>
        <button 
          className="add-food-entry-button"
          onClick={handleToSavefood}
          style={{
            background: '#303437',
            color: '#ffffff',
            border: 'none',
            borderRadius: '15px',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            minWidth: '200px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#43b489';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#303437';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          + บันทึกการกินอาหาร
        </button>
      </div>

      {showNutritionGraph && activeFoodEntryId && (
        <DailyNutritionGraph 
          entryId={activeFoodEntryId} 
          onClose={() => setShowNutritionGraph(false)} 
        />
      )}
      
      <FoodHistory onFoodEntryClick={handleFoodEntryClick} />
    </div>
  );
};

export default App;