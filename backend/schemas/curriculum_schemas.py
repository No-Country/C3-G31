from config.marsh import ma
from models.curriculum import Curriculum

class CurriculumSchema(ma.Schema):
    class Meta:
        ordered = True
        fields = ('id', 'direccionDeArchivo', 'user_id')
        model = Curriculum

curriculum_schema = CurriculumSchema()
curriculums_schema = CurriculumSchema(many=True)
