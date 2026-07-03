from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'roottoor'
app.config['MYSQL_DB'] = 'blood'

mysql = MySQL(app)


@app.route('/')
def home():
    return jsonify({"message": "Blood Donation API Running"})


@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    name = data['name']
    usn = data['usn']

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM donar WHERE usn=%s", (usn,))
    user = cur.fetchone()

    if user:
        cur.close()
        return jsonify({"message": "User already exists"}), 400

    cur.execute(
        "INSERT INTO donar(name,usn) VALUES(%s,%s)",
        (name, usn)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Registration Successful"})



@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    name = data['name']
    usn = data['usn']

    cur = mysql.connection.cursor()

    cur.execute(
        "SELECT * FROM donar WHERE name=%s AND usn=%s",
        (name, usn)
    )

    user = cur.fetchone()

    cur.close()

    if user:
        return jsonify({
            "message": "login successful"
        })

    return jsonify({
        "message": "Invalid Credentials"
    }), 401



@app.route('/profile_update', methods=['POST'])
def profile_update():

    data = request.get_json()

    cur = mysql.connection.cursor()

    cur.execute("""
        UPDATE donar
        SET
            role=%s,
            dob=%s,
            gender=%s,
            bloodgroup=%s,
            location=%s,
            mobile_number=%s
        WHERE usn=%s
    """,
    (
        data['role'],
        data['dob'],
        data['gender'],
        data['blood_group'],
        data['location'],
        data['contact'],
        data['usn']
    ))

    mysql.connection.commit()

    cur.close()

    return jsonify({
        "message": "Profile Updated Successfully"
    })



@app.route('/get_donor', methods=['POST'])
def get_donor():

    data = request.get_json()

    blood = data["blood_group"]

    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT name,usn,dob,gender,location,bloodgroup,mobile_number
        FROM donar
        WHERE bloodgroup=%s
    """, (blood,))

    result = cur.fetchall()

    cur.close()

    return jsonify(result)


@app.route('/get_donordetails', methods=['POST'])
def donor_details():

    data = request.get_json()

    name = data["name"]

    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT name,usn,dob,gender,location,bloodgroup,mobile_number
        FROM donar
        WHERE name=%s
    """, (name,))

    result = cur.fetchone()

    cur.close()

    if result:
        return jsonify(result)

    return jsonify({"message": "Donor Not Found"}),404


@app.route('/delete_profile', methods=['POST'])
def delete_profile():

    data = request.get_json()

    usn = data["usn"]

    cur = mysql.connection.cursor()

    cur.execute(
        "DELETE FROM donar WHERE usn=%s",
        (usn,)
    )

    mysql.connection.commit()

    cur.close()

    return jsonify({
        "message": "Profile Deleted Successfully"
    })


if __name__ == "__main__":
    app.run(debug=True)
