import React, { useEffect, useState } from 'react';
import {Divider, Card, List, Grid, Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import PicCard from "~/components/PicCard";


export interface DataType {
    id: number;
    url: string;
    title: string;
    created: Date;
    createdbyid: number;
    createdby: string;
    isfavourite?: boolean;
}

export interface CardListProps {
    prompt?: React.ReactNode;
}

const { useBreakpoint } = Grid;


export const CardList : React.FC<CardListProps> = ({prompt}) => {
    const  dataLoadSize = 30; // this is the number of items to load each time. This should be a multiple of the number of columns

    // the following is needed to set the number of columns and the width of the cards as we need to do the calculations based on the screen size
    // ourselves as the List component does not support grid jusitfy center
    const colBreakpoints   = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
    }

    const widthBreakpoints = {
        xs: 350,
        sm: 250,
        md: 250,
        lg: 250,
        xl: 250,
        xxl: 250,
    }

    const heightBreakpoints = {
        xs: 500,
        sm: 400,
        md: 400,
        lg: 400,
        xl: 400,
        xxl: 400,
    }
    const getColumnFromScreen = (screens: any) => {
        if (screens.xxl) return colBreakpoints['xxl'];
        if (screens.xl) return colBreakpoints['xl'];
        if (screens.lg) return colBreakpoints['lg'];
        if (screens.md) return colBreakpoints['md'];
        if (screens.sm) return colBreakpoints['sm'];
        return colBreakpoints['xs'];
    }

    const getWidthFromScreen = (screens: any) => {
        if (screens.xxl) return widthBreakpoints['xxl'];
        if (screens.xl) return widthBreakpoints['xl'];
        if (screens.lg) return widthBreakpoints['lg'];
        if (screens.md) return widthBreakpoints['md'];
        if (screens.sm) return widthBreakpoints['sm'];
        return widthBreakpoints['xs'];
    }

    const getHeightFromScreen = (screens: any) => {
        if (screens.xxl) return heightBreakpoints['xxl'];
        if (screens.xl) return heightBreakpoints['xl'];
        if (screens.lg) return heightBreakpoints['lg'];
        if (screens.md) return heightBreakpoints['md'];
        if (screens.sm) return heightBreakpoints['sm'];
        return heightBreakpoints['xs'];
    }

    const screens = useBreakpoint();

    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [data, setData] = useState<DataType[]>([]);

    const [columns, setColumns] = useState<number>(getColumnFromScreen(screens));

    useEffect(() => {
        const col = getColumnFromScreen(screens);
        setColumns(col);

    }, [screens]);

    const urls = [
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/37833/rainbow-lorikeet-parrots-australia-rainbow-37833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/60023/baboons-monkey-mammal-freeze-60023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg"
    ];

    const generateData = (size: number, offset: number): DataType[] => {
        return Array.from({ length: size }, (_, idx) => ({
            id: idx + offset + 1,
            url: urls[Math.floor(Math.random()  * urls.length)],
            title: `Title ${idx + offset + 1}`,
            created: new Date(),
            createdbyid: idx + offset + 1,
            createdby: `User ${idx + offset + 1}`,
            isfavourite: Math.random() > 0.5,
        }));
    };

    const loadMoreData = () => {
        if (loading)
            return;
        setLoading(true);
        if (data.length >= 500) {
            setHasMore(false);
            setLoading(false);
            return;
        }
        setTimeout(() => {
            setData([...data, ...generateData(dataLoadSize, data.length)]);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const gutter = 16;
    const cardWidth = getWidthFromScreen(screens);
    const cardHeight = getHeightFromScreen(screens);
    const listWidth = columns * (cardWidth + gutter) - gutter;

    // this list is a pain in that it supports grid layout but not allowing the content
    // to be centered, so we need to wrap it in a div and center that div

    // ALso if we needed to have millions of rows in this list, we would need to use a different
    // component that supports virtualization without needing to have all the data in memory. InifiniteScroll
    // requires all the data to be in memory even though it supports lazy loading.  A better component would support virtualization
    // but this is good enough for what we need as its unlikely that someone will scoll a million rows of pictures
    return (
        <div
            id="scrollableDiv"
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Spin tip="Loading pictures..."><div style={{padding: 50, background: 'rgba(0, 0, 0, 0.05)', borderRadius:4}} /></Spin>}
                loading={loading}
                endMessage={<Divider plain>No more pictures</Divider>}
            >
                <div style={{ width: listWidth}}>
                    {prompt}
                    <List
                        grid={{
                            gutter: gutter,
                            ...colBreakpoints
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.title}>
                                <PicCard
                                    width={cardWidth}
                                    height={cardHeight}
                                    url={item.url}
                                    title={item.title}
                                    created={item.created}
                                    createdby={item.createdby}
                                />
                            </List.Item>
                        )}
                        locale={{ emptyText: (loading)? "Please wait..." : "No pictures found" }}
                    />
                </div>
            </InfiniteScroll>
        </div>
    );
};

