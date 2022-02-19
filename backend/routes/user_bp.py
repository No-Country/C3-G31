from flask import Blueprint

from controllers.UserController import create, index

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/', methods=['GET'])(index)
user_bp.route('/create', methods=['POST'])(create)
