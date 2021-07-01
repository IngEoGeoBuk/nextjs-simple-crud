import fetch from 'isomorphic-unfetch'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { BoardType } from '../../types'
import { GetServerSideProps } from 'next'

interface DataType {
    board: BoardType;
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

const Update = ({ board }: DataType ) => {
    const [title, setTitle] = useState<string>(`${board.title}`);
    const [contents, setContents] = useState<string>(`${board.contents}`);
    const router = useRouter();

    const UpdatePost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/board/${board._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, contents })
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>글 수정 </div>
            <br />
            <input
                type="text"
                placeholder="글 제목을 입력하세요."
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <div>글 내용 </div>
            <br />
            <input
                type="text"
                placeholder="글 내용을 입력하세요."
                value={contents}
                onChange={(e) => { setContents(e.target.value) }}
            />
            <br />
            <button onClick={() => { UpdatePost() }}>
                글 수정
            </button>
            <Link href='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    )
}

export default Update
