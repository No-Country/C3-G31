from config.marsh import ma
from models.empresa import Empresa
from schemas.direccion_schemas import DireccionSchema

class EmpresaSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Empresa

    id = ma.auto_field()
    razon_social = ma.auto_field()
    telefono = ma.auto_field()
    email = ma.auto_field()
    logo = ma.auto_field()
    user_id = ma.auto_field()
    direccion = ma.Nested(DireccionSchema)

empresa_schema = EmpresaSchema()
empresas_schema = EmpresaSchema(many=True)
