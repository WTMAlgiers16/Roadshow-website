import Image from 'next/image';

const Header = () => {
  return (
    <div className='py-8 mb-16'>
        <Image src="favicon.svg" alt="Logo" width={50} height={50} />
    </div>
  )
}

export default Header