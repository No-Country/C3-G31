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
            piso = form_data.get('piso'),
            depto = form_data.get('depto'),
            observaciones = form_data.get('observacionesDomicilio'),
        )
        direccion.save(is_new=True)
        
        localidad = Localidad(
            nombre=form_data.get('localidad'),
            codigoPostal=form_data.get('cp'),
        )
        localidad.direccion_id=direccion.id
        localidad.save(is_new=True)
        
        provincia=Provincia(
            nombre=form_data.get('provincia')
        )
        provincia.localidad_id = localidad.id
        provincia.save(is_new=True)
        
        empresa=Empresa(
            razon_social= form_data.get('razonSocial'),
            telefono= form_data.get('telefono'),
            email= form_data.get('email'),
            logo= form_data.get('logo'),
            user_id= form_data.get('idUsuario')
        )
        empresa.direccion_id=direccion.id
        empresa.save(is_new=True)

        return empresa_schema.dump(empresa), 201

class EmpresaResource(Resource):
    def get(self, empresa_id):
        empresa = Empresa.get_by_id(empresa_id)
        if empresa is None:
            abort(404, 'The requested resource was not found')

        return empresa_schema.dump(empresa)

    def patch(self, empresa_id):
        empresa = Empresa.get_by_id(empresa_id)
        if empresa is None:
            abort(404, 'The requested resource was not found')

        form_data: dict = request.get_json()

        empresa.direccion.calle = form_data.get('calle', empresa.direccion.calle)
        empresa.direccion.numero = form_data.get('numero', empresa.direccion.numero)
        empresa.direccion.piso = form_data.get('piso', empresa.direccion.piso)
        empresa.direccion.depto = form_data.get('depto', empresa.direccion.depto)
        empresa.direccion.observaciones = form_data.get('observacionesDomicilio', empresa.direccion.observaciones)
        empresa.direccion.save(is_new=False)
                 
        empresa.direccion.localidad.nombre = form_data.get('localidad', empresa.direccion.localidad.nombre)
        empresa.direccion.localidad.codigoPostal = form_data.get('cp', empresa.direccion.localidad.codigoPostal)
        empresa.direccion.localidad.save(is_new=False)
        
        empresa.direccion.localidad.provincia.nombre = form_data.get('provincia', empresa.direccion.localidad.provincia.nombre)
        empresa.direccion.localidad.provincia.save(is_new=False)

        empresa.razon_social = form_data.get('razonSocial', empresa.razon_social)
        empresa.email = form_data.get('email', empresa.email)
        empresa.telefono = form_data.get('telefono', empresa.telefono)
        empresa.logo = form_data.get('logo', empresa.logo)
        empresa.save(is_new=False)

        return empresa_schema.dump(empresa)
