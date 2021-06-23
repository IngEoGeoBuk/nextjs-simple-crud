import fetch from 'isomorphic-unfetch'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const Create = () => {
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const router = useRouter();

    const CreatePost = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/board', {
                method: 'POST',
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
            <div>글 제목 </div>
            <br />
            <input 
                type="text"
                placeholder="글 제목을 입력하세요."
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <div>글 내용 </div>
            <br />
            <input 
                type="text"
                placeholder="글 내용을 입력하세요." 
                onChange={(e) => { setContents(e.target.value) }}
            />
            <br/>
            <button onClick={() => { CreatePost() }}>
                글 생성
            </button>
            <Link href='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    )
}

export default Create
