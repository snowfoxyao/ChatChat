import AnalyticsHeader from '@/components/analytics/header';
import AnalyticsMain from '@/components/analytics/main';

const OpenAIAnalyticsPage = () => {
    return (
        <div className='flex h-screen w-screen flex-col'>
            <AnalyticsHeader serviceProvider='OpenAI' />
            <AnalyticsMain />
        </div>
    );
};

export default OpenAIAnalyticsPage;
