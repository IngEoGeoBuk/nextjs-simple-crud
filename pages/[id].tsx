import React from 'react'
import Link from 'next/link';

interface boardTypes {
    _id: string,
    title: string,
    contents: string,
    __v?: number,
}

interface boardsTypes {
    board: boardTypes;
}


export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/board');
    const data = await res.json();

    const paths = data.data.map((data: boardTypes) => {
        return {
            params: { id: data._id }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3000/api/board/' + id, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    });
    const data = await res.json();
    return {
        props: { board: data.data }
    }
}

const Details = ({ board } : boardsTypes ) => {
    return (
        <div>
            글 제목 : {board.title}
            <br/>
            글 내용 : {board.contents}
            <br/>
            <Link href='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    )
}

export default Details


