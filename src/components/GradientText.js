const GradientText = ({children}) => (
  <span className='bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent hover:from-green-400 hover:from-blue-500'>
    {children}
  </span>
)
export default GradientText
