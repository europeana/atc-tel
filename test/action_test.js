const action = require('../src/action');
const expect = require('chai').expect;
const nock = require('nock');

describe('action', () => {
  it('should return statusCode 400 if no API key is passed', () => {
    let response = action({});
    expect(response.statusCode).to.equal(400);
  });

  it('should return 301 redirect to Newspapers collection if not a TEL issue', () => {
    let response = action({
      europeanaApiKey: 'XYZ',
      __ow_path: '/'
    });
    expect(response.statusCode).to.equal(301);
    expect(response.headers.location).to.equal(`${action.europeanaPortalRootUrl}/collections/newspapers`);
  });

  it('should return 301 to issue if found', () => {
    const europeanaRecordId = '/123/abc';

    nock(action.europeanaApiRootUrl)
      .get('/v2/search.json')
      .query(query => {
        if (query.qf === 'europeana_id:*/BibliographicResource_Found') {
          return true;
        }
      })
      .reply(200, { success: true, totalResults: 1, items: [{ id: europeanaRecordId }] });

    let responsePromise = action({
      europeanaApiKey: 'XYZ',
      __ow_path: action.telNewspaperIssueUrlPrefix + 'Found'
    });

    return responsePromise.then((response) => {
      expect(response.statusCode).to.equal(301);
      expect(response.headers.location).to.equal(`${action.europeanaPortalRootUrl}/record${europeanaRecordId}`);
    });
  });

  it('should return 404 if issue not found', () => {
    nock(action.europeanaApiRootUrl)
      .get('/v2/search.json')
      .query(query => {
        if (query.qf === 'europeana_id:*/BibliographicResource_Not_Found') {
          return true;
        }
      })
      .reply(200, { success: true, totalResults: 0, items: [] });

    let responsePromise = action({
      europeanaApiKey: 'XYZ',
      __ow_path: action.telNewspaperIssueUrlPrefix + 'Not_Found'
    });

    return responsePromise.then((response) => {
      expect(response.statusCode).to.equal(404);
    });
  });

  it('should return 500 on error', () => {
    nock(action.europeanaApiRootUrl)
      .get('/v2/search.json')
      .query(query => {
        if (query.qf === 'europeana_id:*/BibliographicResource_API_Error') {
          return true;
        }
      })
      .reply(401, { success: false });

    let responsePromise = action({
      europeanaApiKey: 'XYZ',
      __ow_path: action.telNewspaperIssueUrlPrefix + 'API_Error'
    });

    return responsePromise.then((response) => {
      expect(response.statusCode).to.equal(500);
    });
  });
});
