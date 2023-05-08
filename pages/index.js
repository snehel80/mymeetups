import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
    <Head>
      <title>My Meetups</title>
      <meta name="description" content="Browse a huge list of highly active meetups" />
    </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps=async()=>{
  const client = await MongoClient.connect(
    "mongodb+srv://aschargedunia40:sneheldrinksib@datas.wokjgrl.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props:{
      meetups:meetups.map((meetup)=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}

// export const getServerSideProps = async(context) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     }
//   };
// };

export default HomePage;
