const StarBadge = ({count}) => count ? (
  <span className='bg-gray-700 text-white border border-gray-900 rounded px-1'>
    🌟 {count}
  </span>
) : null

export default StarBadge