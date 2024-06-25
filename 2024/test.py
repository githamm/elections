import xmltodict
import json

with open("detail.xml") as xml_file:
    data_dict = xmltodict.parse(xml_file.read())

json_data = json.dumps(data_dict)
with open("test_2_2024.json", "w") as json_file:
        json_file.write(json_data)