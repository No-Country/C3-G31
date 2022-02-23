from config.db import db, BaseModelMixin

class Profile(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    presentacion = db.Column(db.String(500))
    telefono = db.Column(db.String(20))
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    foto = db.Column(db.String(100))
    disponibilidad_viajar = db.Column(db.Boolean)
    movilidad_propia = db.Column(db.Boolean)
    discapacidad = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    
    user = db.relationship("User", back_populates="profile")

    def __repr__(self) -> str:
        return f'<Profile {self.user_id}>'
