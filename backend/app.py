from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api

from config.db import db
from config.marsh import ma
from resources.user_resources import UserListResource, UserResource

app=Flask(__name__)
app.config.from_object('config.default')
db.init_app(app)
ma.init_app(app)

migrate = Migrate()
migrate.init_app(app, db)

api = Api(app)

api.add_resource(UserListResource, '/api/users')
api.add_resource(UserResource, '/api/users/<int:user_id>')


if __name__ == '__main__':
     app.run(debug=True)
