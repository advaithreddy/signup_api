const express = require('express');
const router = express.Router();
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const User = require('../models/User'); // Assuming you have a User model

router.post('/edit-profile', async (req, res) => {
  try {
    // Assuming profilePicData is available in req.body
    const profilePicData = req.body.profilePicData;

    const response = await dbx.filesUpload({
      path: '/profile-pics/filename.jpg',
      contents: profilePicData
    });

    console.log('File uploaded!', response);
    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update user's email
router.post('/edit-profile', async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    // Assuming you have a function to update the user's email in the database
    const updatedUser = await User.findOneAndUpdate(
      { email: oldEmail },
      { $set: { email: newEmail } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update user's password
router.post('/edit-profile', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    // Assuming you have a function to update the user's password in the database
    const updatedUser = await User.findOneAndUpdate(
      { email, password: oldPassword }, // Check old password
      { $set: { password: newPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
