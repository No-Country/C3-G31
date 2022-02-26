from datetime import datetime
from flask import request
from backend.models.direccion import Direccion, Localidad
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from models.user import User
from schemas.user_schemas import user_schema, users_schema, user_register_schema
from schemas.direccion_schemas import direccion_schema,localidad_schema, provincia_schema


class DireccionListResource(Resource):
    def get(self):
        direcciones = Direccion.get_all()
        return direccion_schema.dump(direcciones)

    def post(self):
        form_data = request.get_json()
        calle= form_data['calle']
        numero= form_data['numero']
        piso= form_data['piso']
        depto= form_data['depto']
        observaciones= form_data['observaciones']
        
        user_id= form_data['user_id']

        direccion = Direccion()
        direccion.calle=calle
        direccion.numero=numero
        direccion.piso=piso
        direccion.depto=depto
        direccion.observaciones=observaciones
        direccion.user_id=user_id
        
        direccion.save(is_new=True)

        localidad = Localidad(
            direccion_id = direccion.id,
            nombre = form_data['nombre'],
            apellido = form_data['apellido'],
            fecha_nacimiento = datetime(2000, 1, 1)
        )
        profile.save(is_new=True)
        user.profile = profile

        return user_schema.dump(user), 201


class TokenResource(Resource):

    def post(self):
        form_data = request.get_json()
        errors = user_register_schema.validate(form_data)
        if(errors):
            return {"errors": errors}, 400

        email = form_data['email']
        password = form_data['password']

        user = User.query.filter_by(email=email).first()
        bad_response = {"msg": "Bad username or password"}, 401

        if user is None:
            return bad_response

        if not user.check_password(password):
            return bad_response

        access_token = create_access_token(identity=user.id)

        return {"token": access_token, "user": user_schema.dump(user)}


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
