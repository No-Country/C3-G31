from config.db import db, BaseModelMixin
from .empleo import Empleo
from .user import User

class Postulacion(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    idUsuario = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    idEmpleo = db.Column(db.Integer, db.ForeignKey("empleo.id"), unique=False, nullable=False)
    
    empleo = db.relationship("Empleo", uselist=False)
    usuario =db.relationship("User", uselist=False)

