from flask import request, jsonify
from flask_restful import Resource, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.empleo import Empleo
from models.empresa import Empresa
from schemas.empleo_schemas import empleos_schema, empleo_schema
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

    @jwt_required()
    def get(self):
        queryset = self.get_queryset()
        data = empleos_schema.dump(queryset.items)
        return get_paginated_dict(data, queryset), 201

    @jwt_required()
    @validate_schema(empleo_schema)
    def post(self):
        current_user_id = get_jwt_identity()
        empresa = Empresa.get_by_user(current_user_id)
        if empresa is None:
            abort(403, message="You do not have a registered company")

        valid_data = empleo_schema.load(request.get_json())
        empleo = self.model(empresa_id=empresa.id, **valid_data)
        empleo.save(is_new=True)
        return empleo_schema.dump(empleo), 201


class EmpleoResource(Resource):

    model = Empleo

    @jwt_required()
    def get(self, empleo_id):
        empleo = get_or_404(self.empleo, empleo_id)
        return empleo_schema.dump(empleo)

    @jwt_required()
    @validate_schema(empleo_schema)
    def put(self, empleo_id):
        empleo = get_or_404(self.model, empleo_id)
        abort_is_not_owner(empleo.empresa.user.id)
        valid_data = empleo_schema.load(request.get_json())
        empleo.update(**valid_data)
        return empleo_schema.dump(empleo)

    @jwt_required()
    def delete(self, empleo_id):
        empleo = get_or_404(self.model, empleo_id)
        abort_is_not_owner(empleo.empresa.user.id)
        empleo.delete()
        return "", 204