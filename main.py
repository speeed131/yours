# from enum import Enum
# from fastapi import FastAPI

# class ModelName(str, Enum):
#     alexnet = "alexnet"
#     resnet  = "resnet"
#     lenet   = "lenet"

# app = FastAPI()

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# # パスパラメータの宣言 型宣言することで、関数内でのエディターサポート (エラーチェックや補完など) が提供される。
# @app.get("/items/{item_id}")
# async def read_item(item_id: int):
#     return {"item_id" : item_id}


# @app.get("/models/{model_name}")
# async def get_model(model_name: ModelName):
#     if model_name == ModelName.alexnet:
        