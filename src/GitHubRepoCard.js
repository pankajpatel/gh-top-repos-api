const StarBadge = ({count}) => count ? (
  <span className='bg-gray-700 text-white border border-gray-900 rounded px-1'>
    🌟 {count}
  </span>
) : null

const LanguageBadge = ({language}) => language ? (
  <div className='bg-red-500 text-white border border-red-600 rounded px-1'>
    {language}
  </div>
) : null

const GradientText = ({children}) => (
  <span className='bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent hover:from-green-400 hover:from-blue-500'>
    {children}
  </span>
)


const Card = ({data, className = ''}) => (
  <a href={data.html_url} className={`transform hover:scale-110 transition duration-150 ease-in-out ${className}`}>
    <div className="bg-white p-1 m-3 w-80 border border-transparent rounded shadow shadow-lg">
      <div className="flex items-end w-full h-full">
        <div className="w-full p-2">
          <div className="mb-4">
            <div className="block font-semibold leading-normal truncate text-2xl">
              <GradientText>{data.name}</GradientText>
            </div>
          </div>
          <div className='flex text-sm language justify-between'>
            {data.language && <LanguageBadge language={data.language} />}
            {data.stargazers_count
              ? <StarBadge count={data.stargazers_count} />
              : null}
          </div>
        </div>
      </div>
    </div>
  </a>
)

export default Card
