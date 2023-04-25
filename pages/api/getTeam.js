import db from "@/utils/db";
import Team from '@/modules/Team'





const Handler = async (req, res) => {

  await db.connect();
  const team = await Team.find({});
  await db.disconnect();

  res.send(team);
};

export default Handler