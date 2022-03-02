from marshmallow import fields

from config.marsh import ma
from models.user import User
from schemas.profile_schemas import ProfileSchema
from schemas.direccion_schemas import DireccionSchema
from schemas.empresa_schemas import EmpresaSchema

class UserSchema(ma.SQLAlchemySchema):
    profile = ma.Nested(ProfileSchema)
    direccion= ma.Nested(DireccionSchema)
    empresa = ma.Nested(EmpresaSchema)
    class Meta:
        ordered = True
        fields = ('id', 'email', 'profile', 'direccion','empresa')
        # exclude = ('password',)
        model = User


class UserRegisterSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)


user_register_schema = UserRegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)
