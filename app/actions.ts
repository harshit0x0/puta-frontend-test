'use server'

import dbConnect from '@/db/dbConnect'
import User from '@/db/models/user'
import Activity from '@/db/models/activity'
import Member from '@/db/models/member'

import { encryptPassword, matchPassword } from '@/lib/hash'
import { cookies } from 'next/headers'

export const createUser = async (name: string, password: string, role: string) => {
    try{
        await dbConnect();
        const hashedPassword = await encryptPassword(password);
        const user = await User.create({ name, password: hashedPassword, role });
        user.save();
        const userData = JSON.stringify(user);
        return {
            status: 200,
            data: userData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}

export const loginUser = async (name: string, password: string) => {
    try{
        const cookieStore = await cookies();
        await dbConnect();
        const user = await User.findOne({ name });
        if(!user){
            return {
                status: 404,
                message: 'User not found'
            };
        }
        const isPasswordMatch = await matchPassword(password, user.password);
        if(!isPasswordMatch){
            return {
                status: 401,
                message: 'Incorrect Password'
            };
        }
        cookieStore.set('user', user.name);
        return {
            status: 200,
            message: 'Login successful'
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            message: error.message || "Something went wrong"
        };
    }
}

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('user');
    return {
        status: 200,
        message: 'Logout successful'
    };
}

export const getUser = async () => {
    const cookieStore = await cookies();
    const user = cookieStore.get('user');
    if(!user){
        return {
            status: 401,
            message: 'Unauthorized'
        };
    }
    return {
        status: 200,
        data: user
    };
}


export const createActivity = async (title: string, date: string, description: string, image: string) => {
    try{
        await dbConnect();
        const activity = await Activity.create({ title, date, description, image });
        activity.save();
        const activityData = JSON.stringify(activity);
        return {
            status: 200,
            data: activityData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}

export const getActivities = async () => {
    try{
        await dbConnect();
        const activities = await Activity.find();
        const activitiesData = JSON.stringify(activities);
        return {
            status: 200,
            data: activitiesData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}

export const getActivity = async (id: string) => {
    try{
        await dbConnect();
        const activity = await Activity.findById(id);
        const activityData = JSON.stringify(activity);
        return {
            status: 200,
            data: activityData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}

export const deleteActivity = async (id: string) => {
    try{
        await dbConnect();
        const activity = await Activity.findByIdAndDelete(id);
        const activityData = JSON.stringify(activity);
        return {
            status: 200,
            data: activityData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}

export const updateActivity = async (id: string, title: string, date: string, description: string, image: string) => {
    try{
        await dbConnect();
        const activity = await Activity.findByIdAndUpdate(id, { title, date, description, image }, { new: true });
        const activityData = JSON.stringify(activity);
        return {
            status: 200,
            data: activityData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}


export const createMember = async ({data} : {data: any}) => {
    try{
        await dbConnect();
        const member = await Member.create(data);
        member.save();
        const memberData = JSON.stringify(member);
        return {
            status: 200,
            data: memberData
        };
    }catch(error){
        return {
            // @ts-ignore
            status: error.status || 500,
            // @ts-ignore
            data: error.message || "Something went wrong"
        };
    }
}
