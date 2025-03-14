import React from 'react';
import { Card, Image } from 'antd';

interface PicCardProps {
    width: number;
    height: number;
    url: string;
    title: string;
    created: Date;
    createdby: string;
}

const { Meta } = Card;

const PicCard: React.FC<PicCardProps> = ({ width, height, url, title, created, createdby }) => {
    return (
        <Card
            style={{ width, height }}
            cover={<Image alt={title} src={url} />}
        >
            <Meta title={title} description={<div>{created.toLocaleDateString()}<br />{createdby}</div>} />
        </Card>
    );
};

export default PicCard;
