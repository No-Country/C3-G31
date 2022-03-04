import enum


class EstadosEnum(enum.Enum):
    activo = 'Activo'
    inactivo = 'Inactivo'

class EstadoEmpleoEnum(enum.Enum):
    activo = 'Activo'
    inactivo = 'Inactivo'
    finalizado = 'Finalizado'

class ModalidadesEnum(enum.Enum):
    remoto = 'Remoto'
    hibrido = 'Hibrido'
    prensencia = 'Presencial'
    otro = 'Otro'

class TipoContratoEnum(enum.Enum):
    freelance = 'Freelance'
    temporal = 'Temporal'
    indefinido = 'Indefinido'
    otro = 'Otro'

class TipoJornadaEnum(enum.Enum):
    tiempo_completo = 'Tiempo completo'
    medio_tiempo = 'Medio tiempo'
    otro = 'Otro'