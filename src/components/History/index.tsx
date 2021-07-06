import { Navbar } from '@components'
import Head from 'next/head'

const History = ({ data }) => (
  <>
    <Head>
      <title>Summary</title>
    </Head>
    <Navbar data={data?.header} />
    <div>History!</div>
  </>
)

export default History
