from config.marsh import ma
from models.user import User

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        # fields = ('id', 'email', 'profile')
        model = User

    id = ma.auto_field()
    email = ma.auto_field()
    profile = ma.auto_field()

user_schema = UserSchema()
users_schema = UserSchema(many=True)
