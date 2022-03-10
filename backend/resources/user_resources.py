import email
from urllib import response
from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from sqlalchemy import false, true
from models.profile import Profile
from models.user import User
from schemas.user_schemas import user_schema, users_schema, user_register_schema
from models.direccion import Direccion, Localidad, Provincia
from models.curriculum import Curriculum
import datetime

class UserListResource(Resource):
    def get(self):
        users = User.get_all()
        
        return users_schema.dump(users)

    def post(self):
        #form_data = request.get_json()
        form_data=request.form
        tieneFoto=form_data["tieneFoto"]
        tieneCv=form_data["tieneCv"]
        # errors = user_register_schema.validate(form_data)
        # if(errors):
        #     return {"errors": errors}, 400

        email = form_data['email']
        password = form_data['password']

        if User.email_exists(email):
             return {"errors":
                 {"email": ['this email already exists ']}
             }, 400

        # curriculum = Curriculum(
        #     direccionDeArchivo="",
        #     user_id = user.id
        # )

        # if tieneCv=="si":
        #     cv = request.files["curriculum"]
        #     curriculum.direccionDeArchivo=curriculum.guardarCurriculum(cv)

        # curriculum.save(is_new=True)
        # user.curriculum=curriculum
        
        #TODO: Cambiar guardado de localidad y provincia, no se debería insertar en esas tablas
        direccion=Direccion(
            calle= form_data['calle'],
            numero= form_data['numero'],
            piso= form_data['piso'],
            depto= form_data['depto'],
            observaciones= form_data['observacionesDomicilio']
        )
        direccion.save(is_new=True)
        localidad=Localidad(
            nombre= form_data['localidad'],
            codigoPostal= form_data['cp'],
            direccion_id=direccion.id
        )
        localidad.save(is_new=True)
        provincia=Provincia(
            nombre=form_data['provincia'],
            localidad_id=localidad.id
        )
        provincia.save(is_new=True)

        user = User(
            email = email,
            direccion_id = direccion.id,
            activo="activo"
        )
        user.set_password(password)
        user.save(is_new=True)

        movilidad = 0
        disponibilidad=0

        if form_data['movilidad']!='false':
            movilidad = 1

        if form_data['disponibilidadViajar']!='false':
            disponibilidad = 1
                    
        profile = Profile(
            user_id = user.id,
            nombre = form_data['nombre'],
            apellido = form_data['apellido'],
            fecha_nacimiento = datetime.datetime.now(),
            presentacion = form_data['presentacion'],
            telefono = form_data['telefono'],
            disponibilidad_viajar =disponibilidad,
            movilidad_propia =movilidad,
            discapacidad =  form_data['discapacidad']
        )
        if tieneFoto=="si":
            foto = request.files["foto"]
            profile.foto=profile.guardarFoto(foto)
  
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

        bad_responseEmail = {"msg": "El usuario no existe"}, 401
        bad_responsePassword = {"msg": "La contraseña es incorrecta"}, 401
        

        if user is None:
            return bad_responseEmail

        if not user.check_password(password):
            return bad_responsePassword

        if user.activo=="inactivo":
            return bad_responseEmail

        access_token = create_access_token(identity=user.id)

        return {"token": access_token, "user": user_schema.dump(user)}


class UserResource(Resource):
    def get(self, user_id):
        user = User.get_by_id(user_id)
        return user_schema.dump(user)

    def patch(self, user_id):
        user = User.get_by_id(user_id)
        form_data=request.form

        if 'email' in form_data:
            user.email = form_data['email']
        if 'password' in form_data:
            user.set_password(form_data['password'])

        #profile
        if form_data['movilidad']!='false':
            movilidad = 1
        else:
            movilidad = 0
        
        if form_data['disponibilidadViajar']!='false':
            disponibilidad = 1
        else:
            disponibilidad = 0
        

        if 'nombre' in form_data:
            user.profile.nombre = form_data['nombre']
        if 'apellido' in form_data:
            user.profile.apellido = form_data['apellido']
        if 'presentacion' in form_data:
            user.profile.presentacion = form_data['presentacion']
        if 'telefono' in form_data:
            user.profile.telefono = form_data['telefono']
        if 'fechaNacimiento' in form_data:
            user.profile.fecha_nacimiento = datetime.datetime.now() #form_data['fechaNacimiento']
        if 'disponibilidadViajar' in form_data:
            user.profile.disponibilidad_viajar = disponibilidad
        if 'movilidad' in form_data:
            user.profile.movilidad_propia = movilidad
        if 'sobreTi' in form_data:
            user.profile.discapacidad = form_data['sobreTi']
      #foto (esto tengo que cambiar, tanto aca como en  post)
        if form_data["tieneFoto"]=="si":
            foto = request.files["foto"]
            user.profile.foto= user.profile.guardarFoto(foto)
        #direccion
        if 'calle' in form_data:
            user.direccion.calle = form_data['calle']
        if 'numero' in form_data:
            user.direccion.numero = form_data['numero']
        if 'piso' in form_data:
            user.direccion.piso = form_data['piso']
        if 'depto' in form_data:
            user.direccion.depto = form_data['depto']
        if 'observacionesDomicilio' in form_data:
            user.direccion.observaciones = form_data['observacionesDomicilio']
        if 'localidad' in form_data:
            user.direccion.localidad.nombre = form_data['localidad']
        if 'cp' in form_data:
            user.direccion.localidad.codigoPostal = form_data['cp']
        if 'provincia' in form_data:
            user.direccion.localidad.provincia.nombre = form_data['provincia']
        user.save(is_new=False)
        return user_schema.dump(user)

    def delete(self, user_id):
        user = User.get_by_id(user_id)
        user.activo="inactivo"
        user.save(is_new=False)
        #user.delete()
        return 'inactivo', 204
