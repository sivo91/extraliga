import db from "@/utils/db";
import Team from '@/modules/Team'


const handler = async (req, res) => {
  

  await db.connect();
  const team = await Team.findById(req.query.id);

  console.log(team)
  
  team.vote += 1

  await team.save()

  await db.disconnect(); 
  res.status(200).json({ message: 'success '})
};

export default handler