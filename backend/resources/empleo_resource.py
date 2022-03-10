from datetime import datetime
from flask import request, jsonify
from flask_restful import Resource, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.empleo import Empleo
from models.empresa import Empresa
from schemas.empleo_schemas import empleo_schema, empleos_schema
from utils.decorators import validate_schema
from utils.helpers import get_or_404, abort_is_not_owner, get_paginated_dict



class EmpleoListResource(Resource):

    model = Empleo

    def get_queryset(self):
        filter_list = []
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per-page", 10, type=int)

        title = request.args.get("titulo", type=str)
        if title:
            filter_list.append(Empleo.titulo.contains(title))
        if filter_list:
            return self.model.query.filter(*filter_list)
        return self.model.query.paginate(page, per_page)

    # @jwt_required()
    def get(self):
        empleos = Empleo.get_all()
        return empleos_schema.dump(empleos)
     

    # @jwt_required()
    # @validate_schema(empleo_schema)
    def post(self):

        form_data=request.form
        empleo = Empleo()

        if 'empresa_id' in form_data:
            empleo.empresa_id = form_data['empresa_id']

        if 'titulo' in form_data:
            empleo.titulo = form_data['titulo']

        if 'fecha_creacion' in form_data:
            empleo.fecha_creacion = form_data['fecha_creacion']

        if 'fecha_vencimiento' in form_data:
            empleo.fecha_vencimiento = form_data['fecha_vencimiento']

        if 'cargo' in form_data:
            empleo.cargo = form_data['cargo']

        if 'rango_salarial' in form_data:
            empleo.rango_salarial = form_data['rango_salarial']

        if 'experiencia' in form_data:
            empleo.experiencia = form_data['experiencia']

        if 'estado' in form_data:
            empleo.estado = form_data['estado']

        if 'tipo_contrato' in form_data:
            empleo.tipo_contrato = form_data['tipo_contrato']

        if 'tipo_jornada' in form_data:
            empleo.tipo_jornada = form_data['tipo_jornada']
        
        if 'descripcion' in form_data:
            empleo.descripcion = form_data['descripcion']
        
        empleo.save(is_new=True)
        return empleo_schema.dump(empleo)



class EmpleoResource(Resource):

    model = Empleo

    # @jwt_required()
    def get(self, empleo_id):
        empleo = get_or_404(self.model, empleo_id)
        return empleo_schema.dump(empleo)

    # @jwt_required()
    # @validate_schema(empleo_schema)
    def put(self, empleo_id):
        empleo = get_or_404(self.model, empleo_id)
        abort_is_not_owner(empleo.empresa.user.id)
        valid_data = empleo_schema.load(request.get_json())
        empleo.update(**valid_data)
        return empleo_schema.dump(empleo)

    # @jwt_required()
    def delete(self, empleo_id):
        empleo = get_or_404(self.model, empleo_id)
        abort_is_not_owner(empleo.empresa.user.id)
        empleo.delete()
        return "", 204

