from config.db import db, BaseModelMixin
from .empleo import Empleo
from .user import User

class Postulacion(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    idUsuario = db.Column(db.Integer, db.ForeignKey("user.id"), unique=False, nullable=False)
    idEmpleo = db.Column(db.Integer, db.ForeignKey("empleo.id"), unique=False, nullable=False)
    
    empleo = db.relationship("Empleo", uselist=False)
    usuario =db.relationship("User", uselist=False)


    @classmethod
    def yaPostulado(cls, idUsuario, idEmpleo) -> bool:
        postulado = cls.query.filter_by(idUsuario=idUsuario).filter_by(idEmpleo=idEmpleo).first()
        
        if not postulado:
            return False
        return True