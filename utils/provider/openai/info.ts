import { formatDate } from '@/utils/app/date';

export const getTodayUsage = async (apiKey: string) => {
    if (!apiKey || apiKey === '') {
        return;
    }

    const today = new Date();

    const response = await fetch('https://api.openai.com/v1/usage?date=' + formatDate(today), {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    const json = await response.json();

    return json;
};

export const getUsageRangeByMinutes = async (apiKey: string) => {
    if (!apiKey || apiKey === '') {
        return;
    }

    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-05-07');

    const fetchDateData = async (date: Date) => {
        const response = await fetch('https://api.openai.com/v1/usage?date=' + formatDate(date), {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const json = await response.json();
        return json.data;
    };

    const dateArray = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dateArray.push(new Date(d));
    }

    const usageData = await Promise.all(dateArray.map(fetchDateData));

    const flattenedUsageData = usageData.reduce((acc, val) => acc.concat(val), []);

    const convertedData = convertUsageDataToMinutes(flattenedUsageData);

    return convertedData;
};

const convertUsageDataToMinutes = (usageData: any[]) => {
    const minutes: any = {};

    usageData.forEach((data: any) => {
        const timestamp = data.aggregation_timestamp;
        const snapshotId = data.snapshot_id;
        const date = new Date(timestamp * 1000);
        const minute = date.toISOString().slice(0, 16); // Extract timestamp in format "YYYY-MM-DD HH:mm"

        if (!minutes[minute]) {
            minutes[minute] = {};
        }

        minutes[minute][snapshotId] = data.n_generated_tokens_total;
    });

    const convertedData = Object.keys(minutes).map((minute) => {
        const minuteData = minutes[minute];
        const totalTokens = Object.values(minuteData).reduce((acc: any, value: any) => acc + value, 0);
        return {
            minute: minute,
            ...minuteData,
            totalTokens: totalTokens,
        };
    });

    return convertedData;
};

export const getWeeklyUsage = async (apiKey: string) => {
    if (!apiKey || apiKey === '') {
        return;
    }

    const startDate = new Date('2023-05-01');
    const endDate = new Date('2023-05-07');

    const fetchDateData = async (date: Date) => {
        const response = await fetch('https://api.openai.com/v1/usage?date=' + formatDate(date), {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const json = await response.json();

        const data = json.data;

        console.log(data);

        data.sort((a: any, b: any) => a.aggregation_timestamp - b.aggregation_timestamp);

        const groupedData: any = [];
        let currentDate: any = null;
        let currentGroup: any = null;
        data.forEach((datum: any) => {
            const date = new Date(datum.aggregation_timestamp * 1000).toISOString().substring(0, 10);
            if (date !== currentDate) {
                if (currentGroup) {
                    groupedData.push(currentGroup);
                }
                currentGroup = [];
                currentDate = date;
            }
            currentGroup.push(datum);
        });
        if (currentGroup) {
            groupedData.push(currentGroup);
        }

        console.log(groupedData);
        return groupedData;
    };

    const dateArray = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dateArray.push(new Date(d));
    }

    const usageData = await Promise.all(dateArray.map(fetchDateData));

    const flattenedUsageData = usageData.reduce((acc, val) => acc.concat(val), []);

    const convertedData = convertUsageDataToMinutes(flattenedUsageData);

    return convertedData;
};

export const getUsageByDateRange = async (apiKey: string, startDate: string, endDate: string) => {
    const response = await fetch(`https://api.openai.com/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    const json = await response.json();
    return json;
};

export const getOpenAIInfo = async (apiKey: string) => {
    const response = await fetch('https://api.openai.com/dashboard/billing/subscription', {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    const json = await response.json();
    return json;
};
