from config.marsh import ma
from models.profile import Profile

class ProfileSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id',
        'user_id',
        'nombre',
        'apellido',
        'presentacion',
        'telefono',
        'fecha_nacimiento',
        'foto',
        'disponibilidad_viajar',
        'movilidad_propia',
        'discapacidad'
        )
        model = Profile

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)
