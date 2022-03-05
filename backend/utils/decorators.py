from functools import wraps
from flask import request

def validate_schema(schema):
    def validate_data(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            form_data = request.get_json()
            errors = schema.validate(form_data)
            if(errors):
                return {"errors": errors}, 400

            return func(*args, **kwargs)
        return wrapper
    return validate_data
