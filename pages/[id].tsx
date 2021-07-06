import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BoardType } from '../types'
import { GetServerSideProps } from 'next'
import Axios from 'axios'

interface DataType {
    board: BoardType
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const boardData = await Axios.get(`${process.env.SERVER_URL}/api/board/${id}`);

    return {
        props: { board: boardData.data.data }
    }
}

const Details = ({ board }: DataType ) => {
    const router = useRouter();
    const deleteBoard = async () => {
        const id = board._id;
        Axios.delete(`${process.env.SERVER_URL}/api/board/${id}`)
        .then((res) => {
            router.push("/");
        })
        .catch((error) => console.log(error));
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


