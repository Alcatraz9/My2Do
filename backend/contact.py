from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres+psycopg2://postgres:R!shabh@localhost:5432/My2Do'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class ContactInfo(db.Model):
   __tablename__ = 'user_details'
   id = db.Column(db.Integer,primary_key=True)
   FirstName = db.Column(db.String)
   LastName = db.Column(db.String)
   Email = db.Column(db.String)
   Gender = db.Column(db.String)
   State = db.Column(db.String)
   City = db.Column(db.String)
   
   def __init__(self, FirstName, LastName, Email, Gender, City, State):
      self.FirstName = FirstName
      self.LastName = LastName
      self.Email = Email
      self.Gender = Gender
      self.City = City
      self.State = State


@app.route('/contact', methods=['POST'])
def post_ContactInfo():
   data = request.get_json()
   FirstName = data['FirstName']
   LastName = data['LastName']
   Email = data['Email']
   Gender = data['Gender']
   City = data['City']
   State = data['State']
   cs = ContactInfo(FirstName, LastName, Email, Gender, City, State)
   db.session.add(cs)
   db.session.commit()
   return jsonify(msg = "data is created"), 201

@app.route('/contact')
def get_ContactInfo():
   contact_info = ContactInfo.query.all()
   conList = []
   for con in contact_info:
      c={}
      c["LastName"] = con.LastName
      c["FirstName"] = con.FirstName
      c["Email"] = con.Email
      c["Gender"] = con.Gender
      c["City"] = con.City
      c["State"] = con.State
      conList.append(c)
   return jsonify(list=conList)

if __name__ == '__main__':
   db.create_all()
   app.run(debug=True)