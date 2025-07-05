package entity

import "gorm.io/gorm"

type ActivityType struct {
	gorm.Model
	Name         string
	DefaultPoint int
}

//กำหนดประเภทกิจกรรมที่ให้คะแนนและคะแนนเริ่มต้น