/* eslint-disable no-unused-vars */
'use server'
import User from "@/database/user.model"
import { connectToDatabase } from ".."
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetUserByIdParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

 

export const getUserById = async (params: GetUserByIdParams) => {
    try {
      connectToDatabase();
  
      const { userId } = params;
  
      const user = await User.findOne({ clerkId: userId });
  
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const createUser = async (userData: CreateUserParams) => {
    try {
      connectToDatabase();
  const newUser=await User.create (userData)
  return newUser
  
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const updateUser = async (params: UpdateUserParams) => {
    try {
      connectToDatabase();
      const {clerkId,updateData,path}=params

      await User.findOneAndUpdate({clerkId},updateData,{
        new:true
      })

  revalidatePath(path)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const deleteUser = async (params: DeleteUserParams) => {
    try {
      connectToDatabase();
  
 const {clerkId}=params;
 const user = await User.findByIdAndDelete({clerkId})
if(!user){
    throw new Error ("User not found")
}
const userQuestionIds=await Question.find({author:user._id}).distinct('_id');
await Question.deleteMany({author:user._id})

// TODO:delete user answers

const deletedUser=await User.findByIdAndDelete(user._id)
return deletedUser
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export async function getAllUsers(params:GetAllUsersParams) {
    try{
connectToDatabase()

      const {page=1,pageSize=20,filter,searchQuery}=params;
      const users=await User.find({}).sort({createdAt:-1})
      return{users}
    }
    catch(error){
console.log(error);
throw error

    }
  }

  export async function toggleSaveQuestion(params:ToggleSaveQuestionParams) {
    try{
connectToDatabase()
const {userId,questionId,path}=params;
const user=await User.findById(userId)

if(!user) throw new Error('User not found')
const isQuestionSaved=user.saved.includes(questionId)
if(isQuestionSaved){
  await User.findByIdAndUpdate(userId,
    {$pull:{saved:questionId}},
    {new:true}
  )
}else {
  // add question to saved
  await User.findByIdAndUpdate(userId,
    {$addToSet:{saved:questionId}},
    {new:true}
  )
}
revalidatePath(path)
    }
    catch(error){
console.log(error);
throw error

    }
  }