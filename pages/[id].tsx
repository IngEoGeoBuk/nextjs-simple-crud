import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BoardType } from '../types'
import { GetServerSideProps } from 'next'

interface DataType {
    board: BoardType
}

export const getStaticPaths = async () => {
    const res = await fetch(`http://localhost:3000/api/board`);
    const data = await res.json();

    const paths = data.data.map((data: BoardType) => {
        return {
            params: { id: data._id }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const res = await fetch(`http://localhost:3000/api/board/${id}`, {
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

const Details = ({ board }: DataType ) => {
    const router = useRouter();
    const deleteBoard = async () => {
        const id = board._id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/board/${id}`, {
                method: "Delete"
            });
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            글 제목 : {board.title}
            <br/>
            글 내용 : {board.contents}
            <br/>
            <Link href='/'>
                <button>뒤로가기</button>
            </Link>
            <br /><br />
            <Link href={`/update/${board._id}`}>
                <button>글 수정</button>
            </Link>
            <br /><br />
            <button onClick={deleteBoard}>글삭제</button>
        </div>
    )
}

export default Details


