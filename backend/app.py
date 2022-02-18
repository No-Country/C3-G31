from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:passw0rd@localhost/no_country?host=localhost"

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

@app.route("/")
def func():
     return "Hola mundo"

@app.route("/crearUsuario")
def test():
     user1 = User(id=3, name='maria')
     db.session.add(user1)
     db.session.commit()

     return json.dumps(user1.__dict__) # Revisar, no funciona

    
if __name__ == '__main__':
     app.run(debug=True)
