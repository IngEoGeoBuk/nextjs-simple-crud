import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { BoardType } from '../../types'
import { GetServerSideProps } from 'next'
import Axios from 'axios'

interface DataType {
    board: BoardType;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const boardData = await Axios.get(`${process.env.SERVER_URL}/api/board/${id}`);

    return {
        props: { board: boardData.data.data }
    }
}

const Update = ({ board }: DataType ) => {
    const [title, setTitle] = useState<string>(`${board.title}`);
    const [contents, setContents] = useState<string>(`${board.contents}`);
    const router = useRouter();

    const UpdatePost = async () => {
        Axios.put(`${process.env.SERVER_URL}/api/board/${board._id}`, {
            title, contents
        })
        .then((res) => { router.push("/")})
        .catch((error) => { console.log(error) })
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
