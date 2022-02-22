from config.marsh import ma
from models.profile import Profile

class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'telefono', 'fecha_nacimiento')
        model = Profile

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)
