from flask import request, abort
from flask_restful import Resource

from models.empresa import Empresa
from schemas.empresa_schemas import empresa_schema, empresas_schema

class EmpresaListResource(Resource):
    def get(self):
        empresas = Empresa.get_all()
        return empresas_schema.dump(empresas)

    def post(self):
        form_data = request.get_json()
        errors = empresa_schema.validate(form_data)
        if errors:
            abort(400, errors)
        
        empresa = Empresa(
            razon_social = form_data['razon_social'],
            telefono = form_data['telefono'],
            email = form_data['email'],
            logo = form_data['logo'],
            user_id = form_data['user_id']
        )
        empresa.save(is_new=True)
        return empresa_schema.dump(empresa), 201

class EmpresaResource(Resource):
    def get(self, empresa_id):
        empresa = Empresa.get_by_id(empresa_id)
        if empresa is None:
            abort(404, 'The requested resource was not found')

        return empresa_schema.dump(empresa)
