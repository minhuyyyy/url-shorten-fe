import Image from 'next/image';
import ShortenLinkComponent from '@components/shorten_link/ShortenLinkComponent';
import bannerImg from '@/public/banner-img.svg';
export default function Home() {
    return (
        <>
            <div className='flex flex-col md:flex-row w-4/5 text-center sm:text-left items-center justify-center'>
                <ShortenLinkComponent />
                <Image
                    src={`${bannerImg.src}`}
                    alt='banner'
                    width={bannerImg.width}
                    height={bannerImg.height}
                    className='sm:w-1/2 w-full h-auto'
                />
            </div>
            {/* <div className='flex justify-center sm:w-1/4'>
            </div> */}
        </>
    );
}
