from flask import request
from flask_restful import Resource
from backend.models.curriculum import Curriculum

from models.profile import Profile
from schemas.curriculum_schemas import curriculum_schema, curriculums_schema

class CurriculumListResource(Resource):
    def get(self):
        curriculums = Curriculum.get_all()
        return curriculums_schema.dump(curriculums)

    def post(self):
        curriculum = Curriculum(
            direccionDeArchivo = request.json['curriculum'],
            user_id = request.json['user_id'],
        )
        curriculum.save(is_new=True)
        return curriculums_schema.dump(curriculum)
