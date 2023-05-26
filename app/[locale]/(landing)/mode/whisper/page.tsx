'use client';

import store from '@/hooks/store';
import { useAtomValue } from 'jotai';

import LandingHeader from '@/components/landing/main/header';
import WhisperMain from '@/components/landing/main/whisper-main';

export default function WhisperModePage() {
    const isHiddenSide = useAtomValue(store.isHiddenSideAtom);

    return (
        <div className={`h-screen overflow-hidden ${!isHiddenSide && 'md:ml-80'}`}>
            <LandingHeader />
            <WhisperMain />
        </div>
    );
}
