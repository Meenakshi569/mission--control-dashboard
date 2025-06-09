-- This script sets up the initial database structure
-- Note: This is for reference only as we're using MongoDB with Mongoose

-- MongoDB Collections will be created automatically:
-- 1. missions - stores mission data
-- 2. users - stores admin user data

-- Sample data structure for missions:
-- {
--   _id: ObjectId,
--   title: String,
--   description: String,
--   status: String (active/completed),
--   startTime: Date,
--   endTime: Date (optional),
--   location: String (optional),
--   createdAt: Date,
--   updatedAt: Date
-- }

-- Sample data structure for users:
-- {
--   _id: ObjectId,
--   username: String,
--   password: String (hashed),
--   createdAt: Date,
--   updatedAt: Date
-- }

-- For MongoDB setup, ensure you have:
-- 1. MongoDB installed locally or MongoDB Atlas account
-- 2. Connection string in environment variables
-- 3. Proper indexes for performance (optional)

SELECT 'MongoDB setup complete - collections will be created automatically' as status;
