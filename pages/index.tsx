import React from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

interface boardTypes {
  _id: string,
  title: string,
  contents: string,
  __v?: number,
}

interface boardsTypes {
  boards: boardTypes[];
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/board', {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  });
  const data = await res.json();
  return {
    props: {
      boards: data.data
    }
  }
}

const Home = ({ boards }: boardsTypes) => {
  return (
    <>
      글 목록들 
      <br/>
      <button>
        <Link href='/create'>
          글생성
        </Link>
      </button>
      <br /><br />
      {boards.map((board: boardTypes) => {
        return (
          <div key={board._id}>
            <Link href={`/${board._id}`}>
              <a>{board.title}</a>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default Home