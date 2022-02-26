from flask import request
from flask_restful import Resource

from models.profile import Profile
from schemas.profile_schemas import profile_schema, profiles_schema

class ProfileListResource(Resource):
    def get(self):
        profiles = Profile.get_all()
        return profiles_schema.dump(profiles)

    def post(self):
        profile = Profile(
            user_id = request.json['user_id'],
            nombre = request.json['nombre'],
            apellido = request.json['apellido'],
            telefono = request.json['telefono'],
            fecha_nacimiento = request.json['fecha_nacimiento'],
            presentacion =request.json['sobreTi'],
            foto = request.json['foto'],
            disponibilidad_viajar =request.json['disponibilidad_viajar'],
            movilidad_propia =request.json['movilidad_propia'],
            discapacidad =request.json['discapacidad']
        )
        profile.save(is_new=True)
        return profile_schema.dump(profile)
