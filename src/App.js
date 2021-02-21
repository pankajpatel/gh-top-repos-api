import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Input from './components/Input';
import RepoList from './components/RepoList';
import Container from './components/Container';

export const ENDPOINT = `${process.env.REACT_APP_API_BASE}/github-repos`

const debounce = (callback, delay = 200) => {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}

const AppContents = ({isLoading, error, data, onChange}) => {
  if (isLoading) {
    return <p className='text-center text-xl text-white'>Loading ...</p>
  }

  if (error) {
    return (
      <p className='text-center text-xl text-white'>
        'An error has occurred: ' + error.message
      </p>
    )
  }

  return <>
    <Input onChange={onChange} />
    <RepoList repositories={data.repositories || []} />
  </>
}

const App = () => {
  const [userName, setUserName] = useState('pankajpatel')

  const { isLoading, error, data, refetch } = useQuery('repoData', () =>
    fetch(`${ENDPOINT}?user=${userName}`).then(res => res.json())
  )

  useEffect(() => { refetch() }, [refetch, userName])

  return (
    <Container>
      <AppContents
        data={data}
        error={error}
        isLoading={isLoading}
        onChange={(value) => debounce(setUserName(value), 250)}
      />
    </Container>
  )
}

export default App;
