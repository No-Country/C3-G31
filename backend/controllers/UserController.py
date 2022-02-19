from models.user import User


def index():
    users = User.get_all()
    users_serialize = [user.serialize for user in users]
    return {"users": users_serialize}

def create():
    user1 = User(name='maria')
    user1.save()
    return user1.serialize
