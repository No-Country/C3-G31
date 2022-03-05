from flask_restful import abort

def get_or_404(model, pk):
    """Obtiene la instancia del objeto si existe, si no arroja 404"""
    try:
        instance = model.get_by_id(pk)
        return instance
    except:
        abort(404)

def abort_is_not_owner(user_id):
    """Cancela una operacion si el usuario no es propetario del recurso"""
    from flask_jwt_extended import jwt_required, get_jwt_identity
    current_user_id = get_jwt_identity()
    if user_id != current_user_id:
        abort(403)

def get_paginated_dict(data, pagination):
    return {
        "results": data,
        "pagination": {
            "count": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "pages": pagination.pages,
            "next": pagination.next_num,
            "prev": pagination.prev_num,
            "has_next": pagination.has_next
        },
    }