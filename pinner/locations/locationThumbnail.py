import requests
import json
from contextlib import closing
from django.conf import settings

class get_photos(object):

    def __init__(self, **kwargs):
        self.base_url = "https://api.unsplash.com/search/photos"
        self.headers = {'Accept-Version': 'v1',
                        'Authorization': 'Client-ID ' + settings.UNSPLASH_KEY}
        self.urls = []

        # DOWNLOAD IMAGE
        # self.titles = []
        self.num = 10
        self.term = kwargs.get('term')
    
    def get_urls(self):
        payload = {'page': '1', 'query': self.term}
        req = requests.get(url=self.base_url,
                           headers=self.headers, params=payload)
        data = json.loads(req.text)
        for i in range(self.num):
            self.urls.append(data['results'][i]['links']['download'])

            # DOWNLOAD IMAGE
            # self.titles.append(data['results'][i]['alt_description'])
            print(self.urls[i])
        return self.urls[0]

    # DOWNLOAD IMAGE
    # def download(self, i):
    #     print(self.urls)
    #     print(self.titles)
    #     with closing(requests.get(url=self.urls[i], stream=True)) as r:
    #         with open(self.term+ str(i) +'.jpg', 'ab+') as f:
    #             for chunk in r.iter_content(chunk_size=1024):
    #                 if chunk:
    #                     f.write(chunk)
    #                     f.flush()

