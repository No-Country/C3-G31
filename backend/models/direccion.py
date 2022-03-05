from config.db import db, BaseModelMixin

class Provincia(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    localidad_id = db.Column(db.Integer, db.ForeignKey("localidad.id"), unique=True, nullable=False)
    
    localidad = db.relationship("Localidad", back_populates="provincia")

class Localidad(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    codigoPostal=db.Column(db.String(50))
    provincia = db.relationship(Provincia, back_populates="localidad", uselist=False)
    direccion_id = db.Column(db.Integer, db.ForeignKey("direccion.id"), unique=True, nullable=False)
    
    direccion = db.relationship("Direccion", back_populates="localidad")

class Direccion(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    calle = db.Column(db.String(50), nullable=False)
    numero = db.Column(db.String(50), nullable=False)
    piso = db.Column(db.String(10))
    depto = db.Column(db.String(10))
    observaciones= db.Column(db.String(100))
    localidad = db.relationship(Localidad, back_populates="direccion", uselist=False)

    def __repr__(self) -> str:
        return f'<Direccion {self.calle} {self.numero}>'
    