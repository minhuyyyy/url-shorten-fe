export default function Loading() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <p className='mr-6'>Loading</p>
            <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-75'></div>
        </div>
    );
}
