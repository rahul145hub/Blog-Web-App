import mongoose from 'mongoose'

export const connection = async () => {
   try {
      await mongoose.connect(process.env.URL);
      console.log('Database Connected');
   } catch (error) {
      console.log(`Not Connected`);
   }
}