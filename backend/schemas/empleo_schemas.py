
from config.marsh import ma
from models.empleo import Empleo
from schemas.empresa_schemas import EmpresaSchema

class EmpleoSchema(ma.SQLAlchemySchema):
    class Meta:
        
        model = Empleo

    id = ma.auto_field()
    empresa_id = ma.auto_field()
    titulo = ma.auto_field()
    fecha_creacion = ma.auto_field()
    fecha_vencimiento = ma.auto_field()
    cargo = ma.auto_field()
    rango_salarial = ma.auto_field()
    experiencia = ma.auto_field()
    estado = ma.auto_field()
    tipo_contrato = ma.auto_field()
    tipo_jornada = ma.auto_field()
    descripcion = ma.auto_field()
    empresa=ma.Nested(EmpresaSchema)
empleo_schema = EmpleoSchema()
empleos_schema = EmpleoSchema(many=True)














# from marshmallow_enum import EnumField
# from marshmallow import fields

# from config.marsh import ma
# from models.empleo import Empleo
# from schemas.empresa_schemas import EmpresaSchema

# from utils import enums


# class EmpleoSchema(ma.SQLAlchemyAutoSchema):

#     empresa = ma.Nested(EmpresaSchema)

#     modalidad = EnumField(
#         enums.ModalidadesEnum,
#         required=True,
#         by_value=True
#     )
#     estado = EnumField(
#         enums.EstadoEmpleoEnum,
#         required=True,
#         by_value=True
#     )
#     tipo_jornada = EnumField(
#         enums.TipoJornadaEnum,
#         required=True,
#         by_value=True
#     )
#     tipo_contrato = EnumField(
#         enums.TipoContratoEnum,
#         required=True,
#         by_value=True
#     )
    
#     empresa_id = ma.auto_field(dump_only=False)

#     # slug = fields.Str(dump_only=True)

#     class Meta:
#         model = Empleo
        
#         fields = (
#             'id',
#             'empresa',
#             'titulo',
#             'fecha_creacion',
#             'fecha_vencimiento',
#             'cargo',
#             'rango_salarial',
#             'ubicacion',
#             'modalidad',
#             'experiencia',
#             'estado',
#             'descripcion',
#             'tipo_contrato',
#             'tipo_jornada',
#             'empresa_id'
#             # 'slug'
#         )

# empleo_schema = EmpleoSchema()
# empleos_schema = EmpleoSchema(many=True)
