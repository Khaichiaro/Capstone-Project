# คำสั่งรัน 
# source venv/bin/activate
# uvicorn model_api:app --host 0.0.0.0 --port 8001

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import cv2
from skimage import io as skio
import numpy as np
import pandas as pd
import io as io_bytes
import matplotlib.pyplot as plt

app = FastAPI()

# เปิด CORS สำหรับ frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # หรือเฉพาะ origin ที่คุณใช้
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดลและข้อมูล
key_list = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09','10', '11', '12', '13', '14', '15', '16', '17', '18', '19','20'
            , '21', '22', '23', '24', '25', '26', '27', '28', '29','30', '31', '32', '33', '34', '35', '36', '37', '38','39''40', '41'
            ,'42', '43', '44', '45', '46', '47', '48']

val_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,48]

best_model = tf.keras.models.load_model('/Users/gam/Desktop/Capstone-Project/backend/controller/python-model/classify_model.keras')
df = pd.read_csv('/Users/gam/Desktop/Capstone-Project/backend/controller/python-model/thai_food_menu.csv')

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    resized_img = cv2.resize(img, (224, 224))
    img_tensor = tf.convert_to_tensor(resized_img, dtype=tf.float32)
    img_tensor = tf.expand_dims(img_tensor, 0)

    prediction = best_model.predict(img_tensor)
    prediction = prediction.argmax()
    label = key_list[val_list.index(prediction)]

    # ค้นหาชื่ออาหารไทย
    thai_name = df[df['Menu Code No.'].astype(str).str.zfill(2) == label]['Thai Name'].values
    if len(thai_name) == 0:
        return {"error": "ไม่พบรหัสอาหาร"}
    
    return {"food_name": thai_name[0], "code": label}
