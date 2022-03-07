from config.db import db, BaseModelMixin
from .empleo import Empleo
from .user import User

class Postulacion(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    idUsuario = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    idEmpleo = db.Column(db.Integer, db.ForeignKey("empleo.id"), unique=True, nullable=False)
    
    empleos = db.relationship('Empleo', lazy='select', backref=db.backref('postulacion', lazy='joined'))
    usuario = db.relationship('User', lazy='select', backref=db.backref('postulacion', lazy='joined'))

