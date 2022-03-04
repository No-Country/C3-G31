from config.marsh import ma
from models.direccion import Direccion, Localidad, Provincia




class ProvinciaSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'nombre','localidad_id')
        model = Provincia
provincia_schema = ProvinciaSchema()
provincias_schema = ProvinciaSchema(many=True)


class LocalidadSchema(ma.Schema):
    provincia=ma.Nested(ProvinciaSchema)

    class Meta:
        ordered = True
        fields = ('id', 'nombre','codigoPostal','direccion_id', 'provincia' )
        model = Localidad
localidad_schema = LocalidadSchema()
localidades_schema = LocalidadSchema(many=True)



class DireccionSchema(ma.Schema):
    localidad= ma.Nested(LocalidadSchema)

    class Meta:
        ordered = True
        fields = ('id', 'calle', 'numero', 'piso', 'depto', 'observaciones','user_id', 'localidad')
        model = Direccion
direccion_schema = DireccionSchema()
direcciones_schema = DireccionSchema(many=True)
