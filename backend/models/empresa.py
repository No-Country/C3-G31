from enum import unique
from config.db import db, BaseModelMixin

class Empresa(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    razon_social = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(100))
    logo = db.Column(db.String(100))

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)

    direccion_id = db.Column(db.Integer, db.ForeignKey("direccion.id"), unique=True, nullable=False)
    direccion = db.relationship("Direccion", uselist=False)
