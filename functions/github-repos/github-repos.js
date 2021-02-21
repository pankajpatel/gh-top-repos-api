const filter = require('json-schema-filter');

const schema = {
  type: 'object',
  properties: {
    repositories: {
      type: 'array',
      items: {
        type: 'object',
        required: false,
        properties: {
          stargazers_count: { type: 'integer', default: 0 },
          name: { type: 'string' },
          language: { type: 'string' },
          full_name: { type: 'string' },
          html_url: { type: 'string' },
          homepage: { type: 'string' }
        }
      }
    }
  }
};

const filterResponse = response => filter(
  schema,
  {repositories: response.data.filter(repo => !repo.fork)}
)

exports.handler = async function(event, context, callback) {
  const {Octokit} = require('@octokit/rest')
  if (event.httpMethod === 'POST') {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: 'Not Allowed' }),
    });
  }

  const user = event.queryStringParameters.user

  const api = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
  })

  const endpoint = user ? `/users/${user}/repos` : '/user/repos'

  try {

    const response = await api.request(
      `GET ${endpoint}`,
      {visibility: 'public', sort: 'updated', direction: 'desc'}
    )
  
    return {
      statusCode: 200,
      body: JSON.stringify(filterResponse(response)),
    }
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}