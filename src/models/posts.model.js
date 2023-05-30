import { Types } from 'mongoose';

import posts from './posts.mongo.js';

export async function addNewPost(postData) {
    return await posts.create(postData);
}

export async function getAllUserPosts(user) {
    const userId = user.userId;

    return await posts.aggregate([
        ...generateTheUserPostsQuery(['water', 'bait', 'fish']),
        {
            $match: {
              userId: Types.ObjectId(userId)
            }
        },
        {
            $project: {
                "__v": 0,
                userId: 0,
                baitId: 0,
                fishId: 0,
                waterId: 0,
            }
        },
    ]);      
}

function generateTheUserPostsQuery(postJoinFields) {
    const query = [];

    for(const field of postJoinFields) {
        query.push({
            $lookup: {
              from: field == 'fish' ? field : `${field}s`,
              let: { [`${field}Id`]: `$${field}Id` },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", `$$${field}Id`] }
                  }
                },
                {
                  $project: {
                    "__v": 0,
                  }
                }
              ],
              as: field
            }
        });
        
        query.push({
              $addFields: {
                [`${field}`]: { $arrayElemAt: [`$${field}`, 0] }
              }
        });
    }

    return query;
}
