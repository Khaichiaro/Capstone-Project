import React, { use, useState } from "react";
import Slider from "react-slick";
import SladKai from "../../../../assets/food/saladKai1.svg";
import SaladPak from "../../../../assets/food/saladPak1.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigate, useNavigate } from "react-router-dom";

const slides = [
  { rank: 1, img: SladKai },
  { rank: 2, img: SaladPak },
  { rank: 3, img: SladKai },
];

const HeroSection: React.FC = () => {
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="bg-[#FDF2DC] px-8 py-12 shadow-lg">
      <div className="max-w-6xl mx-auto relative">
        <h1 className="absolute top-4 left-4 text-4xl font-bold text-gray-800 z-10 leading-snug">
          แนะนำรายการ
          <br />
          เมนูสุขภาพ
          <br />
          ที่เหมาะกับคุณ
        </h1>

        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.rank}>
              <div className="flex items-center justify-between flex-col lg:flex-row">
                {/* Left Text */}
                <div className="flex-1 text-center lg:text-right mb-10 lg:mb-0">
                  <div className="text-2xl font-bold mb-6 text-gray-800">
                    อันดับ <span className="text-red-500">{item.rank}</span> ใน
                    <br />
                    สัปดาห์นี้!!!
                  </div>
                </div>

                {/* Right image */}
                <div className="flex-1 flex justify-center">
                  <div
                    className="relative"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <img
                      src={item.img}
                      alt={`อันดับ ${item.rank}`}
                      className="w-70 h-70 rounded-full object-cover transition duration-300 hover:scale-90 cursor-pointer"
                      onClick={() => alert(`คุณเลือกอันดับ ${item.rank}`)}
                    />

                    {/* Tooltip */}
                    {showTooltip && tooltipPos && (
                      <div
                        className="absolute bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded shadow z-20"
                        style={{
                          top: tooltipPos.y,
                          left: tooltipPos.x,
                          transform: "translate(-50%, -150%)",
                          pointerEvents: "none",
                        }}
                      >
                        ดูรายละเอียดเพิ่มเติม
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button 
        onClick={() => navigate("/create/recommand")}
        className="bg-[#D1E898] cursor-pointer hover:bg-[#b9d26b] hover:shadow-lg text-gray-800 font-semibold px-6 py-3 rounded-full transition duration-300 absolute bottom-4 left-1/8 transform -translate-x-1/2">
          เริ่มต้นเลย
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
