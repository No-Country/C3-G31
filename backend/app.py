import flask_sqlalchemy

from flask import Flask, json
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from werkzeug.exceptions import HTTPException
from flask_marshmallow import sqla
from config.db import db
from config.marsh import ma
from resources.user_resources import UserListResource, UserResource, TokenResource
from resources.profile_resources import ProfileListResource
from resources.empresa_resources import EmpresaListResource, EmpresaResource
from resources.empleo_resource import EmpleoListResource, EmpleoResource



app = Flask(__name__)
app.config.from_object('config.default')
CORS(app)
db.init_app(app)
ma.init_app(app)

migrate = Migrate()
migrate.init_app(app, db)

jwt = JWTManager(app)

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
api.add_resource(TokenResource, '/api/users/token')

api.add_resource(ProfileListResource, '/api/profiles')
# api.add_resource(ProfileResource)

api.add_resource(EmpresaListResource, '/api/empresas')
api.add_resource(EmpresaResource, '/api/empresas/<int:empresa_id>')

api.add_resource(EmpleoListResource, '/api/empleos')
api.add_resource(EmpleoResource, '/api/empleos/<int:empleo_id>')

if __name__ == '__main__':
     app.run(debug=False)
