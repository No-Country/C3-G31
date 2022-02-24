from config.marsh import ma
from models.profile import Profile

class ProfileSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'user_id', 'nombre', 'apellido', 'telefono', 'fecha_nacimiento')
        model = Profile

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)
