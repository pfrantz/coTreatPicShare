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

const CardContent: React.FC<{ created?: Date, createdby: string, isfavourite?: boolean, doClick: () => void }> = ({ created, createdby, isfavourite, doClick }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <div>{createdby}</div>
            <div>{created ? created.toLocaleDateString() : ''}</div>
        </div>
        {isfavourite !== undefined && (
            <div onClick={doClick} style={{ cursor: 'pointer' }}>
                {isfavourite ? <HeartFilled style={{ color: 'red', fontSize: 24 }} /> : <HeartOutlined style={{ fontSize: 24 }} />}
            </div>
        )}
    </div>
);

interface PreviewMaskProps {
    imgPreview: React.ReactNode;
    username: string;
    created: Date;
    info: { transform: any, image: any };
}

const PreviewMask: React.FC<PreviewMaskProps> = ({ imgPreview, username, created, info }) => (
    <div style={{ margin: 20, backgroundColor: "black", height:"70%"}}>
        <div style={{ display: 'flex', gap: 40, padding: "10px 16px 0 16px" }}>
            <div style={{ color: 'white', fontWeight: 'bold' }}>{username}</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>{created.toLocaleDateString()}</div>
        </div>
        <div style={{ display: 'flex', width: "100%", height:"90%"}}>
            <div style={{ flex: '1 1 10%' }}></div>
            <div style={{ flex: '1 1 80%', marginTop: '10px'}}>
                <img src={info.image.url} alt={info.image.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ flex: '1 1 10%' }}></div>
        </div>
    </div>
)
const PicCard: React.FC<PicCardProps> = ({ width, height, id, url, title, created, createdby, isfavourite, onFavouriteClick }) => {

    const doClick = () => {
        if (onFavouriteClick)
            onFavouriteClick(id, !!isfavourite);
    }
    return (
        <Card
            style={{ width, height}}
            bodyStyle={{ padding: 10 }}
            cover={
                <Image
                alt={title}
                src={url}
                style={{ padding: '10px 10px 0px 10px', height: height-100, objectFit: 'cover', objectPosition: 'center' }}
                preview={{
                    imageRender: (imgPreview, info) =>
                        (<PreviewMask imgPreview={imgPreview} info={info} username={createdby} created={created || new Date()} />)

                }}
                />
           }
        >
            <Meta title={title} description={
                <CardContent created={created} createdby={createdby} isfavourite={isfavourite} doClick={doClick} />
            } />

        </Card>
    );
};

export default PicCard;
