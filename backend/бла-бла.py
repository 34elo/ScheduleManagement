keys = ['id', 'full_name', 'username', 'mobile_number']
data = [
  1,
  "Максим Максимович Максимов",
  "serjanchik",
  "1234567"
]
result = {}
for key, value in zip(keys, data):
    result[key] = value

print(result)