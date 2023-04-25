import db from "@/utils/db";
import Team from '@/modules/Team'





const Handler = async (req, res) => {

  await db.connect();
  const team = await Team.find({});
  console.log(team)
  await db.disconnect();
  
  res.status(200).send(team);
};

export default Handler