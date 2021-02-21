import {useRef} from 'react'

const Input = ({onChange}) => {
  const inputRef = useRef(null)
  return (
    <>
      <p className='text-center text-xl text-white'>
        👇 GH Username 👇
      </p>
      <div className="flex flex-column justify-center outline m-3">
        <input
          ref={inputRef}
          list='usernames'
          type='text'
          placeholder='GH Username'
          onChange={() => onChange(inputRef.current.value)}
          className='px-4 py-2 border-2 rounded-3xl'
        />
        <datalist id="usernames">
          <option value="sindresorhus" />
          <option value="tj" />
          <option value="tannerlinsley" />
          <option value="pankajpatel" />
        </datalist>
      </div>
    </>
  )
}

export default Input
