const discoverRedirects = {
  '1': '/collections/newspapers?q=',
  '2': '/collections/newspapers/country.html',
  '3': '/collections/newspapers/a-z.html'
};
const europeanaWebsiteRootUrl = 'https://www.europeana.eu';
const telNewspaperIssueUrlPrefix = '/tel4/newspapers/issue/';
const catchallRedirectPath = `${europeanaWebsiteRootUrl}/TEL.html`;

import axios from 'axios';
import config from './config.js';

export default async(req, res) => {
  const path = req.url;

  try {
    if (req.url === '/tel4/newspapers' && req.query.idx && req.query.view === 'discover' && discoverRedirects[req.query.idx]) {
      return res.redirect(301, `${europeanaWebsiteRootUrl}${discoverRedirects[req.query.idx]}`);
    }

    if (!req.url.startsWith(telNewspaperIssueUrlPrefix)) {
      return res.redirect(301, catchallRedirectPath);
    }

    const telIssueId = req.url.substring(telNewspaperIssueUrlPrefix.length);

    const response = await axios({
      method: 'GET',
      baseURL: 'https://api.europeana.eu',
      url: '/record/search.json',
      params: {
        profile: 'minimal',
        qf: 'PROVIDER:"The European Library"',
        query: `europeana_id:*/BibliographicResource_${telIssueId}`,
        wskey: config.europeana.apiKey
      }
    });

    if (response.data.totalResults > 0) {
      res.redirect(301, `${europeanaWebsiteRootUrl}/item${response.data.items[0].id}`);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
