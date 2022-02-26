from config.marsh import ma
from models.direccion import Direccion, Localidad, Provincia

class DireccionSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'calle', 'numero', 'piso', 'depto', 'observaciones','user_id')
        model = Direccion

direccion_schema = DireccionSchema()
direcciones_schema = DireccionSchema(many=True)

class LocalidadSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'nombre','codigoPostal','direccion_id')
        model = Localidad

localidad_schema = LocalidadSchema()
localidades_schema = LocalidadSchema(many=True)

class ProvinciaSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'nombre','localidad_id')
        model = Provincia

provincia_schema = ProvinciaSchema()
provincias_schema = ProvinciaSchema(many=True)
