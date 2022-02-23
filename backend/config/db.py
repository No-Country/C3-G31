from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseModelMixin():

    def save(self, is_new: bool):
        if is_new:
            db.session.add(self)

        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)
