import React from "react";
import { Button, Carousel, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./SlideCard.css";

import food1 from "../../assets/food/saladKai1.svg";
import food2 from "../../assets/food/saladPak1.svg";

const { Title } = Typography;

const slides = [
  { rank: 1, img: food1 },
  { rank: 2, img: food2 },
];

function SlideCard() {
  const navigate = useNavigate();

  const handleClick = (rank: number) => {
    navigate(`/recommend/${rank}`);
  };

  return (
    <div className="slidecard-container">
      <Row justify="space-between" align="middle">
        {/* Static Text */}
        <Col xs={24} md={10}>
          <div className="static-title">
            แนะนำรายการ
            <br />
            เมนูสุขภาพ
            <br />
            ที่เหมาะกับคุณ
          </div>
          <div className="start-btn">
            <button className="start-button">เริ่มต้นเลย</button>
          </div>
        </Col>

        {/* Sliding Content */}
        <Col xs={24} md={14}>
          <div className="carousel-wrapper">
            <Carousel autoplay>
              {slides.map((item) => (
                <div
                  key={item.rank}
                  className="slidecard-slide"
                >
                  <div className="slidecard-image-wrapper" onClick={() => handleClick(item.rank)}>
                    <img
                      src={item.img}
                      alt={`อันดับ ${item.rank}`}
                      className="slidecard-image"
                    />
                    <div className="hover-overlay">ดูรายละเอียดเพิ่มเติม</div>
                  </div>
                  <div className="slidecard-title">
                    อันดับ <span className="highlight">{item.rank}</span> ใน
                    <br />
                    สัปดาห์นี้!!!
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SlideCard;
