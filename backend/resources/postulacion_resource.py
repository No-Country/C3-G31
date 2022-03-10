from http.client import ImproperConnectionState
from flask import request, abort
from flask_restful import Resource
from models.postulacion import Postulacion
from schemas.postulacion_schemas import postulacion_schema, postulaciones_schema


class PostulacionListResource(Resource):
    def get(self):
        postulaciones = Postulacion.get_all() 
        return postulaciones_schema.dump(postulaciones)

    def post(self):
        form_data: dict = request.get_json()
     

        postulacion=Postulacion(
            idUsuario= form_data.get('idUsuario'),
            idEmpleo= form_data.get('idEmpleo')
        )

        if Postulacion.yaPostulado(postulacion.idUsuario, postulacion.idEmpleo):
             return {"errors": "postulacion; 'Este usuario ya se postulo",
                    }, 400

        postulacion.save(is_new=True)

        return postulacion_schema.dump(postulacion), 201

class PostulacionResource(Resource):
    def get(self, postulacion_id):
        postulacion = Postulacion.get_by_id(postulacion_id)
        contador=0
        for idUsuario in postulacion:
            contador=+1
        if postulacion is None:
            abort(404, 'The requested resource was not found')

        return contador
