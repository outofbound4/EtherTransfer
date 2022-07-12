import type { NextPage } from 'next'
import Header from '../components/Header'
const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen text-white select-none flex flex-col justify-between`,
}

const Home: NextPage = () => {
  return (
    <div className={ style.wrapper }>
      <Header />
      <h1>Bye</h1>
    </div>
  )
}

export default Home
