import React from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

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
            {board.title}
          </div>
        )
      })}
    </>
  )
}

export default Home


// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();

//   return {
//     props: { ninjas: data }
//   }
// }

// const Ninjas = ({ ninjas } : any) => {
//   return (
//     <div>
//       <h1>All Ninjas</h1>
//       {ninjas.map((ninja : any) => (
//         <Link href={'/ninjas/' + ninja.id} key={ninja.id}>
//             <h3>{ninja.name}</h3>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Ninjas;