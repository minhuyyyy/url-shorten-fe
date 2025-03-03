import Image from 'next/image';
import ShortenLinkComponent from '@components/shorten_link/ShortenLinkComponent';
import bannerImg from '@/public/banner-img.svg';
export default function Home() {
    return (
        <>
            <div className='flex flex-col w-full sm:w-1/3 text-center sm:text-left items-center'>
                <ShortenLinkComponent />
            </div>
            <div className='flex justify-center sm:w-1/2'>
                <Image
                    src={`${bannerImg.src}`}
                    alt='banner'
                    width={bannerImg.width}
                    height={bannerImg.height}
                    className='max-w-full h-auto'
                />
            </div>
        </>
    );
}
