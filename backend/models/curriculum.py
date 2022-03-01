from config.db import db, BaseModelMixin

class Curriculum(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    direccionDeArchivo = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    user = db.relationship("User", back_populates="curriculum")



    def guardarCurriculum(self, archivoCv):
        #guardo la direccion en "curriculum" concatenando la id del profile asi no hay 2 curriculums con mismo nombre
        self.curriculum = archivoCv.filename+str(self.id)
        archivoCv.save("./static/uploads/curriculums" + self.curriculum)

    def __repr__(self) -> str:
        return f'<Curriculum {self.direccionDeArchivo}>'
