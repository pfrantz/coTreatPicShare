import React from 'react';
import { Card, Image } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

interface PicCardProps {
    width: number;
    height: number;
    id: number;
    url: string;
    title: string;
    created?: Date;
    createdby: string;
    isfavourite?: boolean;
    onFavouriteClick?: (id:number, isSelected:boolean) => void;
}

const { Meta } = Card;

const PicCard: React.FC<PicCardProps> = ({ width, height, id, url, title, created, createdby, isfavourite, onFavouriteClick }) => {

    const doClick = () => {
        if (onFavouriteClick)
            onFavouriteClick(id, !!isfavourite);
    }
    return (
        <Card
            style={{ width, height }}
            cover={<Image alt={title} src={url} />}
        >
            <Meta title={title} description={<div>{(created) ? created.toLocaleDateString() : ''}<br />{createdby}</div>} />
            {(isfavourite !== undefined) ? <div style={{ position: 'absolute', bottom: 24, right: 24 }} onClick={doClick}>
                {isfavourite ? <HeartFilled style={{ color: 'red', fontSize: 24 }} /> : <HeartOutlined style={{fontSize: 24}} />}
            </div> : null}
        </Card>
    );
};

export default PicCard;
