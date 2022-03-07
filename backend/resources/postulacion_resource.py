from http.client import ImproperConnectionState
from flask import request, abort
from flask_restful import Resource
from models.postulacion import Postulacion
from schemas.postulacion_schemas import postulacion_schema, postulaciones_schema


class PostulacionListResource(Resource):
    def get(self):
        postulaciones = Postulacion.get_all()
        dato=postulaciones_schema.dump(postulaciones)
        return postulaciones_schema.dump(postulaciones)

    def post(self):
        form_data: dict = request.get_json()
        # errors = empresa_schema.validate(form_data)
        # if errors:
        #     abort(400, errors)

        postulacion=Postulacion(
            idUsuario= form_data.get('idUsuario'),
            idEmpleo= form_data.get('idEmpleo')
        )
        postulacion.save(is_new=True)

        return postulacion_schema.dump(postulacion), 201

class PostulacionResource(Resource):
    def get(self, postulacion_id):
        postulacion = Postulacion.get_by_id(postulacion_id)
        if postulacion is None:
            abort(404, 'The requested resource was not found')

        return postulacion_schema.dump(postulacion)
