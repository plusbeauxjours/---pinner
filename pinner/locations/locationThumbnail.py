import requests
import json
from contextlib import closing
from django.conf import settings

class get_photos(object):
    
    def __init__(self, **kwargs):
        self.base_url = "https://api.unsplash.com/search/photos"
        self.headers = {'Accept-Version': 'v1',
                        'Authorization': 'Client-ID ' + settings.UNSPLASH_ACCESS_KEY}
        self.urls = []
        self.titles = []
        self.num = 1 

    def get_urls(self,  **kwargs):

        payload = {'page': '1', 'query': kwargs.get('term')}
        req = requests.get(url=self.base_url,
                           headers=self.headers, params=payload)
        data = json.loads(req.text)
        for i in range(self.num):
            self.urls.append(data['results'][i]['links']['download'])
            self.titles.append(data['results'][i]['description'])
            print(self.urls[i])

    def download(self, i):
            with closing(requests.get(url=self.urls[i], stream=True)) as r:
                with open(self.titles[i]+'.jpg', 'ab+') as f:
                    for chunk in r.iter_content(chunk_size=1024):
                        if chunk:
                            f.write(chunk)
                            f.flush()

if __name__ == '__main__':
    gp = get_photos()
    gp.num = 2
    print('Getting the download urls...')
    gp.get_urls(term="office")
    print('Start to download:')
    for i in range(gp.num):
        print(' Downloading the %dth image' % (i+1))
        gp.download(i)