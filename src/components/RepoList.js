import Card from './Card'

const RepoList = ({repositories}) => (
  <div className='flex flex-wrap flex-center justify-center justify-items-center'>
    {(repositories || []).map(repo => (
      <Card data={repo} key={repo.name} />
    ))}
  </div>
)
export default RepoList
