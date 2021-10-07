from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware


from api.routers import auth, word, daily


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(auth.router)
app.include_router(word.router)
app.include_router(daily.router)
