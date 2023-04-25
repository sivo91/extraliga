import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
    },
    vote: { 
      type: Number,  
    },
    name: {
      type: String
    }, 
    img: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export default Team;