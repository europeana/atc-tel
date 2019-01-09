const rp = require('request-promise');
const europeanaPortalRootUrl = 'https://www.europeana.eu/portal';
const telNewspaperIssueUrlPrefix = '/tel4/newspapers/issue/';

/**
 * @param {Object} params - OpenWhisk parameters
 * @return {(Object|Promise)} OpenWhisk web action response
 */
function main(params) {
  if (typeof params.europeanaApiKey === 'undefined') {
    return { statusCode: 400, body: 'europeanaApiKey parameter is required' };
  }

  if (params.__ow_path.indexOf(telNewspaperIssueUrlPrefix) === -1) {
    // TODO: some exceptions to be added for browse pages
    return { statusCode: 301, headers: { location: `${europeanaPortalRootUrl}/collections/newspapers` } };
  }

  const telIssueId = params.__ow_path.substring(telNewspaperIssueUrlPrefix.length);

  const options = {
    uri: 'https://api.europeana.eu/api/v2/search.json',
    qs: {
      profile: 'params minimal',
      query: 'PROVIDER: "The European Library"',
      qf: `europeana_id:*/BibliographicResource_${telIssueId}`,
      wskey: params.europeanaApiKey
    },
    json: true
  };

  return rp(options)
    .then((res) => {
      if (!res.success) {
        throw new Error;
      }
      if (res.totalResults === 0) {
        return { statusCode: 404, body: 'Not Found' };
      }
      const europeanaRecordId = res.items[0].id;
      const portalUrl = `${europeanaPortalRootUrl}/record${europeanaRecordId}`;
      return { statusCode: 301, headers: { location: portalUrl } };
    }).catch(() => {
      return { statusCode: 500, body: 'Internal Server Error' };
    });
}

exports.main = main;
