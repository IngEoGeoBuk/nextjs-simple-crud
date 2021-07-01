import React from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import { BoardType } from '../types'

interface DataType {
  boards: BoardType[]
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/board`, {
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

const Home = ({ boards }: DataType) => {
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
      {boards.map((board: BoardType) => {
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