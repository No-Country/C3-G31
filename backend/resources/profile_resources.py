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
            foto =  request.json['foto'],
            disponibilidad_viajar =request.json['disponibilidad_viajar'],
            movilidad_propia =request.json['movilidad_propia'],
            discapacidad =request.json['discapacidad']
        )
        profile.save(is_new=True)
        return profile_schema.dump(profile)

        #habria que agregar esto
        # form_data = request.get_json()
        # profile = Profile(
        #     user_id = user.id,
        #     nombre = form_data['nombre'],
        #     apellido = form_data['apellido'],
        #     fecha_nacimiento = form_data['fechaNacimiento'], 
        #     presentacion = form_data['presentacion'],
        #     telefono = form_data['telefono'],
        #     foto = Profile.guardarFoto(form_data['foto']),
        #     movilidad_propia =  form_data['movilidad'],
        #     disponibilidad_viajar =  form_data['disponibilidadViajar'],
        #     discapacidad =  form_data['discapacidad']
        # )
        # profile.save(is_new=True)
        # user.profile = profile
