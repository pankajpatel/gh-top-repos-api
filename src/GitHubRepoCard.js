const Card = ({data, className = ''}) => (
  <div className={className}>
    <div className="bg-white p-1 m-3 w-80 border border-transparent rounded shadow shadow-lg">
      <div className="flex items-end w-full h-full">
        <div className="w-full p-2">
          <div className="mb-4">
            <a
              href={data.html_url}
              className="block font-semibold leading-normal truncate text-2xl"
            >
              <span className='bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent hover:from-green-400 hover:from-blue-500'>
                {data.name}
              </span>
            </a>
          </div>
          <div className='flex text-sm language'>
            {data.language && (
              <div className='bg-red-500 text-white border border-red-500 rounded px-1'>
                {data.language}
              </div>
            )}
            {' '}
            {data.stargazers_count ? <strong>✨ {data.stargazers_count}</strong> : null}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Card