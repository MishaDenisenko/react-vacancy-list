import { useNavigate } from 'react-router';
import { Button } from '@heroui/react';
import { ConfigProvider, Empty as AntdEmpty, theme } from 'antd';

import { PATHS } from '../../constants/paths.ts';
import { useTheme } from '../../hooks';


const { darkAlgorithm, compactAlgorithm } = theme;

export const Empty = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    
    return (
        <ConfigProvider theme={ { algorithm: theme === 'dark' ? darkAlgorithm : compactAlgorithm } }>
            <div className={ 'flex flex-col justify-center text-center gap-y-10 py-6' }>
                <AntdEmpty
                    styles={ {
                        image: { height: 120 }
                    } }
                    description={ <>No Data</> }
                />
                <Button
                    className={ 'mx-auto' }
                    color={ 'secondary' }
                    variant={ 'ghost' }
                    onPress={ () => navigate(PATHS.vacancyAdd) }
                >
                    Add New Vacancy
                </Button>
            </div>
        </ConfigProvider>
    );
};