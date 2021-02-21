import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Card from './GitHubRepoCard';

const debounce = (callback, delay = 200) => {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}

export const ENDPOINT = `${process.env.REACT_APP_API_BASE}/github-repos`

function App() {
  const inputRef = useRef(null)
  const [userName, setUserName] = useState('pankajpatel')

  const { isLoading, error, data, refetch } = useQuery('repoData', () =>
    fetch(`${ENDPOINT}?user=${userName}`).then(res => res.json())
  )

  useEffect(() => { refetch() }, [refetch, userName])

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="min-h-screen box-border p-10 bg-gradient-to-r from-green-400 to-blue-500">
      <p className='text-center text-xl text-white'>
        👇 GH Username 👇
      </p>
      <div className="flex flex-column justify-center outline m-3">
        <input
          ref={inputRef}
          list='usernames'
          type='text'
          placeholder='GH Username'
          defaultValue={userName}
          onChange={() => { 
            const value = inputRef.current.value
            debounce(setUserName(value), 250)
          }}
          className='px-4 py-2 border-2 rounded-3xl'
        />
        <datalist id="usernames">
          <option value="sindresorhus" />
          <option value="tj" />
          <option value="tannerlinsley" />
          <option value="pankajpatel" />
        </datalist>
      </div>
      <div className='flex flex-wrap flex-center justify-center justify-items-center'>
        {(data.repositories || []).map(repo => (
          <Card data={repo} key={repo.name} />
        ))}
      </div>
    </div>
  )
}

export default App;
