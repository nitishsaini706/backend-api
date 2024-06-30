const Discussion = require('../models/Discussion');

async function createDiscussion(reqBody) {
    const { userId, text, imageUrl, hashtags } = reqBody;
    const discussionData = new Discussion({
        userId,
        text,
        imageUrl,
        hashtags
      });
  const newDiscussion = new Discussion(discussionData);
  return await newDiscussion.save();
}

async function updateDiscussion(id, discussionData) {
  return await Discussion.findByIdAndUpdate(id, discussionData, { new: true });
}

async function deleteDiscussion(id) {
  return await Discussion.findByIdAndUpdate(id,{deleted:true});
}

async function getDiscussionsByTags(tags) {
  return await Discussion.find({ hashtags: { $in: tags.split(',') } });
}

async function searchDiscussionsByText(searchText) {
  return await Discussion.find({ text: { $regex: searchText, $options: 'i' } });
}

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTags,
  searchDiscussionsByText,
};
