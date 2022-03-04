from flask import request, abort
from flask_restful import Resource

from models.empresa import Empresa
from models.direccion import Direccion, Localidad, Provincia
from schemas.empresa_schemas import empresa_schema, empresas_schema

class EmpresaListResource(Resource):
    def get(self):
        empresas = Empresa.get_all()
        return empresas_schema.dump(empresas)

    def post(self):
        form_data: dict = request.get_json()
        # errors = empresa_schema.validate(form_data)
        # if errors:
        #     abort(400, errors)

        direccion = Direccion(
            calle = form_data['calle'],
            numero = form_data['numero'],
            piso = form_data['piso'],
            depto = form_data['depto'],
            observaciones = form_data['observacionesDomicilio'],
        )
        direccion.save(is_new=True)
        
        localidad = Localidad(
            nombre = form_data['localidad'],
            codigoPostal = form_data['cp'],
            direccion_id = direccion.id
        )
        localidad.save(is_new=True)
        
        provincia = Provincia(
            nombre = form_data['provincia'],
            localidad_id = localidad.id
        )
        provincia.save(is_new=True)
        
        empresa = Empresa(
            razon_social = form_data['razonSocial'],
            telefono = form_data['telefono'],
            email = form_data['email'],
            logo = form_data.get('logo'),
            user_id = form_data['idUsuario'],
            direccion_id = direccion.id
        )
        empresa.save(is_new=True)
        return empresa_schema.dump(empresa), 201

class EmpresaResource(Resource):
    def get(self, empresa_id):
        empresa = Empresa.get_by_id(empresa_id)
        if empresa is None:
            abort(404, 'The requested resource was not found')

        return empresa_schema.dump(empresa)
