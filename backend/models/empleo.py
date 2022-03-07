from datetime import datetime
from slugify import slugify
from sqlalchemy.ext.hybrid import hybrid_property
from config.db import db, BaseModelMixin
from utils import enums


class Empleo(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    empresa_id = db.Column(
        db.Integer,
        db.ForeignKey('empresa.id'),
        nullable=False
    )
    titulo = db.Column(db.String(100), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow())
    fecha_vencimiento = db.Column(db.DateTime, nullable=False)
    cargo = db.Column(db.String(100), nullable=False)
    rango_salarial = db.Column(db.String(100), nullable=False)
    ubicacion = db.Column(db.String(100))
    postulaciones=db.relationship('Postulacion', lazy='select', back_populates='empleo')
    

    modalidad = db.Column(
        db.Enum(enums.ModalidadesEnum),
        default=enums.ModalidadesEnum.otro,
    )
    experiencia = db.Column(db.String(100), nullable=False)
    estado = db.Column(
        db.Enum(enums.EstadoEmpleoEnum),
        default=enums.EstadoEmpleoEnum.activo,
    )
    descripcion = db.Column(db.String(1500), nullable=False)
    tipo_contrato = db.Column(
        db.Enum(enums.TipoContratoEnum),
        default=enums.TipoContratoEnum.otro,
        nullable=False
    )
    tipo_jornada = db.Column(
        db.Enum(enums.TipoJornadaEnum),
        default=enums.TipoJornadaEnum.otro,
        nullable=False
    )

    @hybrid_property
    def slug(self):
        return slugify(f'{self.titulo}-{self.id}')
