import { Cell, List, Section } from '@telegram-apps/telegram-ui';
import React, { FC } from 'react';
import { Link } from '../link/Link';


export const Base: FC = () => {
    return (
        <>
            <div>Base Component</div>
            <List>
                <Section
                    header='Base'
                    footer='You can use next links:'
                >
                    <Link to='/counter'>
                        <Cell subtitle="Here's a simple counter">Counter</Cell>
                    </Link>
                </Section>
                <Section>
                    <Link to='/hello'>
                        <Cell subtitle="Here's a hello page">Hello page</Cell>
                    </Link>
                </Section>
            </List>
        </>
    );
}