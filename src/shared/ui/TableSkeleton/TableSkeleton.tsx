import React from 'react';
import { Placeholder, Table } from 'react-bootstrap';

interface Props {
    titles: string[];
}

export const TableSkeleton = ({ titles }: Props) => {
    const TableLoadRow = () => (
        <tr>
            {titles.map((item, i) => (
                <td key={i}>
                    <Placeholder as={'p'} animation="glow">
                        <Placeholder xs={12} bg="secondary" />
                    </Placeholder>
                </td>
            ))
            }
        </tr>
    );

    return (
        <div className={'Table'}>
            <Table>
                <thead>
                <tr>
                    {titles.map(title => (
                        <th key={title}>{title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <TableLoadRow />
                <TableLoadRow />
                <TableLoadRow />
                <TableLoadRow />
                <TableLoadRow />
                </tbody>
            </Table>
        </div>
    );
};
