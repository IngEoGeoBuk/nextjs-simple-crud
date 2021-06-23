import React from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/board');
  const data = await res.json();
  return {
    props: {
      boards: data.data
    }
  }
}

const Home = ({ boards } : any) => {
  
  return (
    <>
      글 목록들 
      <br /><br />
      {boards.map((board : any) => {
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