import xmltodict
import json

with open("/Users/kevinhamm/Downloads/detail.xml") as xml_file:
    data_dict = xmltodict.parse(xml_file.read())

json_data = json.dumps(data_dict)
with open("election_data.json", "w") as json_file:
        json_file.write(json_data)