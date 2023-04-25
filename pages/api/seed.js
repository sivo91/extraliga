import db from '@/utils/db'
import Team from '@/modules/Team'

const handler = async (req, res ) => {
  await db.connect()

  await Team.deleteMany()
  
 
  await db.disconnect()
  res.send({ message: 'seeded successfully'})

}

export default handler;