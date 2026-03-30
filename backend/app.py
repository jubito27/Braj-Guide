from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # Frontend se connect karne ke liye

app = Flask(__name__)
CORS(app)

# Database Configuration (Username, Password aur DB Name check kar lein)
# Format: mysql+pymysql://username:password@localhost/database_name
# root ki jagah brij_user aur apna password dalein
# 'Password@123' ki jagah 'Password%40123' likhein
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://brij_user:Password%40123@localhost/brij_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Model (Table structure)
class UserRegistration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    city = db.Column(db.String(50))
    visit_date = db.Column(db.String(20))
    members = db.Column(db.Integer)
    places = db.Column(db.Text)
    days = db.Column(db.Integer)

# Table create karne ke liye (Sirf pehli baar run hoga)
with app.app_context():
    db.create_all()
    
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    
    try:
        # Khali values ko handle karne ke liye logic
        def clean_int(val):
            try:
                return int(val) if val else 0
            except:
                return 0

        new_user = UserRegistration(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            city=data.get('city', ''),
            visit_date=data.get('visitDate', ''),
            # Yahan hum check kar rahe hain ki agar number nahi hai toh 0 ya 1 save ho
            members=clean_int(data.get('noOfMembers')),
            places=data.get('placesInterested', ''),
            days=clean_int(data.get('noOfDays'))
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Radhe Radhe! Data saved successfully!"}), 201
    except Exception as e:
        print(f"Error: {e}") # Debugging ke liye terminal pe error dikhega
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)