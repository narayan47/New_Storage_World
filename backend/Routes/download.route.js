import axios from "axios";
import express from "express";
import Files from '../model/FileData.js';

const router= express.Router();

router.get("/files/:id", async (req, res) => {
  const file = await Files.findById(req.params.id);

  const response = await axios.get(file.path, {
    responseType: "arraybuffer"
  });

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.title}"`
  );

  res.setHeader(
    "Content-Type",
    file.mimeType || "application/octet-stream"
  );

  res.send(response.data);
});

export default router;
