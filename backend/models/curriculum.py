from datetime import datetime
from config.db import db, BaseModelMixin

class Curriculum(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    direccionDeArchivo = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True)
    user = db.relationship("User", back_populates="curriculum")



    def guardarCurriculum(self, archivoCv):
     #guardo la direccion en "foto" concatenando la  fecha y hora del momento asi no hay 2 imagenes con mismo nombre
        now=datetime.now()
        tiempo=now.strftime("%Y%H%M%S")
        self.direccionDeArchivo =tiempo+archivoCv.filename
        archivoCv.save("backend/static/upload/curriculums/" + self.direccionDeArchivo)
        return self.direccionDeArchivo


    def __repr__(self) -> str:
        return f'<Curriculum {self.direccionDeArchivo}>'
