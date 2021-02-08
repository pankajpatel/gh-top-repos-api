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


  const api = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
  })

  const response = await api.request(
    `GET /user/repos`,
    {visibility: 'public'}
  )

  return {
    statusCode: 200,
    body: JSON.stringify(filterResponse(response)),
  }
}