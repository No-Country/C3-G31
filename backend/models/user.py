from config.db import db, BaseModelMixin

class User(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profile = db.relationship("Profile", back_populates="user", uselist=False)

    def __repr__(self) -> str:
        return f'<User {self.email}>'
