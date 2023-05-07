'use client';

import { useEffect, useState } from 'react';

import { DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';

import store from '@/hooks/store';
import { useAtomValue } from 'jotai';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { DatePickerWithRange } from '@/components/analytics/data-range-picker';

import { getTodayUsage, getUsageRangeByMinutes, getWeeklyUsage } from '@/utils/provider/openai/info';

const AnalyticsMain = () => {
    const todayDate = new Date();
    const tenDaysAgo = addDays(todayDate, -10);

    const [date, setDate] = useState<DateRange | undefined>({
        from: tenDaysAgo,
        to: todayDate,
    });

    const openAIConfig = useAtomValue(store.openAIConfigAtom);

    const [todayUsage, setTodayUsage] = useState<number>(0);

    const [weeklyUsage, setWeeklyUsage] = useState<any>([]);
    const [minutesUsage, setMinutesUsage] = useState<any>([]);

    useEffect(() => {
        // getTodayUsage(openAIConfig.apiKey).then((usage) => setTodayUsage(usage));
        getWeeklyUsage(openAIConfig.apiKey).then((usage) => setWeeklyUsage(usage));
        getUsageRangeByMinutes(openAIConfig.apiKey).then((usage) => setMinutesUsage(usage));
    }, [openAIConfig.apiKey]);

    // console.log(todayUsage);

    // console.log(weeklyUsage);

    return (
        <div className='container mx-auto space-y-10'>
            <div className='flex items-center justify-end'>
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            <Tabs defaultValue='minute' className='w-full'>
                <TabsList>
                    <TabsTrigger value='minute'>Minute</TabsTrigger>
                    <TabsTrigger value='weekly'>Weekly</TabsTrigger>
                </TabsList>
                <TabsContent value='minute'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>Your OpenAI Analysis data by date</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width='100%' height={350}>
                                <BarChart data={minutesUsage}>
                                    <XAxis dataKey='minute' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey='gpt-3.5-turbo-0301' fill='#fdba74' stackId='a' radius={[4, 4, 0, 0]} />
                                    <Bar dataKey='gpt-4' fill='#ef4444' stackId='a' radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='weekly'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>Your OpenAI Analysis data by date</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width='100%' height={350}>
                                <BarChart data={weeklyUsage}>
                                    <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey='gpt-3.5-turbo-0301' fill='#fdba74' stackId='a' radius={[4, 4, 0, 0]} />
                                    <Bar dataKey='gpt-4' fill='#ef4444' stackId='a' radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AnalyticsMain;
