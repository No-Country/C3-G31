from werkzeug.security import generate_password_hash, check_password_hash
from config.db import db, BaseModelMixin
from .profile import Profile

class User(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profile = db.relationship(Profile, back_populates="user", uselist=False)
    #empresa = db.relationship("Empresa", back_populates="user", uselist=False)
    direccion = db.relationship("Direccion", back_populates="user", uselist=False)
    curriculum = db.relationship("Curriculum", back_populates="user", uselist=False)

    def set_password(self, password):
        self.password = generate_password_hash(password, method='sha256')

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    @classmethod
    def email_exists(cls, email) -> bool:
        user = cls.query.filter_by(email=email).first()
        if not user:
            return False
        return True

    def __repr__(self) -> str:
        return f'<User {self.email}>'
