const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Setup folder upload
const storage = multer.diskStorage({
 destination: './uploads/',
 filename: (req, file, cb) => {
 const uniqueName = Date.now() + '-' + file.originalname;
 cb(null, uniqueName);
 }
});
const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
 const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
 res.json({ url: fileUrl });
});

app.listen(PORT, () => {
 console.log(`Server jalan di http://localhost:${PORT}`);
});