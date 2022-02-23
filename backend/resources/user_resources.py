from flask import request
from flask_restful import Resource

from models.user import User
from schemas.user_schemas import user_schema, users_schema

class UserListResource(Resource):
    def get(self):
        users = User.get_all()
        return users_schema.dump(users)

    def post(self):
        user = User(
            email = request.json['email'],
            password = request.json['password']
        )
        user.save(is_new=True)
        return user_schema.dump(user)


class UserResource(Resource):
    def get(self, user_id):
        user = User.get_by_id(user_id)
        return user_schema.dump(user)

    def patch(self, user_id):
        user: User = User.get_by_id(user_id)

        if 'email' in request.json:
            user.email = request.json['email']
        if 'password' in request.json:
            user.password = request.json['password']

        user.save(is_new=False)
        return user_schema.dump(user)

    def delete(self, user_id):
        user = User.get_by_id(user_id)
        user.delete()
        return '', 204
