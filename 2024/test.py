import xmltodict
import json

with open("2024_primary_results.xml") as xml_file:
    data_dict = xmltodict.parse(xml_file.read())

json_data = json.dumps(data_dict)
with open("test_2024.json", "w") as json_file:
        json_file.write(json_data)