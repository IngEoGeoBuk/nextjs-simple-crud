import React from 'react'
import Link from 'next/link';
import { BoardType } from '../types'
import Axios from 'axios'

interface DataType {
  boards: BoardType[]
}

export const getServerSideProps = async () => {
  const boardsData = await Axios.get(`${process.env.SERVER_URL}/api/board`);
  return {
    props: {
      boards: boardsData.data.data
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