import Link from 'next/link';

interface customConfig {
    InputArea: {
        banner: JSX.Element;
    };
    Auth: {
        footer: JSX.Element;
    };
    Dashboard: {
        side: string;
        footer: JSX.Element;
    };
}

export const customConfig: customConfig = {
    InputArea: {
        banner: (
            <p className='text-sm'>
                Copyright © JARVIS AI.{' '}
            </p>
        ),
    },
    Auth: {
        footer: (
            <p className='text-xs'>
                By continuing, you agree to our{' '}
                <Link href='/' target='_blank' className='underline'>
                    Terms of Service
                </Link>
                ,{' '}
                <Link href='/' target='_blank' className='underline'>
                    Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href='/' target='_blank' className='underline'>
                    Cookie Policy
                </Link>
                .
            </p>
        ),
    },
    Dashboard: {
        side: '© JARVIS AI',
        footer: (
            <p className='text-center text-sm'>
                Copyright © JARVIS AI.{' '}
            </p>
        ),
    },
};
