from datetime import datetime
from config.db import db, BaseModelMixin
import os



class Profile(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    presentacion = db.Column(db.String(500))
    telefono = db.Column(db.String(20))
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    foto = db.Column(db.String(100))
    disponibilidad_viajar = db.Column(db.Boolean)
    movilidad_propia = db.Column(db.Boolean)
    discapacidad = db.Column(db.String(200))
    curriculum = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    user = db.relationship("User", back_populates="profile")



    def guardarFoto(self, archivoFoto):
        #guardo la direccion en "foto" concatenando la  fecha y hora del momento asi no hay 2 imagenes con mismo nombre
        now=datetime.now()
        tiempo=now.strftime("%Y%H%M%S")
        self.foto =tiempo+archivoFoto.filename
        archivoFoto.save("backend/static/upload/imagenes/" + self.foto)
        return self.foto
         

 

    def __repr__(self) -> str:
        return f'<Profile {self.nombre} {self.apellido}>'
