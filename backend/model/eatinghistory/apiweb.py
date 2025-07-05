# app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# โหลดโมเดล
model = joblib.load('kmeans_model.pkl')

# คำอธิบายแต่ละกลุ่ม
cluster_desc = {
    0: "กลุ่มผู้บริโภคไขมันสูง คาร์บสูง",
    1: "กลุ่มกินสมดุล โปรตีนพอเหมาะ",
    2: "กลุ่มควบคุมน้ำหนัก กินผักผลไม้สูง",
    3: "กลุ่มโปรตีนสูง อาหารสายฟิตเนส",
    4: "กลุ่มกินอาหารเพื่อสุขภาพ โปรตีนสูง",
    5: "กลุ่มกินอาหารหลากหลาย คาร์บสูง",
    6: "กลุ่มกินอาหารจานด่วนและขนมหวานบ่อย",
}

# @app.route('/predict_cluster', methods=['POST'])
def predict_cluster():
    data = request.get_json()

    # รับค่าจาก frontend
    input_data = [
        data['avg_calories'],
        data['avg_protein'],
        data['avg_fat'],
        data['avg_carb'],
        data['freq_fruit'],
        data['freq_veg'],
        data['freq_fastfood']
    ]

    cluster = int(model.predict([input_data])[0])

    return jsonify({
        'cluster': cluster,
        'description': cluster_desc[cluster]
    })

if __name__ == '__main__':
    app.run(debug=True)
