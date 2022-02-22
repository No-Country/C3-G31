from config.marsh import ma
from models.user import User

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)
