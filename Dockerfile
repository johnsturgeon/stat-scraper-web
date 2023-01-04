FROM python:3.10

WORKDIR /app

COPY ["pyproject.toml", "/app/"]

COPY ./app /app

CMD mkdir /db

ENV PYTHONPATH=${PYTHONPATH}:${PWD}
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --only main

CMD ["uvicorn", "main:app", "--port", "8822", "--host", "0.0.0.0"]