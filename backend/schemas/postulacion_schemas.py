from config.marsh import ma
from models.postulacion import Postulacion

class PostulacionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Postulacion

    id = ma.auto_field()
    idUsuario = ma.auto_field()
    idEmpleo = ma.auto_field()

postulacion_schema = PostulacionSchema()
postulaciones_schema = PostulacionSchema(many=True)
