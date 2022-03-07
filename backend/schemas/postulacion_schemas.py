from schemas.empresa_schemas import EmpresaSchema
from config.marsh import ma
from models.postulacion import Postulacion
from schemas.empleo_schemas import EmpleoSchema
from schemas.user_schemas import UserSchema

class PostulacionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Postulacion
        id=ma.auto_field()
        idUsuario = ma.auto_field()
        idEmpleo = ma.auto_field()
        empleo = ma.Nested(EmpleoSchema)
        usuario = ma.Nested(UserSchema)
        

postulacion_schema = PostulacionSchema()
postulaciones_schema = PostulacionSchema(many=True)



# class PostulacionSchema(ma.Schema):
#     class Meta:
#         ordered = True
#         fields = ('id', 'empleo', 'usuario')
#         model = Postulacion
# postulacion_schema = PostulacionSchema()
# postulaciones_schema = PostulacionSchema(many=True)
