import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import food1 from "../../../../assets/food/food1.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { GetAllFoodRecommendWithRanking } from "../../../../services/https";
import type { IFoodRecommend } from "../../../../interfaces/IFoodRecommend";
import {apiUrl} from "../../../../services/https/index"



const HeroSection: React.FC = () => {
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const [slides, setSlides] = useState<IFoodRecommend[]>([]);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  useEffect(() => {
    const fetchRankingFoods = async () => {
      try {
        const response = await GetAllFoodRecommendWithRanking();
        const sorted = response.data.sort(
          (a: IFoodRecommend, b: IFoodRecommend) => 
            parseInt(a.Ranking?.Rank || "0") - parseInt(b.Ranking?.Rank || "0")
        );
        setSlides(sorted.slice(0, 5));
      } catch (error) {
        console.error("Error fetching ranking foods:", error);
      }
    };

    fetchRankingFoods();
  }, []);

  console.log("Slide: ", slides)

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
            <div key={item.ID}>
              <div className="flex items-center justify-between flex-col lg:flex-row">
                {/* Left Text */}
                <div className="flex-1 text-center lg:text-right mb-10 lg:mb-0">
                  <div className="text-2xl font-bold mb-6 text-gray-800">
                    อันดับ <span className="text-red-500">{item.Ranking?.Rank}</span> ใน
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
                      src={`${apiUrl}/${item.Food.ImageUrl}` || food1}
                      alt={`อันดับ ${item.Food.FoodName}`}
                      className="w-70 h-70 rounded-full object-cover transition duration-300 hover:scale-90 cursor-pointer"
                      onClick={() => navigate(`/recipe/${encodeURIComponent(item.Food.FoodName)}`)}
                    />
                    <div className="flex-1 text-center lg:text-center mb-10 lg:mb-0">
                      <br />
                      <span className="text-green-600 font-bold">{item.Food.FoodName}</span>
                    </div>

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

         {/* CTA Button */}
        <button 
          onClick={() => navigate("/create/recommand")}
          className="bg-[#c5dd78] cursor-pointer hover:bg-[#b9d26b] hover:shadow-lg text-gray-800 font-semibold px-6 py-3 rounded-full transition duration-300 absolute bottom-4 left-1/8 transform -translate-x-1/2"
        >
          เริ่มต้นเลย
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
