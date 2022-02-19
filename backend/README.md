# Backend

Backend inclusive job market

## Requirements

    python >= 3.7

## Preparing the environment

Create your python environment for **Linux**

```bash
python3 -m venv env
source env/bin/activate
```

## install dependencies

`pip install -r requirements.txt`

## Run migrations

```bash
flask db init
```

```bash
flask db migrate
```

```bash
flask db upgrade
```

## Run server

```bash
flask run
```
