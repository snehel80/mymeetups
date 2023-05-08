import { MongoClient } from "mongodb";

const handler = async(req, res) => {
  if (req.method == "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://aschargedunia40:sneheldrinksib@datas.wokjgrl.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({message:'Meetup Inserted'});
  }
};

export default handler;
