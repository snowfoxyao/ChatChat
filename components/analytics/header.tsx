import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';

import { IoArrowBack } from 'react-icons/io5';

const AnalyticsHeader = ({ serviceProvider }: { serviceProvider: string }) => {
    return (
        <header className='container mx-auto my-10 flex w-full flex-row items-center justify-between'>
            <div className='w-4/12'>
                <Button variant='outline'>
                    <IoArrowBack />
                    <span>Back</span>
                </Button>
            </div>
            <div className='w-4/12 text-center'>
                <p className='text-base font-medium md:text-3xl'>{serviceProvider} Usage</p>
            </div>
            <div className='w-4/12'></div>
        </header>
    );
};

export default AnalyticsHeader;
