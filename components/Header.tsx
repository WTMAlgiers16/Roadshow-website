import Image from 'next/image';

const Header = () => {
  return (
    <div className='py-2 flex mb-6'>
        <Image src="/icon.svg" alt="Logo" width={80} height={80} />
        <div className='ml-4 flex flex-col justify-center '>
            <p className='text-2xl font-bold font-montserrat bg-gradient-to-r from-[var(--background-gradient1)] via-[#DC6EC2] to-[var(--background-gradient1)] bg-clip-text text-transparent'>Women TechMakers Algiers</p>
            <p className='text-xl font-semibold font-montserrat bg-gradient-to-r from-[var(--background-gradient1)] via-[#DC6EC2] to-[var(--background-gradient1)] bg-clip-text text-transparent'>UnitTour</p>
        </div>
    </div>
  )
}

export default Header