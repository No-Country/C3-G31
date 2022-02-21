from flask import Flask, json
from flask_migrate import Migrate
from flask_restful import Api
from werkzeug.exceptions import HTTPException

from config.db import db
from config.marsh import ma
from resources.user_resources import UserListResource, UserResource

app = Flask(__name__)
app.config.from_object('config.default')
db.init_app(app)
ma.init_app(app)

migrate = Migrate()
migrate.init_app(app, db)


@app.errorhandler(HTTPException)
def handle_httpexception(e: HTTPException):
    response = e.get_response()
    response.data = json.dumps({
        'code': e.code,
        'name': e.name,
        'description': e.description
    })
    response.content_type = 'application/json'
    return response

@app.errorhandler(Exception)
def handle_exception(e: Exception):
    if isinstance(e, HTTPException):
        return e
        
    return {
        'code': 500,
        'name': type(e).__name__,
        'description': str(e)
    }


api = Api(app)

api.add_resource(UserListResource, '/api/users')
api.add_resource(UserResource, '/api/users/<int:user_id>')


if __name__ == '__main__':
     app.run(debug=True)
