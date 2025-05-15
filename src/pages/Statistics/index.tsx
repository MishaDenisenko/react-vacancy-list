import { useEffect, useState } from 'react';
import { Progress, Skeleton, Tooltip } from '@heroui/react';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';

import { StatusChip } from '../../components/StatusChip';
import { Status, statuses } from '../../types.ts';
import { getStatusColor } from '../../servises/get-status-color.ts';
import { getAll } from '../../servises/vacancy-service.ts';
import { useTheme } from '../../hooks';


const initialStatisticState = [...statuses, 'Overed'].reduce((acc, s) => {
    acc[s] = 0;
    return acc;
}, {});

export const Statistics = () => {
    const [allVacancies, setAllVacancies] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [statistic, setStatistic] = useState({ ...initialStatisticState });
    
    const { theme } = useTheme();
    
    
    useEffect(() => {
        setIsLoading(true);
        (async () => setAllVacancies(await getAll()))();
        
        return setStatistic({ ...initialStatisticState });
    }, []);
    
    useEffect(() => {
        setIsLoading(false);
        if (!allVacancies.length) return;
        
        setStatistic(allVacancies.reduce((acc, v) => {
            acc[v.status] += 1;
            !v.isActive && acc['Overed']++;
            
            return acc;
        }, { ...initialStatisticState }));
    }, [allVacancies]);
    
    return (
        <Card>
            <CardHeader />
            <Tooltip
                className={ `${ theme } text-foreground` }
                content={ (
                    <p className={ 'p-5 text-medium' }>
                        Total records count: { allVacancies.length }
                    </p>
                ) }
                isOpen={ isOpen }
                onOpenChange={ (open) => setIsOpen(open) }
                closeDelay={ 0 }
                offset={ -15 }
                size={ 'lg' }
                isDisabled={ isLoading }
            >
                <CardBody className={ 'px-10 gap-5' }>
                    {
                        Object.keys(statistic).map(k => (
                            <Skeleton key={ k } className={ 'rounded-lg' } isLoaded={ !isLoading }>
                                <Progress
                                    className={ `max-w-full text-foreground` }
                                    color={ k === 'Overed' ? 'warning' : getStatusColor(k as Status) }
                                    label={ (
                                        <StatusChip status={ k === 'Overed' ? null : k as Status }>
                                            { k }
                                        </StatusChip>
                                    ) }
                                    maxValue={ allVacancies.length }
                                    showValueLabel
                                    valueLabel={ (
                                        <StatusChip status={ k === 'Overed' ? null : k as Status }>
                                            { allVacancies.length ? (100 / allVacancies.length) * statistic[k] : 0 } %
                                        </StatusChip>
                                    ) }
                                    value={ statistic[k] }
                                />
                            </Skeleton>
                        ))
                    }
                </CardBody>
            </Tooltip>
            <CardFooter />
        </Card>
    );
};