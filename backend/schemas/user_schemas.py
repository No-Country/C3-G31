from config.marsh import ma
from models.user import User
from schemas.profile_schemas import ProfileSchema

class UserSchema(ma.SQLAlchemySchema):
    profile = ma.Nested(ProfileSchema)

    class Meta:
        ordered = True
        fields = ('id', 'email', 'profile')
        # exclude = ('password',)
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)
