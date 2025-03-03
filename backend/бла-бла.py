from app.constants import DAYS_MAPPING
days = ['ВТ', "ПТ"]
res_days = [DAYS_MAPPING[day.lower()] for day in days]
print(res_days)