from http import HTTPStatus

from fastapi import FastAPI

app = FastAPI()


@app.get("/api")
async def root():
    return {
        "code": HTTPStatus.OK,
        "status": "OK!",
        "message": "PCOS Classification API",
    }
