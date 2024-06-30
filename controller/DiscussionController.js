const DiscussionService = require('../service/DiscussionService');

async function createDiscussion(req, res) {
  try {
    const newDiscussion = await DiscussionService.createDiscussion(req.body);
    res.status(201).json(newDiscussion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateDiscussion(req, res) {
  try {
    const { id } = req.params;
    const updatedDiscussion = await DiscussionService.updateDiscussion(id, req.body);
    res.json(updatedDiscussion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteDiscussion(req, res) {
  try {
    const { id } = req.params;
    await DiscussionService.deleteDiscussion(id);
    res.json({ message: 'Discussion deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getDiscussionsByTags(req, res) {
  try {
    const { tags } = req.query;
    const discussions = await DiscussionService.getDiscussionsByTags(tags);
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function searchDiscussionsByText(req, res) {
  try {
    const { searchText } = req.query;
    const discussions = await DiscussionService.searchDiscussionsByText(searchText);
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTags,
  searchDiscussionsByText,
};
