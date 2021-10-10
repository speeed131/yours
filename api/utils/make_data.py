from typing import Optional, Any, List


def make_response_data_to_list(data: List, model_name: str) -> List:
    response_data = []
    for i in data:
        response_data.append(i[model_name])

    return response_data


def make_response_data_to_one_dict(data: List, model_name: str) -> dict:
    # print(data[0][model_name])
    response_data = data[0][model_name]

    return response_data
