from flask import Flask
from flask_migrate import Migrate
from config.db import db
from routes.user_bp import user_bp

app=Flask(__name__)
app.config.from_object('config.default')
db.init_app(app)

migrate = Migrate()
migrate.init_app(app, db)

app.register_blueprint(user_bp, url_prefix='/users')

@app.route("/")
def func():
     return "Hola munddo"


if __name__ == '__main__':
     app.run(debug=True)
