from bs4 import BeautifulSoup
import requests
page_link ='https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/'
page_response = requests.get(page_link, timeout=5)
page_content = BeautifulSoup(page_response.content, "html.parser")
fullTitle = page_content.find_all(class_="productTitle floatLeft")
print fullTitle