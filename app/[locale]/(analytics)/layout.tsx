import { getCurrentUserProfile } from '@/lib/auth/session';

export default async function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    const userProfile = await getCurrentUserProfile();

    return <>{children}</>;
}
