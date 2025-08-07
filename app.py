from flask import Flask, request, jsonify,json
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'roottoor'
app.config['MYSQL_DB'] = 'blood'

# Initialize MySQL
mysql = MySQL(app)

# Home route
@app.route('/')
def index():
    return "Welcome to the Blood Donation Website"

# Register route
@app.route('/register', methods=["POST"])
def register():
    data=request.get_json()
    name=data['name']
    usn=data['usn']
    cur=mysql.connection.cursor()
    sql="insert into donar(name,usn) values(%s,%s)"
    val=[name,usn]
    cur.execute(sql,val)

    mysql.connection.commit()
    cur.close()
    return "success"

@app.route('/login',methods=["post"])
def login():
    data=request.get_json()
    name=data["name"]
    usn=data["usn"]
    cur=mysql.connection.cursor()
    cur.execute("select * from donar where name=%s and usn=%s",(name,usn))
    results=cur.fetchall()
    cur.close()
    if results:
        return "present"
    else:
        return "no"

@app.route('/update',methods=["post"])
def update():
    data=request.get_json()
    usn =request.get_json()
    dob=data["dob"]
    gender=data["gender"]
    bloodgroup=data["bloodgroup"]
    location=data["location"]
    mobile_number=data["mobile_number"]
    role=data["role"]
    cur=mysql.connection.cursor()
    cur.execute("update donar set dob=%s,gender=%s,bloodgroup=%s,location=%s,mobile_number=%s",(dob,gender,bloodgroup,location,mobile_number))
    mysql.connection.commit()
    cur.close()
    return "updated"







if __name__=="__main__":
    app.run(debug=True)
   
   