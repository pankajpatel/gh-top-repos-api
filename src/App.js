import { useQuery } from 'react-query';
import Card from './GitHubRepoCard';

export const ENDPOINT = `${process.env.REACT_APP_API_BASE}/github-repos`

function App() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(ENDPOINT).then(res =>
      res.json()
    )
  )
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="min-h-screen box-border p-10 bg-gradient-to-r from-green-400 to-blue-500">
      <div className='flex flex-wrap flex-center justify-center justify-items-center'>
        {data.repositories.map(repo => (
          <Card data={repo} key={repo.name} />
        ))}
      </div>
    </div>
  )
}

export default App;
