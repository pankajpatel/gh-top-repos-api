const LanguageBadge = ({language}) => language ? (
  <div className='bg-red-500 text-white border border-red-600 rounded px-1'>
    {language}
  </div>
) : null

export default LanguageBadge