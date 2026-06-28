import requests

url = "https://script.google.com/macros/s/AKfycbyo_jg4-K6c3dKxEj2oHR1BFdb1Zfwr6EoV9Dn2MEhJT9ajUViiMRt85XHpTWjlJPKz/exec"
data = {"name": "Test", "company": "Test", "phone": "123"}
r = requests.post(url, data=data, allow_redirects=True)
print(r.status_code)
print(r.text)
