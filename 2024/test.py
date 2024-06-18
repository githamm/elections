# import xmltodict
# import json

# with open("2022_primary_results.xml") as xml_file:
#     data_dict = xmltodict.parse(xml_file.read())

# json_data = json.dumps(data_dict)
# with open("test.json", "w") as json_file:
#         json_file.write(json_data)

from collections import OrderedDict

def flatten_dict(d):
    def items():
        for key, value in d.items():
            if isinstance(value, dict):
                for subkey, subvalue in flatten_dict(value).items():
                    yield key + "." + subkey, subvalue
            else:
                yield key, value

    return OrderedDict(items())

import xmltodict

# Convert to dict
with open('2022_primary_results.xml', 'rb') as f:
    xml_content = xmltodict.parse(f)

# Flatten dict
flattened_xml = flatten_dict(xml_content)

# Print in desired format
for k,v in flattened_xml.items():
    print('{} = {}'.format(k,v))