import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Card, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';


const data = [];
for (let i = 1; i <= 500; i++) {
    data.push({ title: `Title ${i}` });
}

const CardListX: React.FC = () => (
    <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 8,
        }}
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <Card title={item.title}>Card content</Card>
            </List.Item>
        )}
    />
);

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

const CardList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            id="scrollableDiv"
            //style={{
            //    height: 400,
            //    overflow: 'auto',
            //    padding: '16px',
            //    border: '1px solid rgba(140, 140, 140, 0.35)',
            //}}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 400}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                //scrollableTarget="scrollableDiv"
            >
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 8,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            {/*<List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />*/}
                            <Card title={item.email}>Card content</Card>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};


export default CardList;
