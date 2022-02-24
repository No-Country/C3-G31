from marshmallow import fields

from config.marsh import ma
from models.user import User

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        # fields = ('id', 'email', 'profile')
        model = User

    id = ma.auto_field()
    email = ma.auto_field()
    profile = ma.auto_field()

class UserRegisterSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

user_register_schema = UserRegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)
